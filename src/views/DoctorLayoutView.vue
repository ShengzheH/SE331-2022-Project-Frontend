<template>
  <div class="background" v-if="GStore.doctor">
    <div id="nav">
      <router-link :to="{ name: 'DoctorPatientDetail' }"
        >DoctorPatientDetail</router-link
      >|
      <router-link :to="{ name: 'DoctorCommentView' }"
        >DoctorComment</router-link
      >
    </div>
    <router-view :patient="GStore.doctor" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
