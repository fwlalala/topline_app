<template>
  <div v-if="currentUser">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
    />
      <!-- @click-right="btnSave" -->
    <van-cell-group  >
      <van-cell title="头像" is-link @click="showUpload = true">
        <div slot="default">
          <img width="30" height="30" :src="currentUser.photo"  alt="">
        </div>
      </van-cell>
      <van-cell title="昵称" is-link :value="currentUser.name" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="性别" is-link :value="currentUser.gender ? '女' : '男'"/>
      <van-cell title="生日" is-link :value="currentUser.birthday"/>
    </van-cell-group>
    <!-- 显示图片上传组件 -->
    <upload-photo v-model="showUpload" @uploadSuccess="uploadSuccess"></upload-photo>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadPhoto from './components/UpLoadPhoto'
export default {
  name: 'UserProfile',
  components: {
    UploadPhoto
  },
  data () {
    return {
      currentUser: null,
      showUpload: false
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    async loadProfile () {
      try {
        const data = await getUserProfile()
        this.currentUser = data
      } catch (error) {
        this.$toast.fail('获取用户资料失败')
      }
    },
    uploadSuccess (photo) {
      this.currentUser.photo = photo
    }
  }
}
</script>

<style lang="less" scoped>
.van-dialog /deep/ .van-cell__title {
  text-align: center;
}
.van-nav-bar__text {
  color: #fff;
  font-size:30px;
}
</style>
