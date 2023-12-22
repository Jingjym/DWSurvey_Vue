<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="dw-table-form" style="padding-left: 60px;">
          <el-form :inline="true" :model="formInline" class="dw-form-inline" size="medium" >
            <el-form-item label="问卷标题">
              <el-input v-model="formInline.surveyName" placeholder="请输入查询的问卷标题" clearable></el-input>
            </el-form-item>
            <el-form-item label="问卷状态" style="margin-left: 40px;">
              <el-select v-model="formInline.surveyState" placeholder="请选择问卷状态" clearable>
                <el-option label="收集中" value="1"></el-option>
                <el-option label="收集结束" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 40px;">
              <!-- TODO: not implemented -->
              <el-button @click="resetSubmit('formInline')">重置</el-button>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dw-table">
          <div class="dw-table-title">
            <el-row :span="24" type="flex" justify="space-between" align="middle">
              <el-col :span="4"><h3>我的答卷</h3></el-col>
            </el-row>
          </div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="问卷" >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p v-html="scope.row.surveyName" ></p>
                  <div slot="reference" class="name-wrapper">
                    <div v-if="scope.row.surveyNameText != null" v-text="scope.row.surveyNameText"></div>
                    <div v-else v-html="scope.row.surveyName"></div>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="发布者" >
              <template slot-scope="scope">
                <!-- TODO: use userName -->
                <span style="margin-left: 10px">{{ scope.row.userId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.surveyState === 1" type="success" >收集中</el-tag>
                <el-tag v-else-if="scope.row.surveyState === 2" type="info" >收集结束</el-tag>
                <el-tag v-else disable-transitions style="margin-left: 10px" >未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="答卷时间" width="180" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.endAnDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <el-button-group>
                  <el-tooltip effect="dark" content="查看答卷" placement="top">
                    <el-button size="mini" icon="el-icon-view" @click="handleGo(`/no-top/dw-survey/d/data/${scope.row.surveyId}/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="问卷地址" placement="top">
                    <el-button size="mini" icon="el-icon-share" @click="handlePush(`/dw/survey/c/url/${scope.row.id}`)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="复制问卷" placement="top">
                    <el-button size="mini" icon="el-icon-copy-document" @click="handleCopy(scope.$index, scope.row)"></el-button>
                  </el-tooltip>
                  <!-- 警告用户：删除答卷只会在本账号删除，问卷发布者依然可以看到您的答卷 -->
                  <!-- <el-tooltip effect="dark" content="删除答卷" placement="top">
                    <el-button size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
                  </el-tooltip> -->
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <div class="dw-pagination">
            <el-pagination
              :page-size="pageSize"
              :current-page="currentPage"
              :total="total"
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" append-to-body width="40%" >
        <el-form :model="form" label-position="top">
          <el-form-item :label-width="formLabelWidth" label="问卷标题" >
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入问卷标题" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="copySurvey">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>

import {dwAnswerList} from '@/api/dw-survey'
import {dwSurveyCopy} from '../../api/dw-survey'

export default {
  name: 'DwUserAnswer',
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      dialogTitle: '复制问卷',
      formInline: {
        surveyName: null,
        surveyState: null
      },
      dialogFormVisible: false,
      form: {
        name: '',
        id: null
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.queryList(1)
  },
  methods: {
    handlePush: function (to) {
      this.$router.push(to)
    },
    handleCopy (index, row) {
      console.log(index, row)
      this.form.id = row.id
      if (row.surveyNameText !== undefined && row.surveyNameText !== null) {
        this.form.name = `${row.surveyNameText}`
      } else {
        this.form.name = `复制问卷标题`
      }
      this.dialogFormVisible = true
      this.dialogTitle = '复制问卷'
    },
    // handleDelete (index, row) {
    //   this.$msgbox.confirm('确认删除此问卷吗？', '删除警告', {type: 'warning', confirmButtonText: '确认删除'}).then(() => {
    //     const data = {id: [row.id]}
    //     dwSurveyDelete(data).then((response) => {
    //       console.log(response)
    //       const httpResult = response.data
    //       if (httpResult.resultCode === 200) {
    //         this.$message.success('删除成功，即将刷新数据。')
    //         this.queryList(1)
    //       } else {
    //         this.$message.error('删除问卷失败')
    //       }
    //     })
    //   }).catch(() => {})
    // },
    onSubmit () {
      console.log('submit!')
      this.queryList(1)
    },
    resetSubmit (formName) {
      this.$refs[formName].resetFields()
      console.log('reset!')
      this.queryList(1)
    },
    handleCurrentChange (val) {
      this.queryList(val)
    },
    queryList (pageNo) {
      const {surveyName, surveyState} = this.formInline
      dwAnswerList(this.pageSize, pageNo, surveyName, surveyState).then((response) => {
        const resultData = response.data.data
        this.tableData = resultData
        this.total = response.data.total
        this.currentPage = response.data.current
        this.pageSize = response.data.pageSize
      })
    },
    copySurvey () {
      dwSurveyCopy(this.form.id, this.form.name).then((response) => {
        const httpResult = response.data
        const resultData = httpResult.data
        if (httpResult.resultCode === 200) {
          this.dialogFormVisible = false
          this.$confirm('问卷复制成功，点击“继续编辑问卷”进入问卷编辑。', '系统提示', {confirmButtonText: '继续编辑问卷'}).then(({value}) => {
            window.location.href=`/static/diaowen/design.html?surveyId=${resultData.id}`
          }).catch(() => {
            this.queryList(1)
          })
        } else {
          this.$message.error('问卷复制失败')
        }
      })
    }
  }
}
</script>
<style scoped>
.dw-table-form{
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.dw-table{
  background: white;
  padding: 20px;
}
.dw-table .dw-table-title{
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.dw-table .dw-table-title h3{
  padding: 0px;
  margin: 0px;
}
.el-form-item{
  margin-bottom: 0px;
}
.dw-pagination{
  padding-top: 20px;
  text-align: right;
}
</style>
