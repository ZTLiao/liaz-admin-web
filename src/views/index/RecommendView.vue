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
                    <h4 class="modal-title" id="modalLabel">推荐信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="recommendId" v-model="recommend.recommendId" />
                        <div class="form-group">
                            <label for="title" class="col-sm-3 control-label">标题:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="title" id="title"
                                    v-model="recommend.title" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="position" class="col-sm-3 control-label">位置:</label>
                            <div class="col-sm-8">
                                <select name="position" id="position" class="form-control" data-btn-class="btn-warning" v-model="recommend.position">
                                    <option value="0">首页</option>
                                    <option value="1">相关推荐</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="recommendType" class="col-sm-3 control-label">推荐类型:</label>
                            <div class="col-sm-8">
                                <select name="recommendType" id="recommendType" class="form-control" data-btn-class="btn-warning" v-model="recommend.recommendType">
                                    <option value="0">自定义</option>
                                    <option value="1">我的订阅</option>
                                    <option value="2">热门推荐</option>
                                    <option value="3">最近上新</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="showType" class="col-sm-3 control-label">展示类型:</label>
                            <div class="col-sm-8">
                                <select name="showType" id="showType" class="form-control" data-btn-class="btn-warning" v-model="recommend.showType">
                                    <option value="0">无</option>
                                    <option value="1">BANNER</option>
                                    <option value="2">二网格</option>
                                    <option value="3">九宫格</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="showTitle" class="col-sm-3 control-label">是否展示标题:</label>
                            <div class="col-sm-8">
                                <select name="showTitle" id="showTitle" class="form-control" data-btn-class="btn-warning" v-model="recommend.showTitle">
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="optType" class="col-sm-3 control-label">操作类型:</label>
                            <div class="col-sm-8">
                                <select name="optType" id="optType" class="form-control" data-btn-class="btn-warning" v-model="recommend.optType">
                                    <option value="0">无</option>
                                    <option value="1">刷新</option>
                                    <option value="2">更多</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="optValue" class="col-sm-3 control-label">操作值:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="optValue" id="optValue"
                                    v-model="recommend.optValue" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="seqNo" class="col-sm-3 control-label">排序:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="seqNo" id="seqNo"
                                    v-model="recommend.seqNo" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" class="form-control" data-btn-class="btn-warning"  v-model="recommend.status">
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
import { getRecommendPage, saveRecommend, updateRecommend, delRecommend } from '@/api/index/recommend';

export default {
    name: 'RecommendView',
    data() {
        return {
            columns: [
                { field: 'recommendId', title: '推荐ID', align: 'center', width: '5%' },
                { field: 'title', title: '标题', align: 'center', width: '15%' },
                { 
                    field: 'position', 
                    title: '位置', 
                    align: 'center', 
                    width: '15%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '首页';
                        } else if (val == 1) {
                            value = '相关推荐';
                        }
                        return value;
                    }
                },
                {
                    field: 'recommendType',
                    title: '推荐类型',
                    align: 'center',
                    width: '15%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '自定义';
                        } else if (val == 1) {
                            value = '我的订阅';
                        } else if (val == 2) {
                            value = '热门推荐';
                        } else if (val == 3) {
                            value = '最近上新';
                        }
                        return value;
                    }
                },
                { 
                    field: 'showType', 
                    title: '展示类型', 
                    width: '10%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '无';
                        } else if (val == 1) {
                            value = 'BANNER';
                        } else if (val == 2) {
                            value = '二网格';
                        } else if (val == 3) {
                            value = '九宫格';
                        }
                        return value;
                    } 
                },
                {
                    field: 'showTitle',
                    title: '是否展示标题',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '否';
                        } else if (val == 1) {
                            value = '是';
                        }
                        return value;
                    }
                },
                { 
                    field: 'optType', 
                    title: '操作类型', 
                    align: 'center', 
                    width: '5%', 
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '无';
                        } else if (val == 1) {
                            value = '刷新';
                        } else if (val == 2) {
                            value = '更多';
                        }
                        return value;
                    }
                },
                { field: 'optValue', title: '操作值', align: 'center', width: '15%' },
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
                    field: 'recommendId',
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
            recommend: {
                recommendId: 0,
                title: '',
                position: 0,
                recommendType: 0,
                showType: 0,
                showTitle: 0,
                optType: 0,
                optValue: '',
                seqNo: 0,
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
                    getRecommendPage(request.data).then(res => {
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
            this.recommend.recommendId = 0;
            this.recommend.title = '';
            this.recommend.position = 0;
            this.recommend.recommendType = 0;
            this.recommend.showType = 0;
            this.recommend.showTitle = 0;
            this.recommend.optType = 0;
            this.recommend.optValue = '';
            this.recommend.seqNo = 0;
            this.recommend.status = 1;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.recommend.recommendId = record.recommendId;
            this.recommend.title = record.title;
            this.recommend.position = record.position;
            this.recommend.recommendType = record.recommendType;
            this.recommend.showType = record.showType;
            this.recommend.showTitle = record.showTitle;
            this.recommend.optType = record.optType;
            this.recommend.optValue = record.optValue;
            this.recommend.seqNo = record.seqNo;
            this.recommend.status = record.status;
            this.show();
        },
        show() {
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                recommendId: this.recommend.recommendId,
                title: this.recommend.title,
                position: new Number(this.recommend.position),
                recommendType: new Number(this.recommend.recommendType),
                showType: new Number(this.recommend.showType),
                showTitle: new Number(this.recommend.showTitle),
                optType: new Number(this.recommend.optType),
                optValue: this.recommend.optValue,
                seqNo: new Number(this.recommend.seqNo),
                status: new Number(this.recommend.status),
            };
            (data.recommendId ? updateRecommend(data) : saveRecommend(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const recommendId = record.recommendId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delRecommend(recommendId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
    },
}
</script>
  
<style scoped></style>