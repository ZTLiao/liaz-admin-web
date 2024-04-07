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
</template>
  
<script>
import TableHelper from '@/utils/bootstrap-table-helper';
import { getComicPage } from '@/api/asset/comic';
import { getFileUrl } from '@/utils/system-helper';

export default {
    name: 'ComicView',
    setup() {
        function showText(obj) {
            let text = unescape($(obj).prop('title'));
            let $div = $("#tipMsg"); 
            $div.attr('style', 'word-wrap: break-word;');
            $div.text(text);
            $("#tipModal").modal('show');
        }
        window.showText = showText;
        return {
            showText
        };
    },
    data() {
        return {
            columns: [
                { field: 'comicId', title: '漫画ID', align: 'center', width: '5%' },
                { field: 'firstLetter', title: '首字母', align: 'center', width: '5%' },
                { field: 'title', title: '漫画名称', align: 'center', width: '5%' },
                {
                    field: 'cover',
                    title: '漫画封面',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = getFileUrl(val);
                        return '<img src="' + value + '" width="70" height="60"/>';
                    }
                },
                { field: 'authors', title: '漫画作者', align: 'center', width: '5%' },
                { field: 'region', title: '漫画地区', align: 'center', width: '5%' },
                { 
                    field: 'description', 
                    title: '漫画简介', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        return '<div style="text-align: center; width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="' + escape(val) + '" onclick="showText(this);">' + val + '</div>';
                    }
                },
                { 
                    field: 'direction', 
                    title: '手势方向', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        let value = '';
                        if (val == 0) {
                            value = '左右';
                        } else if (val == 1) {
                            value = '上下';
                        } else if (val == 2) {
                            value = '右左';
                        }
                        return value;
                    } 
                },
                { 
                    field: 'flag', 
                    title: '漫画标记', 
                    align: 'center', 
                    width: '5%',
                    formatter: function (val, row, index) {
                        const serializated = 0b1;
                        const hide = 0b10;
                        const sort = 0b100;
                        const long = 0b1000;
                        let value = '';
                        if (val & serializated != 0) {
                            value += '连载';
                        } else {
                            value += '完结';
                        }
                        value += ' ';
                        if (val & hide != 0) {
                            value += '隐藏';
                        } else {
                            value += '显示';
                        }
                        value += ' ';
                        if (val & sort != 0) {
                            value += '升序';
                        } else {
                            value += '降序';
                        }
                        value += ' ';
                        if (val & long != 0) {
                            value += '条漫';
                        } else {
                            value += '页漫';
                        }
                        return value;
                    } 
                },
                { field: 'categories', title: '漫画分类', align: 'center', width: '5%' },
                { field: 'startTime', title: '连载时间', align: 'center', width: '5%' },
                { field: 'endTime', title: '更新时间', align: 'center', width: '5%' },
                { field: 'chapterNum', title: '章节数', align: 'center', width: '5%' },
                { field: 'subscribeNum', title: '订阅数', align: 'center', width: '5%' },
                { field: 'hitNum', title: '点击数', align: 'center', width: '5%' },
                {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    width: '5%',
                    formatter: function (val, row, index) {
                        return val ? '有效' : '无效';
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
                    field: 'comicId',
                    title: '操作',
                    align: 'center',
                    width: '20%',
                    formatter: function (val, row, index) {
                        let value = '<button class="btn btn-sm btn-success opt-edit" data-id="' + val + '" data-index="' + index + '">编辑</button>';
                        value += '<button class="btn btn-sm btn-danger opt-del" data-id="' + val + '" data-index="' + index + '">删除</button>';
                        return value;
                    }
                },
            ],
            comic: {
                comicId: 0,
                title: '',
                cover: '',
                description: '',
                firstLetter: '',
                direction: 0,
                flag: 0,
                categoryIds: '',
                categories: '',
                authorIds: '',
                authors: '',
                regionId: 0,
                region: '',
                chapterNum: 0,
                startTime: '',
                endTime: '',
                subscribeNum: 0,
                hitNum: 0,
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
                    getComicPage(request.data).then(res => {
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
    },
}
</script>
  
<style scoped></style>