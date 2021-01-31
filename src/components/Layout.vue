<template>
  <div id="layout">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>图书管理</template>
            <el-menu-item v-for="item in $router.options.routes" :key="item.name" :index="item.name" v-show="item.meta">{{ item.meta }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'layout'
}
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  #layout {
    padding: 0px;
    margin: 0px;
    height: 100%;
    width:100%;
  }
  .el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  width:100%;
  }
  .el-container {
    height: 100vh !important;
  }
</style>
