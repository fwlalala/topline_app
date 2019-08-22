import Vue from 'vue'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
// 汉化
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 安装dayjs相对时间处理的插件
dayjs.extend(relativeTime)

Vue.filter('fmtDate', (value) => {
  // console.log('dayjs', dayjs())
  // console.log('dayjs(value)', dayjs(value))
  // console.log('dayjs().to(dayjs(value))', dayjs().to(dayjs(value)))
  // console.log('dayjs().from(dayjs(value))', dayjs().from(dayjs(value)))

  return dayjs().to(dayjs(value))
})
