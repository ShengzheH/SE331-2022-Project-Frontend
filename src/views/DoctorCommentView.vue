<template>
  <div>
    <h1>Please leave your comments!</h1>
    <form @submit.prevent="saveEvent">
      <BaseInput
        v-model="doctor.category"
        type="text"
        label="Category"
        class="field"
      />

      <h3>Name & describe your event</h3>

      <BaseInput v-model="doctor.comments" type="text" label="Comments" />
      <button type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
// import UploadImages from 'vue-upload-drop-images'
export default {
  inject: ['GStore'],
  components: {
    // UploadImages
  },
  data() {
    return {
      doctor: {
        category: '',
        title: '',
        description: '',
        location: '',
        organizer: { id: '', name: '' },
        imageUrls: []
      },
      files: []
    }
  },
  methods: {
    saveEvent() {
      Promise.all(
        this.files.map((file) => {
          return EventService.updateFile(file)
        })
      )
        .then((response) => {
          this.event.imageUrls = response.map((r) => r.data)
          EventService.saveEvent(this.event).then((response) => {
            console.log(response)
            this.$router.push({
              name: 'EventDetails',
              params: { id: response.data.id }
            })
          })
          this.GStore.flashMessage =
            'You are succcessfully add a new event for ' + response.data.title
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  }
}
</script>
<style scoped></style>
