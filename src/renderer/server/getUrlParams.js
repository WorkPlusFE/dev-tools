import _ from 'lodash';
import { Loading, Message } from 'element-ui';
import DetailRequest from './DetailRequest';
import VueInstance from '../main';

let loading;
const showLoading = (text) => {
  loading = Loading.service({
    lock: true,
    text: text || 'Loading',
  });
};

const changeLoadingText = (text) => {
  loading.setText(text);
};

const closeLoading = () => {
  loading && loading.close();
  loading = null;
};

export default async function getUrlParams(app, role) {
  try {
    const { api, domain, orgId } = role;
    const $t = VueInstance.$t.bind(VueInstance);

    showLoading($t('getUrlParamsLoading.fetching'));
    const tokenResult = await DetailRequest.getToken(role);

    const accessToken = _.get(tokenResult, `data.result.access_token`, '');
    if (!accessToken) {
      throw Error($t('getUrlParamsLoading.getAccessTokenFail'));
    }

    changeLoadingText($t('getUrlParamsLoading.getTicket'));
    const { ticket_id } = await DetailRequest.getUserTicket(accessToken, api, orgId);
    if (!ticket_id) {
      throw Error($t('getUrlParamsLoading.getTicketFail'));
    }

    changeLoadingText($t('getUrlParamsLoading.getUserInfo'));
    const userinfo = await DetailRequest.getCurrentEmployeeInfo(accessToken, api);
    if (!userinfo) {
      throw Error($t('getUrlParamsLoading.getUserInofFail'));
    }

    closeLoading();

    return {
      ...userinfo,
      ticket: ticket_id,
      org_id: orgId,
    };
  } catch (error) {
    console.log(error);
    closeLoading();
    Message.error(error.message);
  }
}
