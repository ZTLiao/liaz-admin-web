import store from '@/store';
import global from '@/constants/global';

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

//获取链接
export async function getFileUrl(uri) {
    let perfix = '';
    let sysConfs = store.getters.sysConfs;
    if (sysConfs || sysConfs.length == 0) {
        sysConfs = await store.dispatch('getSysConfs');
    }
    let sysConf = sysConfs.filter(v => v.confKey == global.SYS_CONF.FILE_URL)[0];
    if (sysConf) {
        perfix = sysConf.confValue;
    }
    return perfix + uri;
}