import { setStore, getStore } from '@/utils/store';
import { getAdminSysConfByKind } from '@/api/system/sysConf';

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