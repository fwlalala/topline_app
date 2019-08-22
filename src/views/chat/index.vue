<template>
  <div class="page-user-chat">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <!-- 聊天信息列表 -->
    <div class="chat-list" ref="chatList">
      <div
      v-for="(item,index) in messages"
      :key="item.timestamp + index"
      :class="item.robot ? 'left' : 'right' "
      class="chat-item"
      >
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="chat-pao">{{item.msg}}</div>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="说点什么...">
        <van-loading v-if="commentLoading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send('你好')" slot="button" style="font-size:12px;color:#999">发送</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      value: '',
      commentLoading: false,
      socket: null,
      // 保存聊天记录
      messages: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 创建socket对象
    this.socket = io('http://ttapi.research.itcast.cn', {
      // 设置token
      query: {
        token: this.user.token
      }
    })
    // 注册事件
    this.socket.on('content', () => {
      console.log('连接成功')
    })
    // 服务器返回数据
    this.socket.on('message', (data) => {
      this.messages.push({
        // 区别是否是机器人
        robot: true,
        ...data
      })
    })
    this.socket.on('disconnect', () => {
      console.log('断开连接')
    })
  },
  methods: {
    send () {
      // 要发送给服务器的内容
      const msg = {
        msg: this.value,
        timestamp: Date.now(),
        robot: false
      }
      this.messages.push(msg)
      this.socket.send(msg)
    },
    handleScroll () {
      // 数据更新完毕后，等待本次更新后的数据在界面上渲染之后在执行
      this.$nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    }
  }
}
</script>

<style scoped lang='less'>
.page-user-chat {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 92px 0 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 20px;
      .van-image{
        vertical-align: top;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 70%;
        min-height: 80px;
        line-height: 80px;
        border: 0.5px solid #c2d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before{
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 26px;
          border-top:1px solid #c2d9ea;
          border-right:1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 30px;
    &::before{
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 30px;
    margin-right: 0;
    &::before{
      left: -12px;
      transform: rotate(-135deg);
    }
  }
}
.van-image{
  width: 80px;
  height: 80px;
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
