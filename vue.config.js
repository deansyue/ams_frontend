const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/ams_frontend/' : '/',
  transpileDependencies: true
})
