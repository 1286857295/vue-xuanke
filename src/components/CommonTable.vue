<template>
  <el-card class="common-table">
    <el-dialog title="编辑信息" :visible.sync="dialog" width="30%">
      <el-form :model="form" label-position="right">
        <el-form-item v-for="(val,key) in tableLabel" :key="val" :label="val+':'" label-width="80px">
          <el-input v-model="form[key]"></el-input>
        </el-form-item>
      </el-form>
      <!-- <div style="display:flex;flex-direction:row;">
        <el-input v-for="(val,key) in form" :key="val" v-model="form[key]" ></el-input>
      </div> -->
      <span slot="footer">
        <el-button type="success" @click="update">修 改</el-button>
      </span>
    </el-dialog>
    
    <el-table :data="tableData" ref="data" highlight-current-row style="height:85%">
      <!-- <el-table-column label="序号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 10 + scope.$index + 1 }}</span>
        </template>
      </el-table-column> -->
      <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage"></el-pagination> -->
    <div class="tool">
      <div class="left">
        <el-input v-model="target" placeholder="请输入搜索内容">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:130px;">
              <el-option v-for="item in selectLabel" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="right">
        <el-button type="success">添加</el-button>
        <el-button type="success">多条导入</el-button>
        <el-button type="success">导入excel</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Object,
    selectLabel:Array,
    config:Object
  },
  data() {
    return {
      select: '',
      target:'',
      dialog:false,
      form:{},
      scopeIndex:null
    }
  },
  methods: {
    handleEdit(index,row) {
      this.scopeIndex=index
      this.form=row
      this.dialog=true
    },
    handleDelete(index,row){
      this.tableData.splice(index,1)
      this.$http.get('xuanke/Admin/delete.php',{
        params:{
          table:this.selectLabel[0].value,
          id:row[Object.keys(row)[0]]
        }
      })
    },
    update(){
      this.dialog=false
      this.$message({
        message:'修改成功',
        type:'success'
      })
      this.form.table=this.config.table
      this.$http.get('xuanke/Admin/update.php',{
        params:this.form
      }).then(res=>{
        console.log(res.data)
      })
    },
    search(){
      this.tableData.forEach((value,index)=>{
        if(value[this.select].indexOf(this.target)!=-1){
          this.setCurrent(value)
        }
      })
    },
    setCurrent(row) {
      this.$refs.data.setCurrentRow(row)
    },
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  height: 100%;
  position: relative;
  .tool{
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
    .left{
      width: 60%;
    }
    .right{
      width: 30%;
    }
  }
  .pager {
    position: absolute;
    bottom: 30px;
    right: 0;
  }
  // /deep/.el-dialog__body{
  //   padding: 20px 50px;
  // }
}
</style>