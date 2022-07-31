<template>
  <v-app>
    <navbar-comp></navbar-comp>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavbarCompVue from './components/NavbarComp.vue';
import { mapActions } from 'vuex';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['addCurso'])
  },
  components:{
    "navbar-comp":NavbarCompVue
  },
  created(){
    this.addCurso();
  }
};
</script>
