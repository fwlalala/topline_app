<template>
  <div class="login-hdr">
    <van-nav-bar title="黑马头条" />
    <form>
      <van-cell-group>
        <van-field
        name= "mobile"
        v-validate="'required|digits:11'"
        left-icon="phone-o"
        label="手机号"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :error-message="errors.first('mobile')"
        />
        <van-field
        name="code"
        left-icon="comment-o"
        v-validate="'required|digits:6'"
        v-model="user.code"
        :error-message="errors.first('code')"
        label="验证码"
        placeholder="请输入验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </form>
    <div class="login-btn">
        <van-button
        class="btn"
        :loading="btnLoading"
        type="info"
        @click="cliLogin"
        loading-type="spinner"
        loading-text="登陆中"
        >登录</van-button>
      </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { setUser } from '@/utils/auth'
export default {
  name: 'login',
  methods: {
    async cliLogin () {
      this.btnLoading = true
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          this.btnLoading = false
          return
        }
        const data = await login(this.user)
        this.$store.commit('setUser', data)
        this.$router.push({
          path: this.$route.query.redirect || '/'
        })
        this.$toast.success('登陆成功')
        // console.log(data)
      } catch (error) {
        this.$toast.fail('登陆失败')
        console.log(error)
      }
      this.btnLoading = false
    }
  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      btnLoading: false
    }
  },
  created () {
    // 自定义验证错误提示
    const dict = {
      custom: {
        mobile: {
          required: '手机号不能为空',
          digits: '手机号必须为11位数字'
        },
        code: {
          required: '验证码不能为空',
          digits: '验证码必须为6位数字'
        }
      }
    }
    this.$validator.localize('zh-CN', dict)
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px 60px;
  .btn {
    width: 100%;
  }
}
</style>
