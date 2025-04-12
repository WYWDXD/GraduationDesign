<template>
  <div class="Line" ref="Line"></div>
</template>
<script>
import { userListService } from '../api/user';
export default {
  name: 'NewVLine',

  data() {
    return {

    };
  },

  mounted() {
    this.userList()
    this.myChart = this.$echarts.init(this.$refs.Line);
  },

  methods: {
    async userList() {
      let result = await userListService();
      let originalData = result.data
      console.log(originalData)
      const countByType = originalData.reduce((acc, item) => {
        acc[item.createTime.substring(0, 7)] = (acc[item.createTime.substring(0, 7)] || 0) + 1;
        return acc;
      }, {});
      console.log(countByType)
      var xArr=[]
     var  yArr=[]
      for (let key in countByType) {
        if (countByType.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
          // console.log(key + ": " + countByType[key]);
          xArr.push(key)
          yArr.push(countByType[key])

        }
      }
      var option = {
          title: {
            left: "center",
            text: "人员流动",
            textStyle: {
              color: "#4c9bfd",
            },
          },
          color: ["#2f89cf"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: xArr,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: "12",
                },
              },
              axisLine: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: "12",
                },
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                  // width: 1,
                  // type: "solid"
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.1)",
                },
              },
            },
          ],
          series: [
            {
              name: "人员流动",
              type: "line",
              smooth: true,
              barWidth: "35%",
              data: yArr,
              itemStyle: {
                barBorderRadius: 5,
              },
            },
          ],
        };
        this.myChart.setOption(option);

    }
  },
};
</script>
<style>
.Line {

  background: linear-gradient(#02a6b5, #02a6b5) left top,
    linear-gradient(#02a6b5, #02a6b5) left top,
    linear-gradient(#33cdfa, #33cdfa) right top,
    linear-gradient(#33cdfa, #33cdfa) right top,
    linear-gradient(#02a6b5, #02a6b5) left bottom,
    linear-gradient(#02a6b5, #02a6b5) left bottom,
    linear-gradient(#02a6b5, #02a6b5) right bottom,
    linear-gradient(#02a6b5, #02a6b5) right bottom;
  background-repeat: no-repeat;
  background-size: 0.1vw 1.5vw, 1.5vw 0.1vw;
  width: 100%;
  height: 100%;
}
</style>