import request from "@/utils/request";

export const getCategoryGroupPage = query => {
    return request({
        url: '/admin/categoryGroup/page',
        method: 'get',
        params: query,
    });
}

export const saveCategoryGroup = data => {
    return request({
        url: '/admin/categoryGroup',
        method: 'post',
        data: data,
    });
}

export const updateCategoryGroup = data => {
    return request({
        url: '/admin/categoryGroup',
        method: 'put',
        data: data,
    });
}

export const delCategoryGroup = id => {
    return request({
        url: '/admin/categoryGroup/' + id,
        method: 'delete',
    });
}

export const getCategoryGroupList = () => {
    return request({
        url: '/admin/categoryGroup',
        method: 'get',
    });
}