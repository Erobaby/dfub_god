<template>
  <div>
    <br>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-input type="text" v-model.trim="studentCode" placeholder="请输入学员号"></a-input>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-input type="text" v-model.trim="studentName" placeholder="请输入学员姓名"/>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <br>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-button type="primary" @click="bind">绑定</a-button>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <br>
  </div>
</template>

<script>
export default {
  name: "UserStudentCodeBind",
  data: function() {
    return {
      userId: 0,
      studentCode: "",
      studentName: ""
    };
  },
  methods: {
    bind() {
      this.ajaxPost(
        "god/studentCode/bind.json",
        { userId: this.userId, studentCode: this.studentCode, studentName: this.studentName },
        {
          "1": data => {
            console.log(data);
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
