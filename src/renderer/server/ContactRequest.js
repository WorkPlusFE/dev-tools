import _ from 'lodash';
import BaseRequest from '@/server/BaseRequest.js';
import { v4 as uuidv4 } from 'uuid';
export default class ContactRequest {

     /**初始化获取全部组织架构 */
     static async fetchOrgs(role,token) {
        const baseRequest = new BaseRequest();
        const url = role.api + '/organizations?access_token=' + token;
        const response = await baseRequest.requestForGet(url);
        const orgs = [];
        const results = _.get(response, `data.result`, []);
        const status = _.get(response, `status`, -1);
        if (status == 200) {
            results.forEach((org) => {
                orgs.push({
                    id: org.id,
                    domainId: org.domain_id,
                    orgCode: org.org_code,
                    type: org.type,
                    path: org.path,
                    name: org.name,
                    i18n: org.i18n,
                    logo: org.logo,
                    sortOrder: org.sort_order,
                    level: 0,
                    uuid: org.uuid,
                    ownerId: org.owner_id,
                    created: org.created,
                    disabled: org.disabled,
                    lastModified: org.lastModified,
                    refreshTimer: org.refreshTimer,
                    isOrg:true
                });
            });
        }
        return orgs;
    }

    /**点击加载组织 */
     static async loadOrg(org, role, token) {
        const baseRequest = new BaseRequest();
        const url = role.api + "/organizations/" + org.orgCode + "/view?access_token=" + token + "&org_id=" + org.id +
            "&filter_senior=false&employee_limit=100&employee_skip=0&filter_rank=true&org_limit=100&org_skip=0&rank_view=true";
        const response = await baseRequest.requestForGet(url);
        const orgs = [];
        const children = response.data.result[0].children;
        if (children) {
            children.forEach(organization => {
                orgs.push({
                    id: organization.id,
                    domainId: organization.domain_id,
                    orgCode: organization.org_code,
                    type: organization.type,
                    name: organization.name,
                    path: organization.path,
                    logo: organization.logo,
                    sortOrder: organization.sort_order,
                    level: org.level + 1,
                    uuid: organization.uuid,
                    ownerId: organization.ownerId,
                    created: organization.created,
                    disabled: organization.disabled,
                    lastModified: organization.last_modified,
                    allEmployeeCount: organization.all_employee_count,
                    isOrg:true,
                    open:false
                });
            })
        }
        org.subOrgs = orgs;
        const employees = response.data.result[0].employees;
        const subEmployees = [];
        if (employees) {
            employees.forEach(searchEmployee => {
                subEmployees.push({
                    userId: searchEmployee.user_id,
                    domainId: searchEmployee.domain_id,
                    orgCode: org.id,
                    displayName: searchEmployee.display_name,
                    name: searchEmployee.name,
                    username: searchEmployee.username,
                    nickname: searchEmployee.nickname,
                    avatar: searchEmployee.avatar,
                    pinyin: searchEmployee.pinyin,
                    initial: searchEmployee.initial,
                    gender: searchEmployee.gender,
                    mobile: searchEmployee.mobile,
                    email: searchEmployee.email,
                    status: searchEmployee.status,
                    orgInfo: searchEmployee.root_org_info.name,
                    level: org.level + 1,
                    isOrg:false
                });
            })
        }
        org.employees = subEmployees;
        return org;
    }
    /**获取组织下的全部联系人 */
    static async getContactByorgId(role,token,uuid) {
        const baseRequest = new BaseRequest();
        const url = role.api+'/organizations/'+role.orgId+'/employees?access_token='+token+'&org_id='+uuid+'&recursion=true&filter=true&filter_senior=true';
        const response = await baseRequest.requestForGet(url);
        return _.get(response,`data.result`,[]);

    }
}