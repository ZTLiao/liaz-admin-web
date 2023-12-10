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
                        <div class="col-sm-10">
                            <label for="recommendId" class="col-sm-4 control-label">推荐栏:</label>
                            <div class="col-sm-6">
                                <select name="recommendId" id="recommendId" class="form-control"> 
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <button id="addBtn" class="btn btn-default">
                                <i class="glyphicon glyphicon-plus"></i>增加
                            </button>
                            <button id="searchBtn" class="btn btn-default">
                                <i class="glyphicon glyphicon-wrench"></i>查询
                            </button>
                        </div>
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
                    <h4 class="modal-title" id="modalLabel">推荐内容信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="recommendItemId" v-model="recommendItem.recommendItemId" />
                        <input type="hidden" name="recommendId" v-model="recommendItem.recommendId" />
                        <div class="form-group">
                            <label for="title" class="col-sm-3 control-label">标题:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="title" id="title"
                                    v-model="recommendItem.title" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="subTitle" class="col-sm-3 control-label">子标题:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="subTitle" id="subTitle"
                                    v-model="recommendItem.subTitle" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">展示内容</label>
                            <div class="col-sm-8">
                                <input type="hidden" class="form-control" name="showValue" v-model="recommendItem.showValue" />
                                <img :src="imgFormatter(recommendItem.showValue)" style="width:120px;"/>
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
                            <label for="skipType" class="col-sm-3 control-label">跳转类型:</label>
                            <div class="col-sm-8">
                                <select name="skipType" id="skipType" class="form-control" data-btn-class="btn-warning" v-model="recommendItem.skipType">
                                    <option value="0">H5</option>
                                    <option value="1">漫画</option>
                                    <option value="2">小说</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="skipValue" class="col-sm-3 control-label">跳转内容:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="skipValue" id="skipValue"
                                    v-model="recommendItem.skipValue" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="objId" class="col-sm-3 control-label">业务ID:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="objId" id="objId"
                                    v-model="recommendItem.objId" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="seqNo" class="col-sm-3 control-label">排序:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="seqNo" id="seqNo"
                                    v-model="recommendItem.seqNo" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" class="form-control" data-btn-class="btn-warning"  v-model="recommendItem.status">
                                    <option value="1">有效</option>
                                    <option value="0">无效</option>
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
import { getRecommendList } from '@/api/index/recommend';
import { getRecommendItemPage, saveRecommendItem, updateRecommendItem, delRecommendItem } from '@/api/index/recommendItem';
import { uploadFile } from '@/api/common/upload';
import { alertMsg, getFileUrl, buildSelectOption } from '@/utils/system-helper';
import global from '@/constants/global';

export default {
    name: 'RecommendItemView',
    data() {
        return {
            columns: [
                { field: 'recommendItemId', title: '推荐内容ID', align: 'center', width: '5%' },
                { field: 'recommendId', title: '推荐ID', align: 'center', width: '5%' },
                { field: 'title', title: '标题', align: 'center', width: '15%' },
                { field: 'subTitle', title: '子标题', align: 'center', width: '15%' },
                { 
                    field: 'showValue', 
                    title: '展示内容', 
                    align: 'center', 
                    width: '15%',
                    formatter: function (val, row, index) {
                        let value = (val ? getFileUrl(val) : '');
                        return '<img src="' + value + '" width="70" height="60"/>';
                    }
                },
                {
                    field: 'skipType',
                    title: '跳转类型',
                    align: 'center',
                    width: '15%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = 'H5';
                        } else if (val == 1) {
                            value = '漫画';
                        } else if (val == 2) {
                            value = '小说';
                        }
                        return value;
                    }
                },
                { field: 'skipValue', title: '跳转内容', align: 'center', width: '15%' },
                { field: 'objId', title: '业务ID', align: 'center', width: '15%' },
                { field: 'seqNo', title: '排序', align: 'center', width: '5%' },
                {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '无效';
                        } else if (val == 1) {
                            value = '有效';
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
                    field: 'recommendItemId',
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
            recommends: [],
            recommendItem: {
                recommendItemId: 0,
                recommendId: 0,
                title: '',
                subTitle: '',
                showValue: '',
                skipType: 0,
                skipValue: '',
                objId: '',
                seqNo: 0,
                status: 1,
            },
        };
    },
    created() {
        this.getRecommend();
    },
    methods: {
        imgFormatter(path) {
            return getFileUrl(path);
        },
        init() {
            this.$nextTick(function () {
                let $this = this;
                $this.initTable();
                $('#addBtn').click(function () {
                    $this.add();
                });
                $("#searchBtn").on("click",function () {
                    TableHelper.doRefresh('#table'); 
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
                        bucketName: global.BUCKET.RECOMMEND
                    }).then(res => {
                        $this.recommendItem.showValue = res.data.path;
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
                    let param = {
                        pageNum: params.pageNumber,
                        pageSize: params.pageSize,
                    };
                    let recommendId = $('#recommendId').val();
                    if (recommendId) {
                        param.recommendId = new Number(recommendId);
                    } else {
                        if ($this.recommends.length > 0) {
                            param.recommendId = new Number($this.recommends[0].value);
                        }
                    }
                    return param;
                },
                ajax:function(request){
                    getRecommendItemPage(request.data).then(res => {
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
            let recommendId = $('#recommendId').val();
            if (!recommendId) {
                alertMsg('推荐栏目不允许为空！');
                return;
            }
            this.recommendItem.recommendItemId = 0;
            this.recommendItem.recommendId = recommendId;
            this.recommendItem.title = '';
            this.recommendItem.subTitle = '';
            this.recommendItem.showValue = '';
            this.recommendItem.skipType = 0;
            this.recommendItem.skipValue = '';
            this.recommendItem.objId = '';
            this.recommendItem.seqNo = 0;
            this.recommendItem.status = 1;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index]; 
            this.recommendItem.recommendItemId = record.recommendItemId;
            this.recommendItem.recommendId = record.recommendId;
            this.recommendItem.title = record.title;
            this.recommendItem.subTitle = record.subTitle;
            this.recommendItem.showValue = record.showValue;
            this.recommendItem.skipType = record.skipType;
            this.recommendItem.skipValue = record.skipValue;
            this.recommendItem.objId = record.objId;
            this.recommendItem.seqNo = record.seqNo;
            this.recommendItem.status = record.status;
            this.show();
        },
        show() {
            let uploadInfo = '未上传文件';
            if (this.recommendItem.showValue) {
                uploadInfo = '已上传';
            }
            $('#uploadInfo').html(uploadInfo);
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                recommendItemId: this.recommendItem.recommendItemId,
                recommendId: new Number($('#recommendId').val()),
                title: this.recommendItem.title,
                subTitle: this.recommendItem.subTitle,
                showValue: this.recommendItem.showValue,
                skipType: new Number(this.recommendItem.skipType),
                skipValue: this.recommendItem.skipValue,
                objId: this.recommendItem.objId,
                seqNo: new Number(this.recommendItem.seqNo),
                status: new Number(this.recommendItem.status),
            };
            (data.recommendItemId ? updateRecommendItem(data) : saveRecommendItem(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const recommendItemId = record.recommendItemId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delRecommendItem(recommendItemId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
        getRecommend() {
            getRecommendList().then(res => {
                let data = res.data;
                this.recommends = data.map(v => {
                    return {
                        value: v.recommendId,
                        text: v.title
                    };
                });
                if (this.recommends.length > 0) {
                    buildSelectOption('#recommendId', this.recommends[0].value, this.recommends);
                }
                this.init();
            });
        },
    },
}
</script>
  
<style scoped></style>