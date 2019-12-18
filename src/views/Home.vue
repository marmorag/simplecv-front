<template>
    <v-container>
        <v-layout row wrap>
            <v-tabs class="elevation-2" dark :centered="true">
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#tab-pres">
                    WHo am I
                </v-tab>
                <v-tab href="#tab-skills">
                    How I may help
                </v-tab>

                <v-tab-item value="tab-pres">
                    <v-card flat tile>
                        <v-card-text>
                            <v-layout row>
                                <h2>Guillaume Marmorat - Web Developer</h2>
                            </v-layout>
                            <v-layout row wrap class="blockquote" v-html="content">
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item value="tab-skills">
                    <v-card flat tile>
                        <v-layout row wrap>
                            <Skills class="col-6 offset-3"/>
                        </v-layout>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item v-for="(url, i) in urls" :key="i" :src="url"></v-carousel-item>
                </v-carousel>
            </v-flex>
            <v-flex xs4 v-for="project in projects" :key="project.id">
                <ProjectItem :project="project" class="ma-4"/>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>

    import Skills from '../components/Skills';
    import ProjectItem from "../components/ProjectItem";
    import projectList from '../assets/projects';
    import unsplashApi from '../api/unsplash';
    import contentAPi from '../api/content';

    export default {
        name: 'Home',
        components: {
            ProjectItem,
            Skills,
        },
        data: function () {
            return {
                projects: projectList,
                urls: [],
            }
        },
        created() {
            unsplashApi.fetchRandomImage().then((urls) => {
                this.urls = urls;
            })

            contentAPi.fetch().then(response => {
                this.content = response.data['hydra:member'][0].content
            })
        }
    }
</script>
