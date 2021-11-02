<template>
<div class="create-group-from">
  <el-row>
    <el-col :offset="2" :span="18">
      <el-alert title="请输入组名" :closable="false"></el-alert>
      <el-input v-model="groupName" placeholder="请输入组名"></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :offset="2" :span="18">
      <el-alert title="请输入小组描述" :closable="false"></el-alert>
      <el-input  v-model="described"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
      ></el-input>
    </el-col>
  </el-row>

  <el-row>
    <el-col :offset="7" :span="10">
      <el-button @click="$emit('creategroup',
            {'groupName': groupName, 'described': described})"
                 style="width: 100%;margin-top:20px"
                 type="primary"
      >
        创建
      </el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "CreateGroupFrom",
  data(){
    return {
      groupName: null,
      described: null
    }
  }
}
</script>

<style scoped>
.create-group-from{
  padding: 30px 20px 50px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>