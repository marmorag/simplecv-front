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
                            <v-layout row wrap class="blockquote">
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad adipisci
                                    aspernatur, assumenda consequuntur cupiditate delectus dolorem eaque, eum explicabo
                                    inventore ipsum neque obcaecati officia perferendis ratione tempore veritatis
                                    voluptate.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad adipisci
                                    aspernatur, assumenda consequuntur cupiditate delectus dolorem eaque, eum explicabo
                                    inventore ipsum neque obcaecati officia perferendis ratione tempore veritatis
                                    voluptate.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad adipisci
                                    aspernatur, assumenda consequuntur cupiditate delectus dolorem eaque, eum explicabo
                                    inventore ipsum neque obcaecati officia perferendis ratione tempore veritatis
                                    voluptate.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad adipisci
                                    aspernatur, assumenda consequuntur cupiditate delectus dolorem eaque, eum explicabo
                                    inventore ipsum neque obcaecati officia perferendis ratione tempore veritatis
                                    voluptate.
                                </div>
                                <div>Adipisci aliquam delectus fugit, ipsum maiores molestias necessitatibus nisi nobis,
                                    reiciendis ut vel, veniam. Adipisci delectus deleniti dolorem eos harum labore neque
                                    quae quaerat, qui rerum, soluta vitae! Illum, laborum.
                                </div>
                                <div>A architecto, aut dolorem, dolores ex expedita facilis fugit hic id iure magnam
                                    neque nobis numquam pariatur porro possimus qui quos ratione recusandae repellendus
                                    suscipit temporibus ut veritatis voluptate voluptates.
                                </div>
                                <div>A aliquam aspernatur at atque blanditiis dicta error est ex excepturi hic neque
                                    nihil nobis omnis praesentium quo recusandae rem repudiandae sint soluta suscipit,
                                    ullam vel vitae voluptate voluptates voluptatibus.
                                </div>
                                <div>Architecto cum doloremque et nihil quam vel vero. Aliquid aspernatur culpa facere
                                    impedit maxime nihil, non odit, provident quasi velit, veritatis vitae. Accusamus
                                    dolore eius iusto necessitatibus perspiciatis praesentium tenetur.
                                </div>
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

    export default {
        name: 'Home',
        components: {
            ProjectItem,
            Skills,
        },
        data: function () {
            return {
                projects: projectList
            }
        }
    }
</script>
