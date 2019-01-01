<template>
  <div>
    <br>
    <a-row>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8">
        <span>{{sessionUser.username}}</span>
        <br>
        <span>{{sessionUser.account}}</span>
        <br>
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
export default {
  name: "Home",
  data: function() {
    return {
      sessionUser: this.getSessionUser()
    };
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
