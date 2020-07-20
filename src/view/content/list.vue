<template>
  <div class="content-container">
    <div class="title">期刊管理</div>
    <div class="tool">
      <el-button type="primary" @click="AddContent">新增期刊</el-button>
    </div>
    <div class="list-content">
      <el-table :data="currentContentList">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            {{type[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容" ></el-table-column>
        <el-table-column prop="fav_nums" label="点赞数" ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" type="success">有效</el-tag>
            <el-tag v-else type="info">无效</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="defalut" @click="editContent(scope.row)" >编辑</el-button>
            <el-button type="danger" @click="deleteContent(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :background="true"
        :page-size="rows"
        :current-page="page"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title=title
      :visible.sync="dialogVisible"
      @close="resetForm">
      <el-form :model="contentObj" :rules="rules" ref="contentForm" label-width="120px" >
        <el-form-item label="封面图片" prop="image">
          <upload-imgs ref="uploadEle" :value="imageData" :max-num="1"/>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="contentObj.type">
            <el-radio :label="100">电影</el-radio>
            <el-radio :label="200">音乐</el-radio>
            <el-radio :label="300">句子</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="contentObj.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-form-item prop="content">
              <el-input type="textarea" v-model="contentObj.content"></el-input>
            </el-form-item>
        </el-form-item>
        <el-form-item label="发布时间">
            <el-form-item prop="pubdate">
              <el-date-picker type="date" v-model="contentObj.pubdate" placeholder="发布日期"></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="contentObj.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="title === '新增期刊' ? add() : update()">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="400px">
      <span>确认删除内容?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="_delete">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { ContentModel } from '@/model/content'
import UploadImgs from '@/component/base/upload-image'

export default {
  name: 'list.vue',
  data() {
    return {
      page: 1,
      rows: 4,
      total: 0,
      type: {
        100: '电影',
        200: '音乐',
        300: '句子'
      },
      contentList: [],
      dialogVisible: false,
      title: '',
      imageData: [],
      contentObj: {
        id: null,
        title: '',
        image: '',
        type: '',
        content: '',
        pubdate: '',
        status: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        image: [
          // { required: true, message: '请上传封面图片', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        pubdate: [
          { required: true, message: '请选择发布时间', trigger: 'change' }
        ]
      },
      deleteDialogVisible: false
    }
  },
  components: {
    UploadImgs
  },
  computed: {
    currentContentList() {
      return this.contentList.slice((this.page - 1) * this.rows, this.page * this.rows)
    }
  },
  methods: {
    async getContentList() {
      const res = await ContentModel.getContentList()
      this.contentList = res
      this.total = res.length
      console.log(res)
    },
    handleCurrentChange(val) {
      this.page = val
    },
    AddContent() {
      this.title = '新增期刊'
      this.dialogVisible = true
    },
    resetForm() {
      this.imageData = []
      this.contentObj = {}
      this.$refs.contentForm.resetFields()
    },
    async add() {
      const image = await this.$refs.uploadEle.getValue()
      this.contentObj.image = image.length < 1 ? '' : image[0].src

      this.$refs.contentForm.validate(async vali => {
        if (vali) {
          delete this.contentObj.id
          const res = await ContentModel.addContent(this.contentObj)
          this.dialogVisible = false
          this.$message.success(res.message)
          this.getContentList()
        }
      })
    },
    editContent(row) {
      this.title = '编辑期刊'
      this.dialogVisible = true
      this.contentObj = Object.assign({}, row)
      this.imageData.push({ display: row.image })
    },
    async update() {
      const image = await this.$refs.uploadEle.getValue()
      this.contentObj.image = image.length < 1 ? '' : image[0].display

      this.$refs.contentForm.validate(async vali => {
        if (vali) {
          const { id } = this.contentObj
          delete this.contentObj.id
          const res = await ContentModel.editContent(id, this.contentObj)
          this.dialogVisible = false
          this.$message.success(res.message)
          this.getContentList()
        }
      })
    },
    deleteContent(row) {
      this.deleteDialogVisible = true
      this.contentObj.id = row.id
      this.contentObj.type = row.type
    },
    async _delete() {
      const res = await ContentModel.deleteContent(this.contentObj.id, this.contentObj.type)
      this.deleteDialogVisible = false
      this.$message.success(res.message)
      this.getContentList()
    }
  },
  created() {
    this.getContentList()
  }
}
</script>

<style lang="scss" scoped>
  .content-container{
    padding: 0 30px;
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
    .list-content{
      margin: 20px 0;
    }
  }
</style>
