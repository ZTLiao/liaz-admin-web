import request from "@/utils/request";

export const getComicPage = query => {
    return request({
        url: '/admin/comic/page',
        method: 'get',
        params: query,
    });
}

export const saveComic = data => {
    return request({
        url: '/admin/comic',
        method: 'post',
        data: data,
    });
}

export const updateComic = data => {
    return request({
        url: '/admin/comic',
        method: 'put',
        data: data,
    });
}

export const delComic = id => {
    return request({
        url: '/admin/comic/' + id,
        method: 'delete',
    });
}