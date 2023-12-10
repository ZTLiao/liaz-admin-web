import request from "@/utils/request";

export const getRecommendPage = query => {
    return request({
        url: '/admin/recommend/page',
        method: 'get',
        params: query,
    });
}

export const saveRecommend = data => {
    return request({
        url: '/admin/recommend',
        method: 'post',
        data: data,
    });
}

export const updateRecommend = data => {
    return request({
        url: '/admin/recommend',
        method: 'put',
        data: data,
    });
}

export const delRecommend = id => {
    return request({
        url: '/admin/recommend/' + id,
        method: 'delete',
    });
}

export const getRecommendList = () => {
    return request({
        url: '/admin/recommend',
        method: 'get',
    });
}