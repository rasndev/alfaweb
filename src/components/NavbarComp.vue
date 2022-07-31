<template>
<!-- TODO: no mostrar en Access -->
  <v-app-bar app 
    dark
    color="deep-purple accent-4"
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    
    <v-navigation-drawer 
      color="deep-purple accent-4"
      v-model="drawer"
      absolute app
      temporary>
    <!-- enlaces en drawer -->
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class=" text--accent-2">
          <router-link class="text-decoration-none" 
            v-for="(enlace, index) in enlaces" :key="index" :to="enlace.ruta">  
            <v-item-group>
              <v-list-item>
                <v-icon left>{{enlace.icono}}</v-icon>
                <span>{{enlace.texto}}</span>
              </v-list-item>
            </v-item-group>
            
          </router-link>
        
        </v-list-item-group>
      </v-list>
     
    </v-navigation-drawer>

  </v-app-bar>
</template>

<script>
export default {
  // props: {},
  data: () => ({
    drawer: false,
    group: null,
    enlaces:[
      {icono: "mdi-cog", texto: "Administrar cursos", ruta:"/admin"},
    ]
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
  
</style>