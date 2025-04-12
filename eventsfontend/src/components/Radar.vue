<script setup>

</script>
<template>

  <div class="main_left_top" ref="main_left_top">


  </div>


</template>
<script>
// import Jieba from 'jieba-js';
import { articleAllListService } from '../api/article';
export default {
  name: 'NewVRadar',

  data() {
    return {
      cutResult: '',
      text: '',
      segmentedWords: []
    };
  },

  mounted() {
    this.articleAllList()
    this.myChart = this.$echarts.init(this.$refs.main_left_top);

  },

  methods: {
    async articleAllList() {
      let result = await articleAllListService();
      let originalData = result.data

      const countByType = originalData.reduce((acc, item) => {
        acc[item.createTime.substring(0, 7)] = (acc[item.createTime.substring(0, 7)] || 0) + 1;
        return acc;
      }, {});
      // console.log(countByType)
     var xArr=[]
     var  yArr=[]
      for (let key in countByType) {
        if (countByType.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
          // console.log(key + ": " + countByType[key]);
          xArr.push(key)
          yArr.push(countByType[key])

        }
      }
      var option={
        title: {
            left: "center",
            text: "发表人数",
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
              name: "人数",
              type: "bar",
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
.main_left_top {
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
  display: flex;
  flex-direction: row;
  grid-template-columns: 60% 40%;
}

.main_left_top_left {
  display: inline-block;
  flex: 3;

  /* border: 2px solid red; */
}

.main_left_top_right {
  display: inline-block;
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1.5;
  /* border: 2px solid red; */
}

.main_left_top_right_top {
  border-bottom: 1px solid #02a6b5;
  /* text-align: left; */
  /* border: 2px solid red; */
  flex: 0.6;
  /* display: flex; */
  position: relative;
}

.n {
  top: 15%;
  text-align: left;
  vertical-align: bottom;
  position: absolute;
  /* flex: 1; */
  font-size: 50px;
  font-weight: 700;
  width: 40%;
  font-family: "Montserrat";

  /* border: 2px solid red; */
  color: #00ffff;
}

.e {
  width: 50%;
  position: absolute;
  left: 40%;
  text-align: left;
  top: 55%;
  vertical-align: bottom;
  /* flex: 1; */
  font-size: 25px;
  font-weight: 700;
  /* flex: 1; */
  color: #00ffff;
  /* border: 2px solid red; */
}

.main_left_top_right_middle {
  /* border: 2px solid red; */
  flex: 0.3;
  text-align: left;
  position: relative;
  border-bottom: 2px solid #02a6b5;
}

.xm {
  color: #00ffff;
  position: absolute;
  /* border: 2px solid red; */
  width: 35%;
  height: 60%;
  top: 20%;
}

.xmx {
  color: #00ffff;
  text-align: left;
  position: absolute;
  /* border: 2px solid red; */
  width: 65%;
  height: 60%;
  left: 35%;
  top: 20%;
}

.main_left_top_right_bottom {
  text-align: left;
  /* border: 2px solid red; */
  flex: 1;
  display: flex;
  flex-direction: column;
}

.g_a {
  flex: 1.5;
  /* border: 2px solid red; */
  position: relative;
}

.g_a_k {
  /* vertical-align: bottom; */
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 50%;
  top: 30%;
  color: #00ffff;
}

.g_a_v {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 20%;

  top: 30%;
  color: #00ffff;
  left: 45%;
}

.g_a_n {
  top: 30%;
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 20%;
  color: #00ffff;
  left: 60%;
}

.g_s {
  flex: 1;
  /* border: 2px solid red; */
  position: relative;
}

.g_s_k {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 50%;
  color: #00ffff;
}

.g_s_v {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 20%;
  color: #00ffff;
  left: 45%;
}

.g_s_n {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 20%;
  color: #00ffff;
  left: 60%;
}

.e_s {
  flex: 1;
  position: relative;
  /* border: 2px solid red; */
}

.e_s_k {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 50%;
  color: #00ffff;
}

.e_s_v {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 20%;
  color: #00ffff;
  left: 45%;
}

.e_s_n {
  font-size: 10px;
  position: absolute;
  /* border: 2px solid red; */
  height: 100%;
  width: 20%;
  color: #00ffff;
  left: 60%;
}
</style>
