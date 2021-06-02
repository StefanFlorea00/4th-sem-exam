import React, { useEffect, useState } from 'react';
import StockArrow from '../Assets/StockArrow';
import ExtraInfo from '../Investment/Company/ExtraInfo';
import './StockGraph.scss';
import StockInfo from '../Investment/Company/StockInfo';
import ReactECharts from 'echarts-for-react';

function StockGraph(props: any) {
  type Interval = '1day' | '1week' | '1month';

  const [dataInterval, setDataInterval] = useState<Interval>('1day');
  const [chartData, setChartData] = useState([[]]);

  useEffect(() => {
    fetchStock();
  }, []);

  function fetchStock() {
    setDataInterval('1month');
    const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
    let API_Call = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=${dataInterval}&apikey=${API_KEY}`;

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        translateChartData(data);
      });
  }

  function translateChartData(data: any) {
    console.log(data);
    if (data) {
      let translatedData = [[]];
      data.values.forEach((dataLine: any) => {
        translatedData.push([
          //@ts-ignore
          [
            dataLine.datetime.split('-')[0],
            dataLine.datetime.split('-')[1],
            dataLine.datetime.split('-')[2],
          ].join('/'),
          //@ts-ignore
          dataLine.close,
        ]);
      });
      setChartData(translatedData);
      console.log(translatedData);
    }
  }

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%'];
      },
    },
    title: {
      left: 'center',
      text: props.companyInfo.name,
      show: false,
    },
    toolbox: {
      show: false,
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 20,
      },
    ],
    series: [
      {
        name: props.companyInfo.name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        data: chartData,
        color: '#F4D4D9',
      },
    ],
  };

  return (
    <div className='stock-graph'>
      <h1>Stock prices</h1>
      <ReactECharts option={chartOptions} />
      <div className='info-div'>
        <StockInfo info={props.companyInfo} />
        <ExtraInfo info={props.companyInfo} />
      </div>
    </div>
  );
}

export default StockGraph;
