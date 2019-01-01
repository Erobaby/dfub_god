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
      <a-table
        :columns="columns"
        :rowKey="record => record.login.uuid"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
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
  props: {
    msg: String
  },
  methods: {
    onSearch(value) {
      this.$ajax({
        method: "get",
        url:
          "http://dfubsync.staff.xdf.cn/query/lesson/info.json?classCode=" +
          value,
        data: {
          name: "wise",
          info: "wrong"
        }
      })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
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
