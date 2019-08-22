<template>
  <div>
    <van-nav-bar fixed title="黑马头条">
      <van-icon slot="left" class="apps-o" name="apps-o" @click="showChannel = true" />
    </van-nav-bar>
    <!-- 下拉更新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-tabs @change="handleChange" v-model="activeIndex">
        <van-tab
          v-for="channel in channels"
          :title="channel.name"
          :key="channel.id">
          <!-- 文章列表-自带上拉加载更多 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
           <!-- 展示文章列表 -->
            <van-cell
              v-for="item in channel.articles"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <div slot="label">
                <template v-if="item.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
                      <van-image lazy-load :src="item" />
                    </van-grid-item>
                  </van-grid>
                </template>
                <p>
                  <span>{{ item.aut_name }}</span>&nbsp;
                  <span>{{ item.comm_count }}条评论</span>&nbsp;
                  <span>{{ item.pubdate | fmtDate }}</span>&nbsp;

                  <van-icon class="close" name="close" @click="hanleActionShow(item)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <MoreAction @handleSuccess="handleSuccess" v-model="showAction" :currentArticle="currentArticle" ></MoreAction>
    <homeChannel
     v-model="showChannel"
     :channels="channels"
     :activeIndex="activeIndex"
      @selectMyIndex="handleMyIndex"
     ></homeChannel>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import { getUserArticles } from '@/api/article'
import MoreAction from './components/MoreAction'
import homeChannel from './components/homeChannel'
export default {
  name: 'home',
  data () {
    return {
      // 文章列表
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      // 频道列表
      channels: [],
      // 当前频道选中索引
      activeIndex: 0,
      timestamp: Date.now(),
      // 控制action的隐藏和显示
      showAction: false,
      // 记录当前要操作的文章
      currentArticle: {},
      // 控制显示频道管理
      showChannel: false,
      successText: ''
    }
  },
  components: {
    MoreAction,
    homeChannel
  },
  methods: {
    async onLoad () {
      this.$sleep(1000)
      // 获取当前频道
      const activeChannel = this.channels[this.activeIndex]
      const id = activeChannel.id
      const data = await getUserArticles({ channelId: id, timestamp: activeChannel.timestamp })
      activeChannel.articles.push(...data.results)

      // // 保存data中的pre_timestamp
      // this.timestamp = data.pre_timestamp
      this.loading = false

      // // 判断是否加载完所有数据
      if (data.results.length === 0) {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 获取当前频道的id
      const articleChannel = this.channels[this.activeIndex]
      const id = articleChannel.id
      const data = await getUserArticles({ channelId: id, timestamp: Date.now() })
      console.log(data)
      articleChannel.articles.unshift(...data.results)
      this.isLoading = false
      this.successText = `${data.results.length}条数据加载完毕`
    },
    async loadChannels () {
      try {
        if (this.$store.state.user) {
          // 如果用户登陆了，发送请求获取数据
          const data = await getUserChannels()
          this.channels = data.channels
        } else {
          // 如果用户没有登陆 先从本地存储获取频道  没有的话再去发送请求 然后保存到本地存储
          this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
          if (this.channels.length === 0) {
            const data = await getUserChannels()
            this.channels = data.channels
            window.localStorage.setItem('channels', JSON.stringify(this.channels))
          }
        }
        this.channels.forEach((item) => {
          this.$set(item, 'articles', [])
          item.timestamp = Date.now()
        })
      } catch (error) {
        this.$toast.fail('获取频道信息失败')
      }
    },
    handleChange () {
      this.timestamp = Date.now()
    },
    hanleActionShow (item) {
      this.showAction = true
      this.currentArticle = item
      // console.log(this.currentArticle)
    },
    handleSuccess () {
      this.showAction = false
      const AArticles = this.channels[this.activeIndex].articles
      const index = AArticles.findIndex((item) => {
        return item.art_id === this.currentArticle.art_id
      })
      AArticles.splice(index, 1)
    },
    handleMyIndex (index) {
      this.activeIndex = index
      this.showChannel = false
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
.close {
  float:right;
  font-size: 30px;
  color:#000;
}
.apps-o {
  color: #fff;
  font-size: 50px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 88px;
}
.van-tabs {
  margin-bottom: 100px;
  margin-top: 92px;
}
</style>
