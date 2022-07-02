<template>

  <div>消息中心</div>
</template>

<script>
export default {
  name: "MessageCenter",
  data() {
    return {
      messageData: ''
    }

  },
  mounted() {
    this.getMessage();
  },
  methods: {
    getMessage() {

      //获取消息数据


    },
    messageActive(messageId, messageStatus) {
      console.log(messageId, messageStatus);
      if (messageStatus == 0) {
        //提交阅读状态
        if (response.data.status == 1) {
          this.$set(this.messageData[messageId - 1], 'status', 1);
        }
        //提交阅读状态
      }


    }
  }
}
</script>

<style scoped>

</style>