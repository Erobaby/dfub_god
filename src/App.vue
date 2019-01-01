<template>
  <a-layout id="app">
    <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" style="text-align:center">
        <img alt="dfub logo" src="./assets/logo.png">
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['m_user_student_code']">
        <!-- 用户 -->
        <a-sub-menu key="m_user">
          <span slot="title">
            <a-icon type="user"/>
            <span>用户</span>
          </span>
          <a-menu-item key="m_user_student_code">
            <router-link to="/user_student_code">学员号查询</router-link>
          </a-menu-item>
          <a-menu-item key="m_user_account">
            <router-link to="/user_account">账号查询</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- 排课 -->
        <a-sub-menu key="m_class">
          <span slot="title">
            <a-icon type="reconciliation"/>
            <span>课程</span>
          </span>
          <a-menu-item key="m_class_info">
            <router-link to="/class_info">班级信息</router-link>
          </a-menu-item>
          <a-menu-item key="m_class_student">
            <router-link to="/class_student">班级学生</router-link>
          </a-menu-item>
          <a-menu-item key="m_class_live_url">
            <router-link to="/class_live_url">直播链接</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- 系统 -->
        <a-sub-menu key="m_system">
          <span slot="title">
            <a-icon type="setting"/>
            <span>系统</span>
          </span>
          <a-menu-item key="m_system_setting">
            <router-link to="/system_setting">系统设置</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <a-row v-if="sessionUser.logonStatus">
          <span>不忘初心，砥砺前行</span>
          <span>{{sessionUser.username}}</span>
          <a-button type="primary" @click="logout">退出</a-button>
        </a-row>
        <a-row v-if="!sessionUser.logonStatus">
          <span>{{sessionUser.username}}</span>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">东方优播©2018</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data: function() {
    return {
      sessionUser: this.$store.state.sessionUser
    };
  },
  methods: {
    logout() {
      this.sessionUser = {
        userId: 0,
        logonStatus: false,
        account: "",
        username: "游客"
      };
      this.$store.commit("clearSessionUser");
      this.$router.push({ path: "/" });
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>