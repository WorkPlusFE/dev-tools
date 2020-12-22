import _ from 'lodash';
import { Loading, Message } from 'element-ui';
import DetailRequest from './DetailRequest';

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
  loading.close();
  loading = null;
};

export default async function getUrlParams(app, role) {
  try {
    const { api, domain, orgId } = role;

    showLoading('正在验证服务..');
    const tokenResult = await DetailRequest.getToken(role);

    const accessToken = _.get(tokenResult, `data.result.access_token`, '');
    if (!accessToken) {
      throw Error('获取 AccessToken 失败');
    }

    changeLoadingText('获取用户票据 Ticket');
    const { ticket_id } = await DetailRequest.getUserTicket(accessToken, api, orgId);
    if (!ticket_id) {
      throw Error('获取用户票据 Ticket 失败');
    }

    changeLoadingText('获取用户信息详情');
    const userinfo = await DetailRequest.getCurrentEmployeeInfo(accessToken, api);
    if (!userinfo) {
      throw Error('获取用户信息详情失败');
    }

    closeLoading();

    return {
      ...userinfo,
      ticket: ticket_id,
      org_id: orgId,
    };
  } catch (error) {
    console.log(error);
    Message.error(error.message);
  }
}
