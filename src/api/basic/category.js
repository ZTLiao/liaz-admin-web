import request from "@/utils/request";

export const getCategoryPage = query => {
    return request({
        url: '/admin/category/page',
        method: 'get',
        params: query,
    });
}

export const saveCategory = data => {
    return request({
        url: '/admin/category',
        method: 'post',
        data: data,
    });
}

export const updateCategory = data => {
    return request({
        url: '/admin/category',
        method: 'put',
        data: data,
    });
}

export const delCategory = id => {
    return request({
        url: '/admin/category/' + id,
        method: 'delete',
    });
}

export const getCategoryList = () => {
    return request({
        url: '/admin/category',
        method: 'get',
    });
}