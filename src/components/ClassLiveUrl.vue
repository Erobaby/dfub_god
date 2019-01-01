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
    <br>
    <a-row v-if="liveUrl">
      <a-col :xs="2" :sm="4" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="12" :xl="12">
        <a-input placeholder v-model="liveUrl" id="inputLiveUrl">
          <a-icon slot="prefix" type="link"/>
          <a-icon
            slot="suffix"
            type="copy"
            id="btnCopyLink"
            data-clipboard-target="#inputLiveUrl"
            @click="copyLink"
          />
        </a-input>
      </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>
    <br>
    <br>
  </div>
</template>

<script>
import Clipboard from "clipboard";

export default {
  name: "ClassLiveUrl",
  data: function() {
    return {
      liveUrl: ""
    };
  },
  methods: {
    onSearch(value) {
      let that = this;
      value = that.trim(value);
      if (!value) {
        return;
      }
      that
        .ajax({
          method: "get",
          url: "http://ub.xdf.cn/admin/eeo/lesson/watch/url.json?classCode=",
          data: { classCode: value }
        })
        .then(function(res) {
          if (res.data.code != 1) {
            that.$message.error(res.data.message);
            return;
          }
          that.liveUrl = res.data.data;
        })
        .catch(function(err) {
          console.error(err);
          that.$message.error(err);
        });
    },
    copyLink() {
      let clipboard = new Clipboard("#btnCopyLink");
      clipboard.on("success", e => {
        this.$message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.error("复制失败，请手动复制");
        clipboard.destroy();
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
