<template>
    <div>
        <breadcaps :list="['数据统计','数据报表']"></breadcaps>
        <el-card>
            <div ref="reportRef" style="width: 600px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
    import {getReports} from 'network/report.js';
    import breadcaps from "common/breadcaps";
    import echarts from 'echarts';
    export default {
        name: "reports",
        components:{
            breadcaps
        },
        data(){
            return {
                reportEcharInfo:{},
                options: {
                    title: {
                        text: '用户来源'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#E9EEF3'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            boundaryGap: false
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ]
                }
            }
        },
        mounted(){
            this.getReportsInfo();
        },
        methods:{
            getReportsInfo(){
                getReports().then(res=>{
                    this.reportEcharInfo=res.data.data;
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(this.$refs.reportRef);
                    // 使用刚指定的配置项和数据显示图表
                    //合并多个对象可使用Object.assign
                    const result=Object.assign({},this.options,this.reportEcharInfo);

                    //console.log('合并对象',result)
                    myChart.setOption(result);


                })
            }

        },
    }
</script>

<style scoped>

</style>