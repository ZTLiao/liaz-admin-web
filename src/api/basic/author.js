import request from "@/utils/request";

export const getAuthorPage = query => {
    return request({
        url: '/admin/author/page',
        method: 'get',
        params: query,
    });
}

export const saveAuthor = data => {
    return request({
        url: '/admin/author',
        method: 'post',
        data: data,
    });
}

export const updateAuthor = data => {
    return request({
        url: '/admin/author',
        method: 'put',
        data: data,
    });
}

export const delAuthor = id => {
    return request({
        url: '/admin/author/' + id,
        method: 'delete',
    });
}

export const getAuthorList = () => {
    return request({
        url: '/admin/author',
        method: 'get',
    });
}