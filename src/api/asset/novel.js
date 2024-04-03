import request from "@/utils/request";

export const getNovelPage = query => {
    return request({
        url: '/admin/novel/page',
        method: 'get',
        params: query,
    });
}