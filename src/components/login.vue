<template>
  <div>
    <div class="main">
      <div class="photo"><img src="#" alt="头像图片"></div>
      <div class="form">
        <el-input class="input"></el-input>
        <el-input class="input"></el-input>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.main{
  box-shadow: #000010 10px 10px 50px;
  width: 550px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px 20px;
}
  .photo{
  background-color:#ff11ff;
  }
  .form{
    position: relative;
    top: 20%;
    left:50%;
    transform: translate(-50%);
    width: 60%;
  }
  .input{
    margin-top: 50px;
  }
</style>
<script>
export default {

}
</script>
