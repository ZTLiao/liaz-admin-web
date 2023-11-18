import { setStore } from '@/utils/store';
import { getAdminSysConfByKind } from '@/api/system/sysConf';
import global from '@/constants/global';

export default {
    state: {
        sysConfs: []
    },
    mutations: {
        setSysConfs(state, sysConfs) {
            if (sysConfs && sysConfs.length > 0) {
                state.sysConfs = sysConfs;
                setStore({
                    name: "sys_confs",
                    content: sysConfs.filter(v => v.confKey && v.confKey != ''),
                    type: "session"
                });
                let sysConf = sysConfs.filter(v => v.confKey == global.SYS_CONF.FILE_URL)[0];
                if (sysConf) {
                    setStore({
                        name: "file_url",
                        content: sysConf.confValue,
                        type: "session" 
                    });
                }
            }
        }
    },
    actions: {
        async getSysConfs({ commit }) {
            const res = await getAdminSysConfByKind(1);
            var data = res.data || {};
            commit("setSysConfs", data);
            return data;
        },
    },
};