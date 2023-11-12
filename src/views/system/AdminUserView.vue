<template>
    <section class="content">
        <div class="box box-danger">
            <div class="box-body">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h1 id="itemTitle"></h1>
                </section>
                <!-- .content -->
                <section class="content">
                    <div id="table"></div>
                    <div id="toolbar">
                        <button id="addBtn" class="btn btn-default">
                            <i class="glyphicon glyphicon-plus"></i>增加
                        </button>
                    </div>
                </section><!-- .content -->
            </div>
        </div>
    </section>
    <!-- .content -->
    <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">用户信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="adminId" v-model="adminUser.adminId"/>
                        <div class="form-group">
                            <label for="name" class="col-sm-3 control-label">
                                <span style="color: red; ">*</span>姓名:
                            </label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="name" v-model="adminUser.name"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="username" class="col-sm-3 control-label">
                                <span style="color: red; ">*</span>账号:
                            </label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="username" v-model="adminUser.username"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">头像</label>
                            <div class="col-sm-8">
                                <img src="" id="avatarImg" style="width:120px;"/>
                                <input type="file" id="avatarUploadFile" name="avatarUploadFile">
                                <button class="btn btn-success" type="button" id="avatarUploadBtn">上传</button>
                                <input type="hidden" name="avatar" class="form-control validate[required]" v-model="adminUser.avatar"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-sm-3 control-label">邮箱:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="email" v-model="adminUser.email"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phone" class="col-sm-3 control-label">
                                <span style="color: red; ">*</span>手机号码:
                            </label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="phone" v-model="adminUser.phone">
                            </div>
                        </div>
                        <div class="form-group" id="passwordDiv">
                            <label for="password" class="col-sm-3 control-label">
                                <span style="color: red; ">*</span>密码:
                            </label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="password" v-model="adminUser.password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" data-btn-class="btn-warning">
                                    <option value="1">有效</option>
                                    <option value="0">无效</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="introduction" class="col-sm-3 control-label">描述:</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" name="introduction" v-model="adminUser.introduction">
                                </textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="save">保存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="roleModal" tabindex="-1" role="dialog" aria-labelledby="roleModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="roleModalLabel">授权角色</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="adminId" v-model="adminUser.adminId"/>
                        <div class="form-group">
                            <label for="name" class="col-sm-3 control-label">姓名:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="name" disabled="disabled" v-model="adminUser.name"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">角色选项</label>
                            <div class="col-sm-8" id="roles">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="roleSave">保存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="roleMenuModal" tabindex="-1" role="dialog" aria-labelledby="roleMenuModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="width: 700px;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="roleMenuModalLabel">授权菜单</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="roleId" id="roleId"/>
                        <div class="form-group">
                            <label for="roleName" class="col-sm-3 control-label">名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="roleName" disabled="disabled" id="roleName"/>
                            </div>
                        </div>
                        <div id="menuTree"></div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="roleMenuSave">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import TableHelper from '@/utils/bootstrap-table-helper';
import ComboboxHelper from '@/utils/bootstrap-combobox-helper';
import { getAdminUserList, saveAdminUser, updateAdminUser, delAdminUser } from '@/api/system/user';
import { getAdminRoleMenu } from '@/api/system/roleMenu';
import avatar from '@/assets/images/man.jpg';

