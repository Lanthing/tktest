import * as echarts from "./echarts.esm.js";

let request = (() => {
  let fun = async function (url) {
    return (await fetch(url).then((response) => response.json())).data;
  };
  fun["create"] = (baseUrl) => (pars) => fun(baseUrl + pars);
  return fun;
})();
let baseUrl = "https://edu.telking.com/api/?type=";
let getData = request.create(baseUrl);
let curve = echarts.init(document.getElementById("curve"));
let pie = echarts.init(document.getElementById("pie"));
let histogram = echarts.init(document.getElementById("histogram"));
let color = [
  "#c03736",
  "#2f4653",
  "#64a1a8",
  "#d28168",
  "#92c6af",
  "#759e84",
  "#c8842e",
];
let curveOption = {
  title: {
    text: "曲线图数据展示",
    left: "center",
    top: 32,
  },
  grid: {
    x: 110,
    y: 100,
    x2: 50,
    y2: 50,
  },
  xAxis: {
    data: [],
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: "#cccccc",
        type: "dashed",
      },
    },
    axisLabel: {
      color: "#000000",
    },
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
    axisLabel: {
      formatter: "{value}人",
      color: "#000000",
    },
  },
  series: [
    {
      data: [],
      type: "line",
      smooth: true,
      areaStyle: {
        color: "#4889f0",
        opacity: 0.1,
      },
      lineStyle: {
        color: "#4889f0",
      },
      label: {
        show: true,
        position: "top",
        color: "#4587f0",
      },
    },
  ],
};
let pieOption = {
  title: {
    text: "饼状图数据展示",
    left: "center",
    top: 50,
  },
  color: color,
  series: [
    {
      type: "pie",
      data: [],
      radius: 115,
      center: [280, 230],
      label: {
        // color:(params)=>params.color
        rich: {},
      },
    },
  ],
};
let histogramOption = {
  title: {
    text: "柱状图数据展示",
    left: "center",
    top: 35,
  },
  color: ["#4486ef"],
  grid: {
    x: 70,
    y: 135,
    x2: 40,
    y2: 50,
  },
  xAxis: {
    data: [],
    axisLine: {
      lineStyle: {
        color: "#cccccc",
        type: "dotted",
      },
    },
    axisLabel: {
      color: "#000000",
    },
  },
  yAxis: {
    name: "商品数",
    nameTextStyle: {
      color: "#000000",
      // align:"right"
    },
    axisLabel: {
      color: "#000000",
    },
    splitLine: {
      lineStyle: {
        type: "dotted",
      },
    },
  },
  series: [
    {
      type: "bar",
      data: [],
      barWidth: 17,
    },
  ],
};
curve.setOption(curveOption);
pie.setOption(pieOption);
histogram.setOption(histogramOption);
getData("month").then((data) => {
  curveOption.xAxis.data = data.xAxis;
  curveOption.series[0].data = data.series;
  curve.setOption(curveOption);
});
getData("week").then((data) => {
  let pieData = ((data) => {
    let len = data.xAxis.length;
    let res = [];
    for (let i = 0; i < len; i++) {
      res.push({
        value: data.series[i],
        name: data.xAxis[i],
        label: { color: color[i] },
      });
    }
    return res;
  })(data);
  pieOption.series[0].data = pieData;
  histogramOption.xAxis.data = data.xAxis;
  histogramOption.series[0].data = data.series;
  pie.setOption(pieOption);
  histogram.setOption(histogramOption);
});
