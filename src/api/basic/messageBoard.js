import request from "@/utils/request";

export const getMessageBoardPage = query => {
    return request({
        url: '/admin/message/board/page',
        method: 'get',
        params: query,
    });
}
