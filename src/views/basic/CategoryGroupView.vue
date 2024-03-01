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
                    <h4 class="modal-title" id="modalLabel">分类分组信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="categoryGroupId" v-model="categoryGroup.categoryGroupId" />
                        <div class="form-group">
                            <label for="groupCode" class="col-sm-3 control-label">分组编码:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="groupCode" id="groupCode"
                                    v-model="categoryGroup.groupCode" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="groupName" class="col-sm-3 control-label">分组名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="groupName" id="groupName"
                                    v-model="categoryGroup.groupName" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="seqNo" class="col-sm-3 control-label">排序:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="seqNo" id="seqNo"
                                    v-model="categoryGroup.seqNo" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" class="form-control" data-btn-class="btn-warning"  v-model="categoryGroup.status">
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
import { getCategoryGroupPage, saveCategoryGroup, updateCategoryGroup, delCategoryGroup } from '@/api/basic/categoryGroup';

export default {
    name: 'CategoryGroupView',
    data() {
        return {
            columns: [
                { field: 'categoryGroupId', title: '分组ID', align: 'center', width: '5%' },
                { field: 'groupCode', title: '分组编码', align: 'center', width: '15%' },
                { field: 'groupName', title: '分组名称', align: 'center', width: '15%' },
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
                    field: 'categoryGroupId',
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
            categoryGroup: {
                categoryGroupId: 0,
                groupCode: '',
                groupName: '',
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
                    getCategoryGroupPage(request.data).then(res => {
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
            this.categoryGroup.categoryGroupId = 0;
            this.categoryGroup.groupCode = '';
            this.categoryGroup.groupName = '';
            this.categoryGroup.seqNo = 0;
            this.categoryGroup.status = 1;
            this.show();
        },
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.categoryGroup.categoryGroupId = record.categoryGroupId;
            this.categoryGroup.groupCode = record.groupCode;
            this.categoryGroup.groupName = record.groupName;
            this.categoryGroup.seqNo = record.seqNo;
            this.categoryGroup.status = record.status;
            this.show();
        },
        show() {
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                categoryGroupId: this.categoryGroup.categoryGroupId,
                groupCode: this.categoryGroup.groupCode,
                groupName: this.categoryGroup.groupName,
                seqNo: new Number(this.categoryGroup.seqNo),
                status: new Number(this.categoryGroup.status),
            };
            (data.categoryGroupId != 0 ? updateCategoryGroup(data) : saveCategoryGroup(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });

        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const categoryGroupId = record.categoryGroupId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delCategoryGroup(categoryGroupId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
    },
}
</script>
  
<style scoped></style>