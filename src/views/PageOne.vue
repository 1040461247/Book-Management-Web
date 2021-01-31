<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="书名">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteInfo(scope.row)" type="text" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="page">
    </el-pagination>  
  </div>
</template>

<script>
  export default {
    methods: {
      edit(row) {
        this.$router.push(`/editBook/${row.id}`)
        console.log(row);
      },
      deleteInfo(row) {
        this.$confirm(`确认删除${row.name}？`).then( async ()=> {
          const res = await axios.delete(`/book/delete/${row.id}`)
          if(res.data === "success") {
            this.$message.success("删除成功")
            this.refresh()
          } else {
            this.$message.error("删除失败")
          }
        }).catch(()=> {
          this.$message("操作取消")
        });
      },
      async page(currentpage) {
        var res = await axios.get(`/book/pageQuery/${currentpage}/${this.pageSize}`)
        this.tableData = res.data.content
      },
      refresh() {
        axios.get(`/book/pageQuery/1/${this.pageSize}`).then((res) => {
          this.tableData = res.data.content
          this.total = res.data.total
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    data() {
      return {
        pageSize: 6,
        total: null,
        tableData: null,
        dialogVisible: false
      }
    },
    created() {
      this.refresh()
    }
  }
</script>