<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table :headers="headers" :items="skills" class="elevation-1">
        <template v-slot:top>
            <v-layout row wrap color="white">
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2 mr-5 mt-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="Skill name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.level" label="The estimated level on 100"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import skillsApi from '../api/skills';
    export default {
        data: () => ({
            dialog: false,
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Level', value: 'level' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            skills: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                name: '',
                level: 0,
            },
            defaultItem: {
                name: '',
                level: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            async initialize () {
                let response = await skillsApi.fetchSkills();
                this.skills = response.data['hydra:member'];
            },

            editItem (item) {
                this.editedIndex = this.skills.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.skills.indexOf(item);
                let response = confirm('Are you sure you want to delete this item?');

                if (response)  {
                    skillsApi.deleteSkills(item);
                    this.skills.splice(index, 1);
                }
            },
            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    this.editedItem.level = parseInt(this.editedItem.level);
                    Object.assign(this.skills[this.editedIndex], this.editedItem);
                    skillsApi.updateSkills(this.editedItem);
                } else {
                    if (this.editedItem.id !== undefined) {
                        delete this.editedItem.id;
                    }

                    this.editedItem.level = parseInt(this.editedItem.level);
                    this.skills.push(this.editedItem);
                    skillsApi.createSkills(this.editedItem);
                }
                this.close();
            },
        },
    }
</script>
