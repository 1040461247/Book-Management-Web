<template>
  <div>
    <h1>{{$props.id ? '编辑图书' : '新建图书'}}</h1>
    <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="ID" v-if="$props.id">
        <el-input v-model="ruleForm.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="书名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          id: null,
          name: '',
          author: '',
          publish: '',
          pages: '',
          price: '',
          bookcaseid: '',
          abled: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入书名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      id: null
    },
    methods: {
      submitForm(formName) {
        if(this.$props.id) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              const res = await axios.put(`/book/editBook`, this.ruleForm)
              if(res.data === "success") {
                this.$message.success("编辑成功")
                this.$router.replace('/selectBook')
              } else {
                this.$message.error("编辑失败");
              }
            } else {
              return false;
            }
          })
        } else {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              const res = await axios.post('/book/save', this.ruleForm)
              if(res.data === "success") {
                this.$message.success("添加成功")
                this.$router.replace('/selectBook')
              } else {
                this.$message.error("添加失败");
              }
            } else {
              return false;
            }
          })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      if(this.$props.id) {
        axios.get(`/book/findById/${this.$props.id}`).then(res => {
          this.ruleForm = res.data
        })
      }
    }
  }
</script>