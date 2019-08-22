<template>
  <div>
    <!-- 导航头-搜索框 -->
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      show-action
      @input="handleSuggestion"
      @search="onSearch"
      @cancel="$router.push('/')"
    />

    <!-- 智能提示 -->
    <van-cell-group v-show="suggestionList.length">
      <van-cell
        @click="onSearch(item)"
        v-for="item in suggestionList"
        :key="item"
        icon="search">
        <div slot="title" v-html="hightlight(item)"></div>
      </van-cell>

    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-show="!suggestionList.length">
      <van-cell
        title="历史记录"
        >
        <van-icon
          v-show="!showClose"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          @click="showClose = true"
        />
        <div v-show="showClose">
          <span>全部删除</span>&nbsp;
          <span @click="showClose = false">完成</span>
        </div>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="item in histories"
        :key="item"
        :title="item"
      >
        <van-icon
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
          v-show="showClose"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import _ from 'lodash'
export default {
  name: 'search',
  data () {
    return {
      // 输入框的值
      value: '',
      suggestionList: [],
      showClose: false,
      histories: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  methods: {
    onSearch (value) {
      // 历史记录
      // 如果用户有登陆从服务器上获取数据
      // 如果没有登陆就从历史记录获取数据
      value = value || this.value
      // 如果历史记录没有 就添加到历史记录中
      if (!this.histories.includes(value)) {
        this.histories.push(value)
        window.localStorage.setItem('history', JSON.stringify(this.histories))
      }
      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: value
        }
      })
    },
    // 搜索建议 （函数防抖）
    handleSuggestion: _.debounce(async function () {
      try {
        if (this.value.trim() === '') {
          this.suggestionList = []
          return
        }
        const data = await getSuggestions(this.value)
        this.suggestionList = data.options
      } catch (error) {
        console.log(error)
      }
    }, 500),
    // 搜索关键字高亮显示
    hightlight (text) {
      return text.toLocaleLowerCase().split(this.value).join(`<span style="color: red">${this.value}</span>`)
    }
  }
}
</script>

<style>

</style>
