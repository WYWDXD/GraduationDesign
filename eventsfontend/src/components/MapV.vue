<template>
  <div class="main_middle_bottom">
    <div class="chart"  ref="echart_china"></div>
    <div class="map1"></div>
    <div class="map2"></div>
    <div class="map3"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { signAllListService } from '../api/article';
import chinamap  from '../../public/static/map/china.json'
export default {
  name: 'EventsfontendMapV',
  props: ["userJson"],
  data() {
    return {
      allList: [],
      duplicateList: [],
      areaList: []
    };
  },

  mounted() {
    this.signAllList()
    this.myChart = this.$echarts.init(this.$refs.echart_china);
    // this.init();
  },

  methods: {
    async signAllList() {
      let result = await signAllListService();
      let originalData = result.data
      let uniqueArray = originalData.filter((obj, index, self) =>
        index === self.findIndex((t) => (
          t.id === obj.id
        ))
      );
      const countObj = {};
      uniqueArray.forEach((item1) => {
        const key = item1.location;
        if (countObj[key]) {
          countObj[key]++;
        } else {
          countObj[key] = 1;
        }
      });
    
      const countArr = Object.entries(countObj).sort((a, b) => b[1] - a[1]);
      // console.log(countArr)
      let arr = []
      countArr.forEach(([key, value]) => {
        arr.push({
          name: key,
          value: value
        });

      });
      
      document.addEventListener('touchstart', function(e) {
  // 你的事件处理代码
}, { passive: false });
      this.$echarts.registerMap("china", chinamap); //用导入的json文件注册一个name:china的地图组件
      // 3. 设置图表 option
      // console.log(chinamap)
      var option = {
        title: {
          text: "人员分布",
          top:'10%',
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "normal",
            fontFamily: "Microsoft YaHei",
          },
        },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        min: 0,
        max: 2,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
        series : [
            {
         
              type: "map",
              map: 'china',
              roam: true,
              //   放大地图
              zoom: 1,
              nameMap: {
                china: "中国",
              },
              emphasis: {

                show: true,

                color: "#999",
                fontSize: 12,


                label: {
                  show: true,

                  color: "#fff",
                  fontSize: 16,

                },
              },



              areaColor: "rgba(43, 196, 243, 0.42)",
              borderColor: "rgba(43, 196, 243, 1)",
              borderWidth: 1,

              emphasis: {
                areaColor: "#2B91B7",
              },

              data: arr,
            },
          ]
      };
      this.myChart.setOption(option); 
      },
  },

};
</script>
<style>
.main_middle_bottom {
  position: relative;
  height: 100%;
  width: 100%;
}

.main_middle_bottom .chart {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  width: 100%;
}

.main_middle_bottom .map1,
.main_middle_bottom .map2,
.main_middle_bottom .map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30.475rem;
  height: 30.475rem;
  background: url("@/assets/map.png") no-repeat;
  background-size: 100% 100%;
  opacity: 0.3;
}

.main_middle_bottom .map2 {
  width: 35.0375rem;
  height: 35.0375rem;
  background-image: url("@/assets/lbx.png");
  opacity: 0.6;
  animation: rotate 15s linear infinite;
  z-index: 2;
}

.main_middle_bottom .map3 {
  width: 33.475rem;
  height: 33.475rem;
  background-image: url("@/assets/jt.png");
  animation: rotate1 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>