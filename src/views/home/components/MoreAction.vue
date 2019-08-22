<template>
  <van-dialog
    :showConfirmButton="false"
    :value="value"
    @input="$emit('input',$event)"
    closeOnClickOverlay
  >
    <van-cell-group v-show="!isReportShow">
      <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReportShow=true"/>
      <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')"/>
    </van-cell-group>
    <van-cell-group v-show="isReportShow">
      <van-cell icon="arrow-left" @click="isReportShow=false"/>
      <van-cell
        v-for="item in list"
        :title="item.title"
        :key="item.type"
        icon="location-o"
        @click="handle('report', item.type)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article'
import { blackUserList } from '@/api/user'

export default {
  name: 'MoreAction',
  props: ['value', 'currentArticle'],
  data () {
    return {
      isReportShow: false,
      list: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  methods: {
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklist()
          break
        case 'report':
          this.report()
          break
      }
    },
    // 不喜欢文章
    async dislike () {
      // console.log(this.currentArticle)
      try {
        const id = this.currentArticle.art_id
        await dislikeArticle(id)
        // 操作成功给home通过事件告知
        this.$emit('handleSuccess')
        this.$toast.success('操纵成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 拉黑作者
    async blacklist () {
      try {
        const id = this.currentArticle.aut_id
        await blackUserList(id)
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败' + error)
      }
    },
    // 反馈文章
    async report (reportType) {
      try {
        const id = this.currentArticle.art_id
        await reportArticle({
          id,
          type: reportType
        })
        this.$emit('input', false)
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败' + error)
      }
    }
  }
}
</script>

<style>
</style>
