import request from "@/utils/request";

export const getAppVersionPage = query => {
    return request({
        url: '/admin/app/version/page',
        method: 'get',
        params: query,
    });
}

export const saveAppVersion = data => {
    return request({
        url: '/admin/app/version',
        method: 'post',
        data: data,
    });
}

export const updateAppVersion = data => {
    return request({
        url: '/admin/app/version',
        method: 'put',
        data: data,
    });
}

export const delAppVersion = id => {
    return request({
        url: '/admin/app/version/' + id,
        method: 'delete',
    });
}
