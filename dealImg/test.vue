 <el-upload 
              class="avatar-uploader"
              action='#'
              accept="image/*"
              :show-file-list="false"
              :before-upload="getFileIcon"
            >
            <img v-if="form.iconURL" :src="form.iconURL" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

methods：{

getFileIcon(file) {
      imgShrink(file,120,120).then(res => {
        this.form.iconURL = res
      });
    },

}







// 压缩图片
export function imgShrink(file,imgWidth,imgHeight) {
  return new Promise(function(resolve, reject) {
    let imgResult = ""
    var width = imgWidth || 100 //图像大小
    var height = imgHeight || 100//图像大小
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      let img = new Image();
      img.src = this.result;
      let quality = 0.8, //图像质量 取值0-1 值越小，所绘制出的图像越模糊
      canvas = document.createElement("canvas"),
      drawer = canvas.getContext("2d");
      img.onload = function () {
        canvas.width = width;
        canvas.height = height;
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 返回base64
        imgResult = canvas.toDataURL("image/png", quality);
        resolve(imgResult);
      }
    };
    reader.onerror = function(error) {
      reject(error);
    };
  });
}