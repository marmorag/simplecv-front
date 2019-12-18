<script>
    import api from '../api/skills.js';
    import { Radar } from 'vue-chartjs'


    export default {
        extends: Radar,
        data() {
            return {
                skills: [],
                options: {
                    scale: {
                        angleLines: {
                            display: false
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    },
                }
            };
        },
        mounted() {
            this.fetchSkills();
        },
        methods: {
            async fetchSkills() {
                let response = await api.fetchSkills();
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

                return finalData;
            }
        },
    };
</script>
