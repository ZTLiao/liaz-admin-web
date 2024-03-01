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
                    <h4 class="modal-title" id="modalLabel">分类信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="categoryId" v-model="category.categoryId" />
                        <div class="form-group">
                            <label for="categoryCode" class="col-sm-3 control-label">分类编码:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="categoryCode" id="categoryCode"
                                    v-model="category.categoryCode" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="categoryName" class="col-sm-3 control-label">分类名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="categoryName" id="categoryName"
                                    v-model="category.categoryName" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="groupCode" class="col-sm-3 control-label">分类分组:</label>
                            <div class="col-sm-8">
                                    <select name="groupCode" id="groupCode" class="form-control" data-btn-class="btn-warning"  v-model="category.groupCode">
                                    <option :value="categoryGroup.groupCode" v-for="(categoryGroup, index) in categoryGroups" :key="categoryGroup" :data-index="index">{{ categoryGroup.groupName }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="seqNo" class="col-sm-3 control-label">排序:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="seqNo" id="seqNo"
                                    v-model="category.seqNo" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" class="form-control" data-btn-class="btn-warning"  v-model="category.status">
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
import { getCategoryPage, saveCategory, updateCategory, delCategory } from '@/api/basic/category';
import { getCategoryGroupList } from '@/api/basic/categoryGroup';

export default {
    name: 'CategoryView',
    data() {
        return {
            columns: [
                { field: 'categoryId', title: '分类ID', align: 'center', width: '5%' },
                { field: 'categoryCode', title: '分类编码', align: 'center', width: '15%' },
                { field: 'categoryName', title: '分类名称', align: 'center', width: '15%' },
                { 
                    field: 'groupCode', 
                    title: '分类分组', 
                    align: 'center', 
                    width: '15%',
                    formatter: function (val, row, index) {
                        let value = val;
                        if (this.categoryGroups.length > 0) {
                            let groups = this.categoryGroups.filter(v => v.groupCode == val);
                            if (groups.length > 0) {
                                value = groups[0].groupName;
                            }
                        }
                        return value;
                    }
                },
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
                    field: 'categoryId',
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
            category: {
                categoryId: 0,
                categoryCode: '',
                categoryName: '',
                groupCode: '',
                seqNo: 0,
                status: 1,
            },
            categoryGroups: [], 
        };
    },
    created() {
        this.groupList();
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
                    getCategoryPage(request.data).then(res => {
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
            this.category.categoryId = 0;
            this.category.categoryCode = '';
            this.category.categoryName = '';
            this.category.groupCode = '';
            this.category.seqNo = 0;
            this.category.status = 1;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.category.categoryId = record.categoryId;
            this.category.categoryCode = record.categoryCode;
            this.category.categoryName = record.categoryName;
            this.category.groupCode = record.groupCode;
            this.category.seqNo = record.seqNo;
            this.category.status = record.status;
            this.show();
        },
        show() {
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                categoryId: this.category.categoryId,
                categoryCode: this.category.categoryCode,
                categoryName: this.category.categoryName,
                groupCode: this.category.groupCode,
                seqNo: new Number(this.category.seqNo),
                status: new Number(this.category.status),
            };
            (data.categoryId != 0 ? updateCategory(data) : saveCategory(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const categoryId = record.categoryId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delCategory(categoryId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
        groupList() {
            getCategoryGroupList().then(res => {
                let data = res.data;
                this.categoryGroups = data.map(v => {
                    return {
                        groupCode: v.groupCode,
                        groupName: v.groupName,
                    }
                });
            });
        },
    },
}
</script>
  
<style scoped></style>