<template>
  <div class="content-container">
    <div class="title">人物列表</div>
    <div class="tool">
      <el-button type="primary" @click="">新增人物</el-button>
    </div>
    <div class="list-content">
      <el-table :data="personList">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="人物名称"></el-table-column>
        <el-table-column prop="from" label="来源作品"></el-table-column>
        <el-table-column prop="remark" label="备注" ></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sex === 1" type="success">男</el-tag>
            <el-tag v-else type="danger">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" ></el-table-column>
<!--        <el-table-column label="操作" fixed="right">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="defalut" @click="editContent(scope.row)" >编辑</el-button>-->
<!--            <el-button type="danger" @click="deleteContent(scope.row)" >删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
<!--    <el-dialog-->
<!--      :title=title-->
<!--      :visible.sync="dialogVisible"-->
<!--      @close="resetForm">-->
<!--      <el-form :model="contentObj" :rules="rules" ref="contentForm" label-width="120px" >-->
<!--        <el-form-item label="封面图片" prop="image">-->
<!--          <upload-imgs ref="uploadEle" :value="imageData" :max-num="1"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="类型" prop="type">-->
<!--          <el-radio-group v-model="contentObj.type">-->
<!--            <el-radio :label="100">电影</el-radio>-->
<!--            <el-radio :label="200">音乐</el-radio>-->
<!--            <el-radio :label="300">句子</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="标题" prop="title">-->
<!--          <el-input v-model="contentObj.title"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="内容">-->
<!--          <el-form-item prop="content">-->
<!--            <el-input type="textarea" v-model="contentObj.content"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="发布时间">-->
<!--          <el-form-item prop="pubdate">-->
<!--            <el-date-picker type="date" v-model="contentObj.pubdate" placeholder="发布日期"></el-date-picker>-->
<!--          </el-form-item>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态">-->
<!--          <el-switch v-model="contentObj.status" :active-value="1" :inactive-value="0"></el-switch>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="title === '新增期刊' ? add() : update()">保 存</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
<!--    <el-dialog-->
<!--      title="提示"-->
<!--      :visible.sync="deleteDialogVisible"-->
<!--      width="400px">-->
<!--      <span>确认删除内容?</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="deleteDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="danger" @click="_delete">删 除</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import { PersonModel } from '../../model/person'

export default {
  name: 'person-list.vue',
  data() {
    return {
      page: 1,
      rows: 10,
      total: 0,
      personList: [],
      // dialogVisible: false,
      // title: '',
      // imageData: [],
      // contentObj: {
      //   id: null,
      //   title: '',
      //   image: '',
      //   type: '',
      //   content: '',
      //   pubdate: '',
      //   status: ''
      // },
      // rules: {
      //   title: [
      //     { required: true, message: '请输入标题', trigger: 'blur' }
      //   ],
      //   image: [
      //     // { required: true, message: '请上传封面图片', trigger: 'blur' }
      //   ],
      //   type: [
      //     { required: true, message: '请选择类型', trigger: 'change' }
      //   ],
      //   pubdate: [
      //     { required: true, message: '请选择发布时间', trigger: 'change' }
      //   ]
      // },
      // deleteDialogVisible: false
    }
  },
  components: {},
  computed: {},
  methods: {
    async getPersonList() {
      const res = await PersonModel.getPersonList(this.page, this.rows)
      this.personList = res.datas
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getPersonList()
    },
    // AddContent() {
    //   this.title = '新增期刊'
    //   this.dialogVisible = true
    // },
    // resetForm() {
    //   this.imageData = []
    //   this.contentObj = {}
    //   this.$refs.contentForm.resetFields()
    // },
    // async add() {
    //   const image = await this.$refs.uploadEle.getValue()
    //   this.contentObj.image = image.length < 1 ? '' : image[0].src
    //
    //   this.$refs.contentForm.validate(async vali => {
    //     if (vali) {
    //       delete this.contentObj.id
    //       const res = await ContentModel.addContent(this.contentObj)
    //       this.dialogVisible = false
    //       this.$message.success(res.message)
    //       this.getPersonList()
    //     }
    //   })
    // },
    // editContent(row) {
    //   this.title = '编辑期刊'
    //   this.dialogVisible = true
    //   this.contentObj = Object.assign({}, row)
    //   this.imageData.push({ display: row.image })
    // },
    // async update() {
    //   const image = await this.$refs.uploadEle.getValue()
    //   this.contentObj.image = image.length < 1 ? '' : image[0].display
    //
    //   this.$refs.contentForm.validate(async vali => {
    //     if (vali) {
    //       const { id } = this.contentObj
    //       delete this.contentObj.id
    //       const res = await ContentModel.editContent(id, this.contentObj)
    //       this.dialogVisible = false
    //       this.$message.success(res.message)
    //       this.getPersonList()
    //     }
    //   })
    // },
    // deleteContent(row) {
    //   this.deleteDialogVisible = true
    //   this.contentObj.id = row.id
    //   this.contentObj.type = row.type
    // },
    // async _delete() {
    //   const res = await ContentModel.deleteContent(this.contentObj.id, this.contentObj.type)
    //   this.deleteDialogVisible = false
    //   this.$message.success(res.message)
    //   this.getPersonList()
    // }
  },
  created() {
    this.getPersonList()
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
