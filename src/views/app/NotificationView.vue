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
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">公告信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="notificationId" v-model="notification.notificationId" />
                        <div class="form-group">
                            <label for="title" class="col-sm-3 control-label">标题:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="title" id="title"
                                    v-model="notification.title" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="content" class="col-sm-3 control-label">描述:</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" name="content" id="content" v-model="notification.content">
                                </textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" class="form-control" data-btn-class="btn-warning"  v-model="notification.status">
                                    <option value="0">草稿</option>
                                    <option value="1">发布</option>
                                    <option value="2">撤销</option>
                                </select>
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
</template>
  
<script>
import TableHelper from '@/utils/bootstrap-table-helper';
import { getNotificationPage, saveNotification, updateNotification, delNotification } from '@/api/app/notification';

export default {
    name: 'NotificationView',
    data() {
        return {
            columns: [
                { field: 'notificationId', title: '公告ID', align: 'center', width: '5%' },
                { field: 'title', title: '标题', align: 'center', width: '15%' },
                { field: 'content', title: '内容', align: 'center', width: '5%' },
                {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '草稿';
                        } else if (val == 1) {
                            value = '发布';
                        } else if (val == 2) {
                            value = '撤销';
                        }
                        return value;
                    }
                },
                {
                    field: 'createdAt',
                    title: '创建时间',
                    align: 'center',
                    width: '10%',
                    formatter: function (val, row, index) {
                        let dateTime = new Date();
                        dateTime.setTime(val);
                        return dateTime.toLocaleString();
                    }
                },
                {
                    field: 'updatedAt',
                    title: '修改时间',
                    align: 'center',
                    width: '10%',
                    formatter: function (val, row, index) {
                        let dateTime = new Date();
                        dateTime.setTime(val);
                        return dateTime.toLocaleString();
                    }
                },
                {
                    field: 'notificationId',
                    title: '操作',
                    align: 'center',
                    width: '20%',
                    formatter: function (val, row, index) {
                        let value = '<button class="btn btn-sm btn-success opt-edit" data-id="' + val + '" data-index="' + index + '">编辑</button>';
                        value += '<button class="btn btn-sm btn-danger opt-del" data-id="' + val + '" data-index="' + index + '">删除</button>';
                        return value;
                    }
                }
            ],
            notification: {
                notificationId: 0,
                title: '',
                content: '',
                status: 0,
            },
        };
    },
    created() {
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
                showRefresh: false,
                pageSize: 10,
                pagination: true,
                pageList: [1, 10, 20, 30, 50],
                search: false,
                sidePagination: 'server',
                queryParamsType: 'undefined',
                queryParams: function queryParams(params) {
                    var param = {
                        pageNum: params.pageNumber,
                        pageSize: params.pageSize,
                    };
                    return param;
                },
                ajax:function(request){
                    getNotificationPage(request.data).then(res => {
                        let data = res.data;
                        request.success({
                            'rows': data.records,
                            'total': data.total
                        });
                    });
                },
                toolbar: '#toolbar',
            });
        },
        add() {
            this.notification.notificationId = 0;
            this.notification.title = '';
            this.notification.content = '';
            this.notification.status = 0;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.notification.notificationId = record.notificationId;
            this.notification.title = record.title;
            this.notification.content = record.content;
            this.notification.status = record.status;
            this.show();
        },
        show() {
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                notificationId: this.notification.notificationId,
                title: this.notification.title,
                content: this.notification.content,
                status: new Number(this.notification.status),
            };
            (data.notificationId != 0 ? updateNotification(data) : saveNotification(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const notificationId = record.notificationId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delNotification(notificationId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
    },
}
</script>
  
<style scoped></style>