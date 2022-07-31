<template>
<v-container>
  <acces-form-comp></acces-form-comp>
</v-container>
</template>

<script>
import AccessFormCompVue from '@/components/AccessFormComp.vue'
export default {
  data: function(){
    return {}
  },
  components:{
    "acces-form-comp":AccessFormCompVue
  }
}
</script>

<style scoped>
  
</style>