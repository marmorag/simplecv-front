<template>
    <v-card dark>
        <v-img :src="project.img" :alt="project.title" :aspect-ratio="1.7778"></v-img>

        <v-card-title primary-title>
            <div>
                <div class="headline">{{ project.title }}</div>
                <span class="grey--text">{{ project.sdesc }}</span>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn icon target="_blank" :href="project.link !== '' ? project.link : '/'" :disabled="project.link === ''">
                <v-icon>mdi-link</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-arrow-down-drop-circle-outline' : 'mdi-arrow-up-drop-circle-outline' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
            <v-card-text v-show="show">
                {{ project.ldesc }}
            </v-card-text>
        </v-slide-y-transition>
    </v-card>
</template>
<script>
    export default {
        name: 'ProjectItem',
        props: {
            project: {
                type: Object,
                required: true,
            }
        },
        data: function () {
            return {
                show: false
            };
        }
    }
</script>