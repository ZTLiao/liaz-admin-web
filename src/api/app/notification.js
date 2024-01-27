import request from "@/utils/request";

export const getNotificationPage = query => {
    return request({
        url: '/admin/notification/page',
        method: 'get',
        params: query,
    });
}

export const saveNotification = data => {
    return request({
        url: '/admin/notification',
        method: 'post',
        data: data,
    });
}

export const updateNotification = data => {
    return request({
        url: '/admin/notification',
        method: 'put',
        data: data,
    });
}

export const delNotification = id => {
    return request({
        url: '/admin/notification/' + id,
        method: 'delete',
    });
}
