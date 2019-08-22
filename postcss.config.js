// sep 路径中的分隔符，为了适配不同的操作系统
const { sep } = require('path')

module.exports = ({ file }) => {
  // file 编译的时候，处理的样式文件 file
  //     css/less/sass/vue
  // 判断文件路径中是否包含 vant，是否是vant提供的样式，如果是设置rootValue=37.5
  // 如果是自己写的样式，设置rootValue=750
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}

// module.exports = {
//   plugins: {
//     'autoprefixer': {
//       overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
//     },
//     'postcss-pxtorem': {
//       rootValue: 20,
//       propList: ['*']
//     }
//   }
// }
