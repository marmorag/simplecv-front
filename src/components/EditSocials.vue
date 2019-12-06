<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-data-table :headers="headers" :items="socials" class="elevation-1">
        <template v-slot:top>
            <v-layout row wrap color="white">
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.link" label="Link of the media"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.icon" label="A MDI icon tag"></v-text-field>
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
    import socialsApi from '../api/socials';
    export default {
        data: () => ({
            dialog: false,
            headers: [
                { text: 'Link', value: 'link' },
                { text: 'Icon', value: 'icon' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            socials: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                link: '',
                icon: '',
            },
            defaultItem: {
                id: '',
                link: '',
                icon: '',
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
                let response = await socialsApi.fetchSocials();
                this.socials = response.data['hydra:member'];
            },

            editItem (item) {
                this.editedIndex = this.socials.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.socials.indexOf(item);
                let response = confirm('Are you sure you want to delete this item?');

                if (response)  {
                    socialsApi.deleteSocials(item);
                    this.socials.splice(index, 1);
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
                    Object.assign(this.socials[this.editedIndex], this.editedItem);
                    socialsApi.updateSocials(this.editedItem);
                } else {
                    this.socials.push(this.editedItem);
                    socialsApi.createSocials(this.editedIndex);
                }
                this.close();
            },
        },
    }
</script>
