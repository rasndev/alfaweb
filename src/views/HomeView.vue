<template>
<v-container>
  <v-row>
    <v-col>
      <h3 class="text-h3 text-center">Lista de cursos</h3>
    </v-col>
  </v-row>
  <v-row justify="space-around">
    <v-col v-for="(curso, index) in cursosMostrar" :key="index" cols="12" md="4" class="d-flex justify-center">
      <v-card width="400">
        <v-img
          height="200px"
          src=""
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h6 white--text pl-0">
              Información
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
          <v-card-title class="white--text mt-8">
            <p class="ml-3">
              John Doe
            </p>
          </v-card-title>
        </v-img>
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Today
          </div>
          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              color="deep-purple lighten-1"
              small
            >
              <div>
                <div class="font-weight-normal">
                  Costo: <strong>{{ curso.costo }}</strong> 
                </div>
                <div>
                  Duración: <strong>{{ curso.duracion }}</strong>
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item
              color="green"
              small
            >
              <div>
                <div class="font-weight-normal">
                  Cupos: <strong>{{ curso.cupos }}</strong>
                </div>
                <div>
                  Completado: <strong>{{ curso.terminado }}</strong>
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item
              color="deep-purple lighten-1"
              small
            >
              <div>
                <div class="font-weight-normal">
                  Fecha de registro:
                </div>
                <div>
                  <strong>{{ curso.fechaReg }}</strong>
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item
              :color="curso.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  Descripción:
                </div>
                <div>
                  <strong>{{ curso.descripcion }}</strong>
                </div>
              </div>
            </v-timeline-item>

          </v-timeline>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data(){
      return{
        
      }
    }, 
    computed:{
      ...mapState(['cursos']),       
      cursosMostrar(){
        return this.cursos.slice(0, 3)
      }
    },  
    created(){
      console.log();
    }
  }
</script>
