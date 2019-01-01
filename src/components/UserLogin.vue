<template>
  <div>
    <br>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-input addonAfter="@xdf.cn" v-model.trim="account" ref="accountInput" placeholder="请输入账号"></a-input>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-input type="password" v-model.trim="password" ref="passwordInput" placeholder="请输入密码"/>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <br>
    <a-row type="flex" justify="center" align="top">
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-button type="primary" @click="logon">登录</a-button>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <br>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data: function() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    logon() {
      let account = this.account + "@xdf.cn";
      let password = this.password;
      if (!account) {
        this.$message.warn("账号不能为空");
        this.$refs.accountInput.focus();
        return;
      }
      if (!password) {
        this.$message.warn("密码不能为空");
        this.$refs.passwordInput.focus();
        return;
      }
      let that = this;
      that.ajaxPost(
        "god/user/logon.json",
        { account: account, password: password },
        {
          "1": function(data) {
            that.$store.commit("setSessionUser", {
              userId: data.userId,
              logonStatus: true,
              account: data.account,
              username: data.name
            });
            let redirect = that.$router.currentRoute.query.redirect;
            redirect = redirect ? redirect : "/";
            that.$router.push({
              path: redirect
            });
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
