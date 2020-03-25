<template>
  <div class="notice common">
    <div class="search">
      <div class="search-item">
        <span>类型</span>
        <el-select v-model="search.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span>标题</span>
        <el-input v-model="search.title" placeholder="请输入文章标题"></el-input>
      </div>
      <div class="search-item">
        <span>状态</span>
        <el-select v-model="search.state" placeholder="请选择">
          <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="searchNotice">查询</el-button>
    </div>
    <div class="table-wrapper">
      <div class="table-btn">
        <div class="btn-handle">
          <el-button type="primary" @click="addNotice">新增</el-button>
        </div>
        <div class="btn-change">
          <i class="el-icon-s-fold" :class="{'active' : listType}" @click="listType = true"></i>
          <i class="el-icon-menu" :class="{'active' : !listType}" @click="listType = false"></i>
        </div>
      </div>
      <div v-if="listType" class="table-main">
        <el-table
          :data="noticeList"
          style="width: 100%">
          <el-table-column prop="lx" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.lx === '1'">通知</span>
              <span v-if="scope.row.lx === '2'">公告</span>
            </template>
          </el-table-column>
          <el-table-column prop="bt" label="标题"></el-table-column>
          <el-table-column prop="fbsj" label="发布时间"></el-table-column>
          <el-table-column prop="fbyhmc" label="发布人"></el-table-column>
          <el-table-column prop="zt" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.zt === '1'">编辑</span>
              <span v-if="scope.row.zt === '2'">发布</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="seeNotice(scope.row)" v-if="scope.row.zt === '2'">查看</el-button>
              <el-button size="mini" type="success" @click="editNotice(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteNotice(scope.row)" v-if="scope.row.zt === '1'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="!listType" class="card-mian">
        <div class="cardItem" v-for="(item, index) in noticeList" :key="index">
          <div class="userName">{{item.bt ? item.bt : '暂无标题'}}</div>
          <div class="infoWrapper">
            <div class="info-item">
              <span class="info-key">类型</span>
              <span class="info-value">{{item.lx}}</span>
            </div>
            <div class="info-item">
              <span class="info-key">发布时间</span>
              <span class="info-value">{{item.fbsj}}</span>
            </div>
            <div class="info-item">
              <span class="info-key">发布人</span>
              <span class="info-value">{{item.fbyhmc}}</span>
            </div>
            <div class="info-item">
              <span class="info-key">状态</span>
              <span class="info-value" v-if="item.zt === '1'">编辑</span>
              <span class="info-value" v-if="item.zt === '2'">发布</span>
            </div>
          </div>
          <div class="card-btn">
            <el-button size="mini" type="primary" @click="seeNotice(item)" v-if="item.zt === '2'">查看</el-button>
            <el-button size="mini" type="success" @click="editNotice(item)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteNotice(item)" v-if="item.zt === '1'">删除</el-button>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="pageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div class="dialog">
      <el-dialog :title="dialogTitle" :visible.sync="showNoticeDialog" :before-close="cancelNoticeSet">
        <el-form :model="noticeForm" ref="noticeForm" :rules="userRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="noticeForm.type" placeholder="请选择">
                  <el-option v-for="item in typesDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
                <el-select v-model="noticeForm.state" placeholder="请选择">
                  <el-option v-for="item in stateDialog" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input type="text" v-model="noticeForm.title"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="范围" :label-width="formLabelWidth" prop="unitIds">
                <el-select v-model="noticeForm.unitIds" multiple value-key="dwid" placeholder="请选择">
                  <el-option v-for="(item, index) in unitList" :key="index" :label="item.mc" :value="item.dwid"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="来源" :label-width="formLabelWidth" prop="ly">
                <el-input type="text" v-model="noticeForm.ly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="图片" :label-width="formLabelWidth" prop="imageUrl">
            <!-----------------http-request----------------->
            <el-upload
              class="img-uploader"
              action="#"
              :http-request="imgUpload"
              :show-file-list="false">
              <img v-if="noticeForm.imageUrl" :src="noticeForm.imageUrl" class="img">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="附件" :label-width="formLabelWidth" prop="fjwj">
            <el-upload
              class="annexUpload"
              action="#"
              :http-request="annexUpload"
              multiple
              :file-list="noticeForm.fjwj">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="nr">
            <tinymce :height="300" v-model="noticeForm.nr" :id="tinymceId"></tinymce>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelNoticeSet">取 消</el-button>
          <el-button type="primary" @click="submitNoticeSet">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog class="seeNotice" title="查看通知公告" :visible.sync="showNoticeDetail">
        <h1>{{noticeDetail.title}}</h1>
        <div class="noticeContent" v-html="noticeDetail.content"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getNoticeInfo, uploadImg, addNoticeItem, getNoticeItem, editNoticeItem} from '@/api/notice'
