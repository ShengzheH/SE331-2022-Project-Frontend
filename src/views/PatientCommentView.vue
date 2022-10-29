<template>
  <div class="background"></div>
  <CommentList v-if="comments.length" :comments="comments"></CommentList>
  <div class="value">
    Doctor:
    <BaseSelectDoc :options="this.doctors" v-model="doctorid" />
  </div>
  <CommentForm @comment-submitted="addComment"></CommentForm>
</template>
<script>
import DoctorService from '@/services/DoctorService.js'
import CommentService from '@/services/CommentService.js'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      comments: [],
      doctors: [],
      doctorid: ''
    }
  },
  created: function () {
    CommentService.getCommentByPatient(this.id).then((response) => {
      this.comments = response.data
    })

    DoctorService.getTotalDoctors().then((response) => {
      this.doctors = response.data
    })
  },
  methods: {
    addComment(comment) {
      if (this.doctorid == '') {
        this.GStore.flashMessage = 'Please select doctor'
        setTimeout(() => {
          this.GStore.flashMessage = ''
        }, 3000)
        return
      }
      //   console.log(this.doctorid, comment, this.id)
      //   this.comments.push(comment)
      //   console.log(comment)
      CommentService.addComment(comment, this.doctorid, this.id).then(
        (response) => {
          console.log(response)
          // this.$router.push({ name: 'Layout', params: { id: this.patient.id } })
          this.$router.go(0)
        }
      )
      this.GStore.flashMessage = 'Your comment has been added'
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      //      this.$router.go(0)
    }
  }
}
</script>
<style scoped>
#building {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 500px;
  height: 200px;
  cursor: pointer;
  border: 3px solid #a6abb1;
  border-radius: 20px;
  margin: auto;
  text-align: center;
  background-image: url('../assets/card.jpg');
  background-position: absolute;
  background-size: 100% 100%;
  /* background-color: blanchedalmond; */
}
.value {
  padding-left: 0%;
  color: green;
}
</style>
