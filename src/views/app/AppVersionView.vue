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
                    <h4 class="modal-title" id="modalLabel">版本信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="versionId" v-model="appVersion.versionId" />
                        <div class="form-group">
                            <label for="os" class="col-sm-3 control-label">系统:</label>
                            <div class="col-sm-8">
                                <select name="os" id="os" class="form-control" data-btn-class="btn-warning"  v-model="appVersion.os">
                                    <option value="android">Android</option>
                                    <option value="ios">iOS</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="appVersion" class="col-sm-3 control-label">版本号:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="appVersion" id="appVersion"
                                    v-model="appVersion.appVersion" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="channel" class="col-sm-3 control-label">渠道:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="channel" id="channel"
                                    v-model="appVersion.channel" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">下载链接</label>
                            <div class="col-sm-8">
                                <input type="hidden" class="form-control" name="downloadLink" v-model="appVersion.downloadLink" />
                                <input type="file" class="form-control" id="file" name="file">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label"></label>
                            <div class="col-sm-8">
                                <button class="btn btn-success col-sm-4" type="button" id="uploadBtn">上传</button>
                                <span class="btn col-sm-4" id="uploadInfo" style="color:red;"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="fileMd5" class="col-sm-3 control-label">文件MD5:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="fileMd5" id="fileMd5"
                                    v-model="appVersion.fileMd5" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" class="form-control" data-btn-class="btn-warning"  v-model="appVersion.status">
                                    <option value="0">审核中</option>
                                    <option value="1">正式</option>
                                    <option value="2">建议更新</option>
                                    <option value="3">强制更新</option>
                                    <option value="4">删除</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-sm-3 control-label">描述:</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" name="description" id="description" v-model="appVersion.description">
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
</template>
  
<script>
import TableHelper from '@/utils/bootstrap-table-helper';
import { getFileUrl } from '@/utils/system-helper';
import { getAppVersionPage, saveAppVersion, updateAppVersion, delAppVersion } from '@/api/app/appVersion';
import { uploadFile } from '@/api/common/upload';
import global from '@/constants/global';

export default {
    name: 'AppVersionView',
    data() {
        return {
            columns: [
                { field: 'versionId', title: '版本ID', align: 'center', width: '5%' },
                { field: 'os', title: '系统', align: 'center', width: '15%' },
                { field: 'appVersion', title: '版本号', align: 'center', width: '5%' },
                { field: 'channel', title: '渠道', align: 'center', width: '5%' },
                { field: 'description', title: '描述', align: 'center', width: '5%' },
                { 
                    field: 'downloadLink', 
                    title: '下载链接',
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = getFileUrl(val);
                        return value;
                    } 
                },
                { field: 'fileMd5', title: '文件MD5', align: 'center', width: '5%' },
                {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '审核中';
                        } else if (val == 1) {
                            value = '正式';
                        } else if (val == 2) {
                            value = '建议更新';
                        }  else if (val == 3) {
                            value = '强制更新';
                        }  else if (val == 4) {
                            value = '删除';
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
                    field: 'versionId',
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
            appVersion: {
                versionId: 0,
                os: '',
                appVersion: '',
                channel: '',
                description: '',
                downloadLink: '',
                fileMd5: '',
                status: 1,
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
                $('#uploadBtn').click(function () {
                    uploadFile({
                        id: 'file',
                        bucketName: global.BUCKET.DOWNLOAD
                    }).then(res => {
                        $this.appVersion.downloadLink = res.data.path;
                        $('#uploadInfo').html(getFileUrl(res.data.path));
                    });
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
                    getAppVersionPage(request.data).then(res => {
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
            this.appVersion.versionId = 0;
            this.appVersion.os = '';
            this.appVersion.appVersion = '';
            this.appVersion.channel = '';
            this.appVersion.description = '';
            this.appVersion.downloadLink = '';
            this.appVersion.fileMd5 = '';
            this.appVersion.status = 1;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.appVersion.versionId = record.versionId;
            this.appVersion.os = record.os;
            this.appVersion.appVersion = record.appVersion;
            this.appVersion.channel = record.channel;
            this.appVersion.description = record.description;
            this.appVersion.downloadLink = record.downloadLink;
            this.appVersion.fileMd5 = record.fileMd5;
            this.appVersion.status = record.status;
            this.show();
        },
        show() {
            if (this.appVersion.downloadLink != '') {
                $('#uploadInfo').html(getFileUrl(this.appVersion.downloadLink));
            }
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                versionId: this.appVersion.versionId,
                os: this.appVersion.os,
                appVersion: this.appVersion.appVersion,
                channel: this.appVersion.channel,
                description: this.appVersion.description,
                downloadLink: this.appVersion.downloadLink,
                fileMd5: this.appVersion.fileMd5,
                status: new Number(this.appVersion.status),
            };
            (data.versionId != 0 ? updateAppVersion(data) : saveAppVersion(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const versionId = record.versionId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delAppVersion(versionId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
    },
}
</script>
  
<style scoped></style>