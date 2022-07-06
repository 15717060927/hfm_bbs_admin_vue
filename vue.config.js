
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    port: 8082, // 此处修改你想要的端口号
    proxy: "http://localhost:8080"
  }
}