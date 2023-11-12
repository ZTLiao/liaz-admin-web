export function showLoading() {
    $(".loadingGif").css('top', window.innerHeight / 2);
    $(".loadingGif").css('left', window.innerWidth / 2);
    $(".loading").css('z-index', 3000);
    $(".loading").modal('show');
}

export function hideLoading() {
    $(".loading").modal('hide');
}

export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * 提示语
 * @param {提示语} message 
 * @returns 
 */
export function alertMsg(message) {
    let tipMsg = $('#tipMsg');
    let tipModal = $('#tipModal');
    if (tipMsg && tipModal) {
        tipMsg.text(message);
        tipModal.modal('show');
        return true;
    }
    return false;
}

//获取url中的参数
export function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}