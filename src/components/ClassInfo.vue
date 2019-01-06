<template>
  <div>
    <br>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <a-input-search placeholder="输入班号" @search="onSearch" enterButton/>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">班号</a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">{{classInfo.code}}</a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">班名</a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">{{classInfo.name}}</a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">开始时间</a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">{{classInfo.beginTime}}</a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8">结束时间</a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">{{classInfo.endTime}}</a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
    </a-row>
    <a-row>
      <a-table
        :columns="columns"
        :rowKey="record => record.login.uuid"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
      >
        <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
      </a-table>
    </a-row>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: "ClassInfo",
  data: function() {
    return {
      classInfo: {
        code: "",
        name: "",
        beginTime: null,
        endTime: null
      },
      lessons: []
    };
  },
  props: {
    msg: String
  },
  methods: {
    onSearch(value) {
      this.ajaxPost(
        "god/class/detail.json",
        { classCode: value },
        {
          "1": d => {
            this.classInfo.code = d.classInfo.classCode;
            this.classInfo.name = d.classInfo.className;
            this.classInfo.beginTime = d.classInfo.beginTime;
            this.classInfo.endTime = d.classInfo.endTime;
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
