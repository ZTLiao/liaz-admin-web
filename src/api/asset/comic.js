import request from "@/utils/request";

export const getComicPage = query => {
    return request({
        url: '/admin/comic/page',
        method: 'get',
        params: query,
    });
}