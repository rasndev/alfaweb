<template>
<v-container>
  <v-row>
    <v-col class="text-center">
      <h3 class="text-h3">Administración</h3>
      <agrega-curso-comp></agrega-curso-comp>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <tabla-cursos-comp></tabla-cursos-comp>
      <contadores-comp></contadores-comp>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import TablaCursosCompVue from '@/components/TablaCursosComp.vue'
import ContadoresCompVue from '@/components/ContadoresComp.vue'
import AgregaCursoDialog from '@/components/AgregaCursoDialog.vue'
import { mapActions } from 'vuex'

export default {
  data: function(){
    return {}
  },
  components:{
    "tabla-cursos-comp":TablaCursosCompVue,
    "contadores-comp":ContadoresCompVue,
    "agrega-curso-comp":AgregaCursoDialog
  },
  methods:{
    ...mapActions(['addCurso'])
  },
  created(){
    this.addCurso;
  }
}
</script>

<style scoped>
  
</style>