export default {
    name: 'AdminUserView',
    data() {
        return {
            columns: [
                { field: 'adminId', title: '用户ID', align: 'center', width: '5%' },
                { field: 'name', title: '姓名', align: 'center', width: '5%' },
                { field: 'username', title: '账号', align: 'center', width: '5%' },
                {
                    field: 'avatar',
                    title: '头像',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        return '<img src="' + (val ? val : avatar) + '" width="70" height="60"/>';
                    }
                },
                {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        return (val ? '有效' : '无效');
                    }
                },
                { field: 'email', title: '邮箱', align: 'center', width: '5%' },
                { field: 'phone', title: '手机号码', align: 'center', width: '5%' },
                {
                    field: 'createdAt',
                    title: '创建时间',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val) {
                            value = new Date(val).format("yyyy-MM-dd hh:mm:ss");
                        }
                        return value;
                    }
                },
                {
                    field: 'adminId',
                    title: '操作',
                    align: 'center',
                    width: '10%',
                    formatter: function (val, row, index) {
                        let value = '<button class="btn btn-sm btn-success opt-edit" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-edit"></i>编辑</button>';
                        value += '<button class="btn btn-sm btn-warning opt-role" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-user"></i>授权角色</button>';
                        value += '<button class="btn btn-sm btn-info opt-auth" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-user"></i>查看授权</button>';
                        value += '<button class="btn btn-sm btn-primary opt-thaw" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-remove"></i>解冻</button>';
                        value += '<button class="btn btn-sm btn-danger opt-del" data-id="' + val + '" data-index="' + index + '"><i class="glyphicon glyphicon-remove"></i>删除</button>';
                        return value;
                    }
                }
            ],
            adminUsers: [],
            adminUser: {
                adminId: 0,
                name: '',
                username: '',
                password: '',
                phone: '',
                avatar: '',
                email: '',
                introduction: '',
                status: 1,
            },
        };
    },
    created() {
        this.getUser();
        this.init();
    },
    methods: {
        init() {
            this.$nextTick(function () {
                let $this = this;
                $this.initTable();
                $('#addBtn').click(function () {
                    $this.add();
                });
                $('#table').on('click', '.opt-edit', function () {
                    $this.edit(this);
                });
                $('#table').on('click', '.opt-role', function () {
                    $this.getUserRole(this);
                });
                $('#table').on('click', '.opt-auth', function () {

                });
                $('#table').on('click', '.opt-thaw', function () {

                });
                $('#table').on('click', '.opt-del', function () {
                    $this.del(this);
                });
                $('#save').click(function () {
                    $this.save();
                });
            });
        },
        initTable() {
            let $this = this;
            TableHelper.destroy('#table');
            $('#table').bootstrapTable({
                columns: $this.columns,
                cache: false,
                striped: true,
                showRefresh: true,
                search: true,
                pageSize: 10,
                pagination: true,
                pageList: [1, 10, 20, 30, 50],
                sidePagination: "client",
                queryParamsType: "undefined",
                toolbar: '#toolbar',
            });
        },
        getUser() {
            getAdminUserList().then(res => {
                this.adminUsers = res.data;
                TableHelper.load('#table', this.adminUsers);
            });
        },
        add() {
            this.adminUser.adminId = 0;
            this.adminUser.name = '';
            this.adminUser.username = '';
            this.adminUser.password = '';
            this.adminUser.phone = '';
            this.adminUser.avatar = '';
            this.adminUser.email = '';
            this.adminUser.introduction = '';
            this.adminUser.status = 1;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.adminUser.adminId = record.adminId;
            this.adminUser.name = record.name;
            this.adminUser.username = record.username;
            this.adminUser.phone = record.phone;
            this.adminUser.avatar = record.avatar;
            this.adminUser.email = record.email;
            this.adminUser.introduction = record.introduction;
            this.adminUser.status = record.status;
            this.show();
        },
        show() {
            ComboboxHelper.build('#status', this.adminUser.status);
            $('#userModal').modal('show');
        },
        save() {
            let data = this.adminUser;
            data.password = $.md5(data.password);
            data.status = ComboboxHelper.getSelected('#status');
            (data.adminId ? updateAdminUser(data) : saveAdminUser(data)).then(res => {
                console.log(res);
                this.getUser();
                $('#userModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const adminId = record.adminId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delAdminUser(adminId).then(res => {
                console.log(res);
                this.getUser();
            });
        },
        getUserRole(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const adminId = record.adminId;
        },
        authRoleMenu(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const roleId = null;
            //TODO
            getAdminRoleMenu(roleId).then(res => {
                let menus = res.data;
                if (!menus || menus.length == 0) {
                    return;
                }
                this.menuTree(menus);
                $('#roleId').val();
                $('#roleName').val();
                $('#roleMenuModal').modal('show');
            });
        },
        menuTree(menus) {
            let $this = this;
            let data = this.getMenuData(menus);
            console.log(data);
            $("#menuTree").treeview({
                data: data,// 数据源
                levels: 1,  //设置继承树默认展开的级别
                showTags: true, //是否在每个节点右边显示tags标签。tag值必须在每个列表树的data结构中给出
                showCheckbox: true,
                onNodeChecked: function (event, node) { //选中节点
                    var selectNodes = $this.getChildNodeIdArr(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则选中所有子节点
                        $('#menuTree').treeview('checkNode', [selectNodes, { silent: true }]);
                    }
                    var parentNode = $("#menuTree").treeview("getNode", node.parentId);
                    if (parentNode) {
                        $('#menuTree').treeview('checkNode', [parentNode, { silent: true }]);
                    }
                },
                onNodeUnchecked: function (event, node) { //取消选中节点
                    var selectNodes = $this.getChildNodeIdArr(node); //获取所有子节点
                    if (selectNodes) { //子节点不为空，则取消选中所有子节点
                        $('#menuTree').treeview('uncheckNode', [selectNodes, { silent: true }]);
                    }
                }
            });
        },
        getMenuData(menus) {
            let parentMenus = [];
            for (let i = 0; i < menus.length; i++) {
                let parentMenu = menus[i];
                let childs = parentMenu.childs;
                let childMenus = [];
                if (childs && childs.length > 0) {
                    for (let j = 0; j < childs.length; j++) {
                        let childMenu = childs[j];
                        childMenus[j] = {
                            menuId: childMenu.menuId,
                            text: childMenu.menuName,
                            color: '#2f2424;display:inline-table;',
                            state: {
                                checked: childMenu.checked
                            }
                        };
                    }
                }
                parentMenus[i] = {
                    menuId: parentMenu.menuId,
                    text: parentMenu.menuName,
                    state: {
                        checked: parentMenu.checked,
                        expanded: parentMenu.checked,
                    },
                    nodes: childMenus
                };
            }
            return parentMenus;
        },
        getChildNodeIdArr(node) {
            var ts = [];
            if (node.nodes) {
                let x, j;
                for (x in node.nodes) {
                    ts.push(node.nodes[x].nodeId);
                    if (node.nodes[x].nodes) {
                        var getNodeDieDai = this.getChildNodeIdArr(node.nodes[x]);
                        for (j in getNodeDieDai) {
                            ts.push(getNodeDieDai[j]);
                        }
                    }
                }
            } else {
                ts.push(node.nodeId);
            }
            return ts;
        },
    },
}
</script>
  
<style scoped></style>