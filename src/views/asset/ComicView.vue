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
                    <h4 class="modal-title" id="modalLabel">漫画信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" name="comicId" v-model="comic.comicId"/>
                        <div class="form-group">
                            <label for="firstLetter" class="col-sm-3 control-label">首字母:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="firstLetter" id="firstLetter"
                                    v-model="comic.firstLetter" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="title" class="col-sm-3 control-label">漫画名称:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control validate[required]" name="title" id="title"
                                    v-model="comic.title" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">封面</label>
                            <div class="col-sm-8">
                                <input type="hidden" class="form-control" name="cover" v-model="comic.cover" />
                                <img :src="imgFormatter(comic.cover)" style="width:120px;"/>
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
                            <label for="flag" class="col-sm-3 control-label">漫画标记:</label>
                            <div class="col-sm-8">
                                <input type="checkbox" name="flag" value="1" @change="check"/>{{ (comic.flag & 0b1) != 0 ? '连载' : '完结' }}<br>
                                <input type="checkbox" name="flag" value="2" @change="check"/>{{ (comic.flag & 0b10) != 0 ? '隐藏' : '显示' }}<br>
                                <input type="checkbox" name="flag" value="4" @change="check"/>{{ (comic.flag & 0b100) != 0 ? '升序' : '降序' }}<br>
                                <input type="checkbox" name="flag" value="8" @change="check"/>{{ (comic.flag & 0b1000) != 0 ? '条漫' : '页漫' }}<br>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-sm-3 control-label">描述:</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" name="description" id="description" v-model="comic.description">
                                </textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="direction" class="col-sm-3 control-label">阅读方向:</label>
                            <div class="col-sm-8">
                                <select name="direction" id="direction" data-btn-class="btn-warning" v-model="comic.direction">
                                    <option value="0">左右</option>
                                    <option value="1">上下</option>
                                    <option value="2">右左</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="col-sm-3 control-label">状态:</label>
                            <div class="col-sm-8">
                                <select name="status" id="status" data-btn-class="btn-warning" v-model="comic.status">
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
import { uploadFile } from '@/api/common/upload';
import { getComicPage, saveComic, updateComic, delComic } from '@/api/asset/comic';
import { getFileUrl } from '@/utils/system-helper';
import global from '@/constants/global';

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
                    title: '阅读方向', 
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
                        if ((val & serializated) != 0) {
                            value += '连载';
                        } else {
                            value += '完结';
                        }
                        value += ' ';
                        if ((val & hide) != 0) {
                            value += '隐藏';
                        } else {
                            value += '显示';
                        }
                        value += ' ';
                        if ((val & sort) != 0) {
                            value += '升序';
                        } else {
                            value += '降序';
                        }
                        value += ' ';
                        if ((val & long) != 0) {
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
        imgFormatter(path) {
            return getFileUrl(path);
        },
        init() {
            this.$nextTick(function () {
                let $this = this;
                $this.initTable();
                $('#uploadBtn').click(function () {
                    uploadFile({
                        id: 'file',
                        bucketName: global.BUCKET.COVER
                    }).then(res => {
                        $this.comic.cover = res.data.path;
                    });
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
        edit(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            this.comic.comicId = record.comicId;
            this.comic.title = record.title;
            this.comic.cover = record.cover;
            this.comic.description = record.description;
            this.comic.firstLetter = record.firstLetter;
            this.comic.direction = record.direction;
            this.comic.flag = record.flag;
            this.comic.categoryIds = record.categoryIds;
            this.comic.categories = record.categories;
            this.comic.authorIds = record.authorIds;
            this.comic.authors = record.authors;
            this.comic.regionId = record.regionId;
            this.comic.region = record.region;
            this.comic.chapterNum = record.chapterNum;
            this.comic.startTime = record.startTime;
            this.comic.endTime = record.endTime;
            this.comic.subscribeNum = record.subscribeNum;
            this.comic.hitNum = record.hitNum;
            this.comic.status = record.status;
            this.show();
        },
        show() {
            let flag = this.comic.flag;
            $("input:checkbox[name='flag']")[0].checked = ((flag & 0b1) != 0);
            $("input:checkbox[name='flag']")[1].checked = ((flag & 0b10) != 0);
            $("input:checkbox[name='flag']")[2].checked = ((flag & 0b100) != 0);
            $("input:checkbox[name='flag']")[3].checked = ((flag & 0b1000) != 0);
            $('#editModal').modal('show');
        },
        save() {
            let data = {
                comicId: this.comic.comicId,
                title: this.comic.title,
                cover: this.comic.cover,
                description: this.comic.description,
                firstLetter: this.comic.firstLetter,
                direction: new Number(this.comic.direction),
                flag: new Number(this.comic.flag),
                categoryIds: this.comic.categoryIds,
                categories: this.comic.categories,
                authorIds: this.comic.authorIds,
                authors: this.comic.authors,
                regionId: this.comic.regionId,
                region: this.comic.region,
                chapterNum: new Number(this.comic.chapterNum),
                startTime: this.comic.startTime,
                endTime: this.comic.endTime,
                subscribeNum: new Number(this.comic.subscribeNum),
                hitNum: new Number(this.comic.hitNum),
                status: new Number(this.comic.status),
            };
            (data.comicId != 0 ? updateComic(data) : saveComic(data)).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
                $('#editModal').modal('hide');
            });
        },
        del(obj) {
            const index = $(obj).data('index');
            const record = TableHelper.getData('#table')[index];
            const comicId = record.comicId;
            if (!confirm('是否确定要删除？')) {
                return;
            }
            delComic(comicId).then(res => {
                console.log(res);
                TableHelper.doRefresh('#table');
            });
        },
        check() {
            const flagArray = $("input:checkbox[name='flag']:checked").serializeArray();
            let flag = 0;
            for (let i = 0, len = flagArray.length; i < len; i++) {
                flag |= flagArray[i].value;
            }
            this.comic.flag = flag;
        },
    },
}
</script>
  
<style scoped></style>