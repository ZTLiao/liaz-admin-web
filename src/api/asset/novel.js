import request from "@/utils/request";

export const getNovelPage = query => {
    return request({
        url: '/admin/novel/page',
        method: 'get',
        params: query,
    });
}

export const saveNovel = data => {
    return request({
        url: '/admin/novel',
        method: 'post',
        data: data,
    });
}

export const updateNovel = data => {
    return request({
        url: '/admin/novel',
        method: 'put',
        data: data,
    });
}

export const delNovel = id => {
    return request({
        url: '/admin/novel/' + id,
        method: 'delete',
    });
}