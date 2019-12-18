<script>
    import api from '../api/skills.js';
    import { Radar } from 'vue-chartjs'


    export default {
        extends: Radar,
        data() {
            return {
                skills: [],
                loading: false,
                options: {

                }
            };
        },
        mounted() {
            this.fetchSkills();
        },
        methods: {
            async fetchSkills() {
                let response = await api.fetchSkills();
                // eslint-disable-next-line no-console
                console.log(response.data['hydra:member']);
                this.skills = this.format(response.data['hydra:member']);

                this.renderChart(this.skills, this.options);
            },
            format(apiData) {
                let finalData = {
                    labels: [],
                    datasets: [{
                        data: []
                    }]
                };

                apiData.forEach(elm => {
                    finalData.labels.push(elm.name);
                    finalData.datasets[0].data.push(elm.level);
                });

                // eslint-disable-next-line no-console
                console.log(finalData);

                return finalData;
            }
        },
    };
</script>
