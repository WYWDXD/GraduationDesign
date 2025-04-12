<template>
  <div class="box" >
    <div class="item1" ref="left"></div>
    <div class="item2" ref="right"></div>
  </div>
</template>
<script>
import { ar } from 'element-plus/es/locales.mjs';
import { allCategoryListService, signAllListService } from '../api/article';
export default {
  name: 'NewVCrossBar',

  data() {
    return {

    };
  },

  mounted() {
    this.categoriesList()
    this.signList()
    this.LeftChart = this.$echarts.init(this.$refs.left);
    this.RightChart = this.$echarts.init(this.$refs.right);
    // this.init();

  },

  methods: {
    async signList() {
      //获取当前时间
      const currentTime = new Date();
      let nowDate = String(currentTime.getMonth() + 1) + '-' + String(currentTime.getDate())
      console.log(nowDate)
      let result = await signAllListService();
      let originalData = result.data
      let filterData = originalData.filter(item => item.createTime.substring(5, 10) == nowDate)
      // console.log(filterData)
      var later_time = {
        name:
          "上班迟到",
        value
          :
          0
      }
      var on_time = {
        name:
          "按时上班",
        value
          :
          0
      }
      for (var i = 0; i < filterData.length; i++) {
        if (parseInt(filterData[i].createTime.substring(11, 13)) <= 9 && parseInt(filterData[i].createTime.substring(14, 16)) <= 0 && parseInt(filterData[i].createTime.substring(17, 19)) <= 0) {
          on_time.value += 1
        } else {
          later_time.value += 1
        }
      }
      var workArr = [on_time, later_time]
      // console.log(workArr)
      var option = {
        legend: {
          top: "90%",
          itemWidth: 10,
          itemHeight: 10,

          textStyle: {
            color: "#4c9bfd",
            fontSize: "12",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        title: {
          left: "center",
          text: "考勤占比",
          textStyle: {
            color: "#4c9bfd",
          },
        },
        // 注意颜色写的位置
        color: [
          "#006cff",
          "#60cda0",
          "#ed8884",
          "#ff9f7f",
          "#0096ff",
          "#9fe6b8",
          "#32c5e9",
          "#1d9dff",
        ],
        series: [
          {
            name: "",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["30%", "60%"],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 8,
            },
            //  roseType: "area",
            data:[{name: '按时上班', value: 1},

{name: '上班迟到', value: 2}] ,
            // 修饰饼形图文字相关的样式 label对象
            label: {
              textStyle: {
                color: "#4c9bfd",
              },
              fontSize: 10,
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 10,
            },
          },
        ],

      }
      this.RightChart.setOption(option);
    },

    async categoriesList() {
      let result = await allCategoryListService();
      let originalData = result.data
      // console.log(originalData)
      const countByType = originalData.reduce((acc, item) => {
        acc[item.categoryName] = (acc[item.categoryName] || 0) + 1;
        return acc;
      }, {});

      // console.log(countByType);
      let arr = []
      for (let key in countByType) {
        if (countByType.hasOwnProperty(key)) { // 确保属性是对象自身的而不是从原型链继承的
          // console.log(key + ": " + countByType[key]);
          var obj = {
            value: countByType[key],
            name: key
          }
          arr.push(obj)

        }
      }
      console.log(arr)
      var option = {
        legend: {
          top: "90%",
          itemWidth: 10,
          itemHeight: 10,

          textStyle: {
            color: "#4c9bfd",
            fontSize: "12",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        title: {
          left: "center",
          text: "文章分类",
          textStyle: {
            color: "#4c9bfd",
          },
        },
        // 注意颜色写的位置
        color: [
          "#006cff",
          "#60cda0",
          "#ed8884",
          "#ff9f7f",
          "#0096ff",
          "#9fe6b8",
          "#32c5e9",
          "#1d9dff",
        ],
        series: [
          {
            name: "",
            type: "pie",
            // 如果radius是百分比则必须加引号
            radius: ["30%", "60%"],
            center: ["50%", "50%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 8,
            },
            //  roseType: "area",
            data: arr,
            // 修饰饼形图文字相关的样式 label对象
            label: {
              textStyle: {
                color: "#4c9bfd",
              },
              fontSize: 10,
            },
            // 修饰引导线样式
            labelLine: {
              // 连接到图形的线长度
              length: 10,
              // 连接到文字的线长度
              length2: 10,
            },
          },
        ],

      }
      this.LeftChart.setOption(option);
    }
  }
};
</script>

<style>
.box {

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
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr; */
}


</style>