import {getUnitTree} from '@/api/treeAndList'
import {ERR_CODE} from 'common/js/config'
import {pagingMixin} from 'common/js/mixin'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'notice',
  mixins: [pagingMixin],
  components: {Tinymce},
  data () {
    return {
      listType: true,
      search: {
        type: '',
        title: '',
        state: ''
      },
      types: [
        {value: '', label: '全部'},
        {value: '1', label: '通知'},
        {value: '2', label: '公告'}
      ],
      states: [
        {value: '', label: '全部'},
        {value: '1', label: '编辑'},
        {value: '2', label: '发布'}
      ],
      noticeList: [],
      // 弹窗
      isAdd: true,
      showNoticeDialog: false,
      tinymceId: '',
      isImgUpload: true,
      unitList: [],
      noticeForm: {
        tzggid: '',
        type: '',
        state: '',
        title: '',
        imageUrl: '',
        fjwj: [],
        ly: '',
        unitIds: [],
        nr: ''
      },
      userRules: {
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        unitIds: [
          { required: true, message: '范围不能为空', trigger: 'change' }
        ],
        nr: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ]
      },
      imgParams: { // action
        fileType: 'noticeFile'
      },
      formLabelWidth: '60px',
      // 查看通知公告
      showNoticeDetail: false,
      isSee: false,
      noticeDetail: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    stateDialog () {
      let stateDialog = JSON.parse(JSON.stringify(this.states))
      stateDialog.shift()
      return stateDialog
    },
    typesDialog () {
      let typesDialog = JSON.parse(JSON.stringify(this.types))
      typesDialog.shift()
      return typesDialog
    },
    dialogTitle () {
      return this.isAdd ? '通知公告增加' : '通知公告修改'
    },
    ...mapGetters([
      'userLogin'
    ])
  },
  created () {
    this.tinymceId = new Date().getTime() + ''
    this._getNoticeList({search: this.search, page: 1})
  },
  methods: {
    pageChange (val) {
      this.currentPage = val
      this._getNoticeList({search: this.search})
    },
    seeNotice (item) {
      this.isSee = true
      this.showNoticeDetail = true
      this._getNoticeItem(item.tzggid)
    },
    async addNotice () {
      this.unitList = await getUnitTree('getUnitList')
      this.showNoticeDialog = true
      this.isAdd = true
    },
    async editNotice (item) {
      this.unitList = await getUnitTree('getUnitList')
      this._getNoticeItem(item.tzggid)
      this.showNoticeDialog = true
      this.isAdd = false
      this.isSee = false
    },
    cancelNoticeSet () {
      this.showNoticeDialog = false
      this.$refs.noticeForm.resetFields()
      console.log(this.noticeForm)
    },
    submitNoticeSet () {
      this.$refs.noticeForm.validate(valid => {
        if (valid) {
          console.log(this.noticeForm)
          if (this.isAdd) {
            this._addNoticeInfo(this.noticeForm)
          } else {
            this._editNoticeInfo(this.noticeForm)
          }
        } else {
          return false
        }
      })
    },
    deleteNotice (item) {
      console.log(item)
      this._deleteNoticeItem(item.tzggid)
    },
    searchNotice () {
      this._getNoticeList({search: this.search, page: 1})
    },
    imgUpload (content) {
      this.isImgUpload = true
      let url = 'http://www.netpaper.top:5000/gateway/admin/admin/file/upImage'
      this._noticeUpload(content.file, url)
    },
    annexUpload (content) {
      this.isImgUpload = false
      let url = 'http://www.netpaper.top:5000/gateway/admin/admin/file/upFile'
      this._noticeUpload(content.file, url)
    },
    _noticeUpload (file, url) {
      let ImgData = new FormData()
      ImgData.append('upfile', file)
      ImgData.append('fileType', 'noticeFile')
      console.log(ImgData)
      uploadImg(ImgData, url).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          if (this.isImgUpload) {
            this.noticeForm.imageUrl = res.dz
          } else {
            let annex = {
              name: res.ysmc,
              url: res.dz,
              id: res.wjid
            }
            this.noticeForm.fjwj.push(annex)
          }
        }
      })
    },
    _addNoticeInfo (params) {
      console.log(params)
      const addParams = {
        lx: params.type,
        bt: params.title,
        ly: params.ly,
        nr: params.nr,
        tpwj: params.imageUrl,
        zt: params.state,
        list_units: params.unitIds,
        yhid: this.userLogin,
        url: 'addNoticeInfo'
      }
      let fjArr = params.fjwj
      let fjUrlArr = []
      fjArr.map((item) => {
        fjUrlArr.push(item.id)
      })
      addParams.fjwj = fjUrlArr.join(',')
      console.log(addParams)
      addNoticeItem(addParams).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          this.cancelNoticeSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getNoticeList({search: this.search})
        } else {
          this.cancelNoticeSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _editNoticeInfo (params) {
      const editParams = {
        tzggid: params.tzggid,
        lx: params.type,
        bt: params.title,
        ly: params.ly,
        nr: params.nr,
        tpwj: params.imageUrl,
        zt: params.state,
        list_units: params.unitIds,
        yhid: this.userLogin,
        url: 'editNoticeInfo'
      }
      let fjArr = params.fjwj
      let fjUrlArr = []
      fjArr.map((item) => {
        fjUrlArr.push(item.id)
      })
      editParams.fjwj = fjUrlArr.join(',')
      editNoticeItem(editParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.cancelNoticeSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getNoticeList({search: this.search})
        } else {
          this.cancelNoticeSet()
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
      })
    },
    _deleteNoticeItem (noticeId) {
      const deleteParams = {
        noticeId,
        url: 'deleteNoticeInfo'
      }
      getNoticeItem(deleteParams).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'success'
          })
          this._getNoticeList({search: this.search})
        } else {
          this.$message({
            showClose: true,
            message: res.errmsg,
            type: 'error'
          })
        }
        console.log(res)
      })
    },
    _getNoticeItem (noticeId) {
      const params = {
        noticeId,
        url: 'getNoticeById'
      }
      console.log(params)
      getNoticeItem(params).then((res) => {
        console.log(res)
        if (res.errcode === ERR_CODE) {
          if (!this.isSee) {
            let noticeItem = res.list[0]
            this.noticeForm.tzggid = noticeItem.tzggid
            this.noticeForm.type = noticeItem.lx
            this.noticeForm.title = noticeItem.bt
            this.noticeForm.ly = noticeItem.ly
            this.noticeForm.nr = noticeItem.nr
            this.noticeForm.imageUrl = noticeItem.tpwj
            this.noticeForm.state = noticeItem.zt
            this.noticeForm.unitIds = noticeItem.list_units
            console.log(111)
            console.log(this.noticeForm)
            const fileArr = noticeItem.list_file_filePath
            fileArr.map((item) => {
              let file = {}
              file.name = item.ysmc
              file.url = item.dz
              file.id = item.wjid
              this.noticeForm.fjwj.push(file)
            })
          } else {
            console.log(123)
            this.noticeDetail = {}
            let noticeItem = res.list[0]
            this.noticeDetail.title = noticeItem.bt
            this.noticeDetail.content = noticeItem.nr
          }
        }
      })
    },
    _getNoticeList ({search, page = this.currentPage}) {
      const getInfo = {
        type: search.type,
        title: search.title,
        state: search.state,
        pageSize: this.pageSize,
        pageNo: page,
        url: 'getNoticeInfo'
      }
      console.log(getInfo)
      getNoticeInfo(getInfo).then((res) => {
        if (res.errcode === ERR_CODE) {
          this.noticeList = res.rows
          this.total = res.totalCount
        }
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/common"
  .dialog
    .img-uploader
      /deep/  .el-upload
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
        &:hover
          border-color: #409EFF;
    .avatar-uploader-icon
      width: 178px
      height: 178px
      line-height: 178px
      display: block
    .img
      width: 175px
      height: 175px
      display: block
    .seeNotice
      h1
        padding-bottom: 30px
        text-align: center
        font-size: 22px
</style>
