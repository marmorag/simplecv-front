<template>
    <v-card>
        <v-card-title>
            <span class="headline">Edit main page content</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-textarea label="Text content" :value="content"
                                    hint="Type here the content of the main page"></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import contentApi from '../api/content';

    export default {
        name: 'EditContent',
        data() {
            return {
                content: null,
            };
        },
        created() {
            contentApi.fetch().then((response) => {
                this.content = response.data['hydra:member'][0].content
            });
        }
    }
</script>