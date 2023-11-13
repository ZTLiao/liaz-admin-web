import '@/utils/ajaxfileupload';

export const uploadFile = id => {
    return new Promise((resolve, reject) => {
        let baseURL = !process.env.VUE_APP_DEBUG_MODE ? process.env.VUE_APP_API_BASE_URL : '';
        $.ajaxFileUpload({
            fileElementId: id,
            url: baseURL + '/admin/upload',
            type: 'post',
            dataType: 'json',
            secureuri: false,
            async: true,
            success: function (res) {
                resolve(res);
            },
            error: function (res, status, e) {
                reject(e);
            }
        });
    });
};