<template>
  <div class="image-input">
    <div :id="id" class="placeholder d-flex align-items-center justify-content-center cursor-pointer" v-if="hasImage == false" @click="clickInputFile">
      Tải lên ảnh đại diện
    </div>
    <div v-else>
      <my-image :src="image" class="d-block mb-3" :loading="isUploading" />
      <div class="text-center">
        <button class="btn btn-sm btn-outline-secondary" @click="clickInputFile">Đổi</button>
        <button class="btn btn-sm btn-outline-danger" @click="removeImage">Xóa</button>
      </div>
    </div>
    <input type="file" style="display: none" :id="inputFileId">
  </div>
</template>
<script>
  import { strRandom } from '@/helpers/str';
  import storageApi from '@/api/storage';
  import myImage from '@/components/image';

  export default {
    props: {
      id: {
        type: String,
        default () {
          return strRandom(5);
        }
      },

      inputFileId: {
        type: String,
        default () {
          return strRandom(5);
        }
      },

      value: {
        type: String,
        default: undefined,
      }
    },

    components: {
      myImage
    },

    computed: {
      hasImage () {
        return !!this.image;
      }
    },

    data () {
      return {
        image: undefined,
        isUploading: false,
      }
    },

    mounted () {
      let that = this;
      this.image = this.value;

      $(`#${this.inputFileId}`).change(function () {
        that.previewImage(this);
        that.uploadImage(this);
      });
    },

    methods: {
      removeImage () {
        this.image = undefined;
        this.$emit('input', '');
      },

      clickInputFile () {
        $(`#${this.inputFileId}`).trigger('click');
      },

      previewImage (input) {
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = e => {
            this.image = e.target.result;
          }
          reader.readAsDataURL(input.files[0]);
        }
      },

      async uploadImage (file) {
        if (file.files && file.files[0]) {
          this.isUploading = true;
          let formData = new FormData();
          formData.append('upload', file.files[0]);
          let { data: response } = await storageApi.upload(formData);
          this.isUploading = false;

          this.$emit('input', response.url);
        }
      }
    }
  }
</script>
