<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group>
      <van-cell title="从相册选择" @click="handleSelectPhoto"/>
      <input type="file" @change="handleFile" ref="file" style="display: none" />
      <van-cell title="拍照" />
      <van-cell title="取消" @click="$emit('input', false)" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 上传图片接口
import { uploadPhoto } from '@/api/user'
// vant提供的图片上传组件
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  name: 'UploadPhoto',
  props: ['value'],
  methods: {
    handleSelectPhoto () {
      // 取file标签DOM
      this.$refs.file.click()
    },
    // 当用户选择图片后
    handleFile () {
      // 隐藏选择图片的弹出层
      this.$emit('input', false)
      // 图片预览
      ImagePreview({
        images: [
          // 生成一个临时可预览的图片地址
          URL.createObjectURL(this.$refs.file.files[0])
        ],
        // 不显示图片编号
        showIndex: false,
        onClose: this.handleUpload
      })
    },
    // 文件上传
    async handleUpload () {
      // 弹出确认框
      this.$dialog.confirm({
        message: '是否设置该图片为头像'
      }).then(async () => {
        // 加载提示
        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传...'
        })

        // on confirm
        // 上传图片
        try {
          const data = await uploadPhoto('photo', this.$refs.file.files[0])
          // 更改父组件中显示的头像
          this.$emit('uploadSuccess', data.photo)
          this.$toast.success('上传成功')
        } catch (err) {
          this.$toast.fail('上传失败' + err)
        }

        toast.clear()
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style>
</style>
