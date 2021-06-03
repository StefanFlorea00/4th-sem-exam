import React, { useEffect, useState } from 'react';
import StockArrow from '../../Assets/StockArrow';
import ExtraInfo from './ExtraInfo';
import StockInfo from './StockInfo';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import Button from '../../Buttons/Button';

function StockGraph(props: any) {
  type Interval = '1h' | '1day' | '1week' | '1month';

  const [dataInterval, setDataInterval] = useState<Interval>('1day');
  const [chartData, setChartData] = useState<ChartData>();
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(false);

  type ChartData = {
    meta: {};
    values: [{}];
    status: {};
  };

  useEffect(() => {
    setLoading(true);
    translateChartData(props.companyInfoTD);
  }, [dataInterval]);

  useEffect(() => {
    setDataInterval(props.dataInterval);
  });

  function translateChartData(data: ChartData) {
    if (data && data.values) {
      let translatedData: any = [[]];
      data.values.forEach((dataLine: any) => {
        //change date from dd-mm-yyyy to dd/mm/yyyy
        translatedData.push([
          [
            dataLine.datetime.split('-')[0],
            dataLine.datetime.split('-')[1],
            dataLine.datetime.split('-')[2],
          ].join('/'),
          dataLine.close,
        ]);
      });
      setChartData(translatedData);
      setLoading(false);
      createChartOptions();
    }
  }

  //don't know why it doesn't work with setChartOptions, maybe tries to add component before it gets set
  const chartOptionsTest = {
    tooltip: {
      trigger: 'axis',
      position: function (pt: any) {
        return [pt[0], '10%'];
      },
    },
    title: {
      left: 'center',
      text: '',
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
      scale: 1,
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 500,
      },
    ],
    series: [
      {
        name: props.companyInfoTD,
        type: 'line',
        smooth: false,
        symbol: 'none',
        areaStyle: {},
        data: chartData,
        color: '#F4D4D9',
      },
    ],
  };

  function createChartOptions() {
    !loading &&
      setChartOptions({
        tooltip: {
          trigger: 'axis',
          position: function (pt: any) {
            return [pt[0], '10%'];
          },
        },
        title: {
          left: 'center',
          text: '',
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
          scale: 1,
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
            handleStyle: {
              borderColor: '#F4D4D9',
            },
          },
        ],
        series: [
          {
            name: props.companyInfoTD,
            type: 'line',
            smooth: false,
            symbol: 'none',
            areaStyle: {},
            data: chartData,
            color: '#F4D4D9',
          },
        ],
      });
  }

  return (
    <div className='stock-graph'>
      <h1>Stock prices</h1>
      {chartData && chartOptions && !loading ? (
        <ReactECharts option={chartOptionsTest} />
      ) : (
        <h1 className='stock-error'>
          Sorry, could not load company stock prices
        </h1>
      )}
      <div className='info-div'>
        <StockInfo
          companyInfoAV={props.companyInfoAV}
          companyInfoTD={props.companyInfoTD}
        />
        <ExtraInfo companyInfoAV={props.companyInfoAV} />
      </div>
    </div>
  );
}

export default StockGraph;
