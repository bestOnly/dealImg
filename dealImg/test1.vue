<el-form-item label="产品图片：" prop="pictureUrl" class="itemClass">
 <el-upload
 class="avatar-uploader"
 drag
 :http-request="httpRequest"
 :action="upUrl"
 :show-file-list="false"
 :on-success="handleAvatarSuccess">
 <img v-if="addRule.pictureUrl" :src="addRule.pictureUrl" class="avatar">
 <p v-else style=" height: 20px;line-height: 20px;">
  <p v-if="!addRule.pictureUrl" style="font-size: 12px; height: 20px;line-height: 20px; position: absolute; top: 50px; color: #ccc;">点击上传，或者拖拽图片至该位置，图片大小2MB以内</p>
  <i class="el-icon-plus avatar-uploader-icon"></i>
</p>
</el-upload>
</el-form-item>





  httpRequest (options) {
    var that = this
    // 获取文件对象
    let file = options.file
    //判断图片类型
    if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/JPG') {
     var  isJPG =  true
    } else {
     isJPG =  false
    }
   // 判断图片大小
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
      this.$message.error('上传产品图片只能是 JPG/PNG/JPEG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传产品图片大小不能超过 2MB!')
    }
   // 创建一个HTML5的FileReader对象
    var reader = new FileReader();
    //创建一个img对象
   var  img = new Image();
    let filename = options.filename
    if (file) {
      reader.readAsDataURL(file)
    }
    if (isJPG && isLt2M) {
      reader.onload = (e) => {
      let base64Str = reader.result.split(',')[1]
       img.src = e.target.result
        // base64地址图片加载完毕后执行
            img.onload = function () {
                // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                // 图片原始尺寸
                var originWidth = this.width;
                var originHeight = this.height;
                // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                var maxWidth = 300,
                    maxHeight = 300;
                // 目标尺寸
                var targetWidth = originWidth,
                    targetHeight = originHeight;
                // 图片尺寸超过最大尺寸的限制
                if(originWidth > maxWidth || originHeight > maxHeight) {
                    if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更改宽度，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                //对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
                //压缩后的base64文件
                var newUrl = canvas.toDataURL('image/jpeg', 0.92);
                 that.Api.post("/app/uploadPicture",{ fileContent:newUrl})
                 .then(res => {
                  that.addRule.pictureUrl = res.data;
                })
                 .catch(err => {
                 })
            }
     }
    }
  },
