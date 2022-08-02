<template>
<div>
  <v-data-table
    :headers="headers"
    :items="cursos"
    class="elevation-1"
  >
    <template v-slot:top>
      
      <v-toolbar flat>
        <v-dialog v-model="dialogEdit">
          <v-card>
            <v-card-title>
              <span class="text-h5">CACA</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre de curso"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.costo"
                      label="Costo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cupos"
                      label="Cupos"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.duracion"
                      label="Duración"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fechaReg"
                      label="Fecha de registro"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.inscritos"
                      label="Inscritos"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.terminado"
                      label="Terminado"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.urlImg"
                      label="URL de imagen"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro que deseas eliminar este curso?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'component-name',
  data: function(){
    return {
      dialogEdit: false,
      editedItem: {
        nombre: '',
        cupos: 0,
        inscritos: 0,
        duracion: 0,
        costo: 0,
        fechaReg: "",
      },
      headers:[
        { text: 'Curso',value: 'nombre', sortable: false, },
        { text: 'Cupos', value: 'cupos' },
        { text: 'Inscritos', value: 'inscritos' },
        { text: 'Duración', value: "duracion"},
        { text: 'Costo', value: 'costo' },
        { text: 'Terminado', value: '' },
        { text: 'Fecha', value: 'fechaReg' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      dialogDelete: false,
    }
  },
  computed: {
    ...mapState(["cursos"]),
  },
  methods: {
    editItem (item) {
      let editDoc = item.codigo;
      console.log(editDoc);
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem);
      this.dialogEdit = true
    },

    deleteItem (item) {
      console.log("delete");
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
  watch: {
    dialogEdit (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
}
</script>

<style scoped>
  
</style>