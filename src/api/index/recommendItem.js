import request from "@/utils/request";

export const getRecommendItemPage = query => {
    return request({
        url: '/admin/recommend/item/page',
        method: 'get',
        params: query,
    });
}

export const saveRecommendItem = data => {
    return request({
        url: '/admin/recommend/item',
        method: 'post',
        data: data,
    });
}

export const updateRecommendItem = data => {
    return request({
        url: '/admin/recommend/item',
        method: 'put',
        data: data,
    });
}

export const delRecommendItem = id => {
    return request({
        url: '/admin/recommend/item/' + id,
        method: 'delete',
    });
}
