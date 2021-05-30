import React, { useEffect, useState } from 'react';
import StockArrow from '../../Assets/StockArrow';
import ExtraInfo from './ExtraInfo';
import './StockGraph.scss';
import StockInfo from './StockInfo';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

function StockGraph(props: any) {

    type Interval  = "1day" | "1week" | "1month" ;

    const [dataInterval, setDataInterval] = useState<Interval>("1day");
    const [chartData,setChartData] = useState([[]]);
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        translateChartData(props.companyInfoTD);
    }, [])

    function translateChartData(data: any){
        console.log(data);
        if(data && data.values){
            let translatedData = [[]];
            data.values.forEach(dataLine => {
                    //change date from dd-mm-yyyy to dd/mm/yyyy
                    translatedData.push([
                    [dataLine.datetime.split("-")[0], dataLine.datetime.split("-")[1], dataLine.datetime.split("-")[2] ].join('/'),
                    dataLine.close
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
            position: function (pt) {
                return [pt[0], '10%'];
            }
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
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            scale: 1
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
        }, {
            start: 0,
            end: 500
        }],
        series: [
            {
                name: props.companyInfoTD,
                type: 'line',
                smooth: false,
                symbol: 'none',
                areaStyle: {},
                data: chartData,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: chartData[chartData.length -1][1] && chartData[chartData.length -1][1] > chartData[chartData.length - 2][1] ? "#0cad00" : "#ad0000"
                }, {
                    offset: 1,
                    color: chartData[chartData.length -1][1] && chartData[chartData.length -1][1] > chartData[chartData.length - 2][1] ? "#0cadAA" : "#cf2222"
                }]) 
            }
        ]
    }

    function createChartOptions(){
        !loading && setChartOptions({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
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
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                scale: 1
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 500
            }],
            series: [
                {
                    name: props.companyInfoTD,
                    type: 'line',
                    smooth: false,
                    symbol: 'none',
                    areaStyle: {},
                    data: chartData,
                    color: chartData[chartData.length -1] > chartData[chartData.length - 2] ? "#0cad00" : "#ad0000"
                    // color:
                    // new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //     offset: 0,
                    //     color: chartData[chartData.length -1][1] && chartData[chartData.length -1][1] > chartData[chartData.length - 2][1] ? "#0cad00" : "#ad0000"
                    // }, {
                    //     offset: 1,
                    //     color: chartData[chartData.length -1][1] && chartData[chartData.length -1][1] > chartData[chartData.length - 2][1] ? "#0cadAA" : "#cf2222"
                    // }]) 
                }
            ]
        });
    }

  return (
      <div className='stock-graph'>
          <h1>Stock prices</h1>
          {chartData && chartOptions && !loading && 
            <ReactECharts option={chartOptionsTest}/>
          }
          <div className='info-div'>
          <StockInfo companyInfoAV={props.companyInfoAV} companyInfoTD={props.companyInfoTD}/>
          <ExtraInfo companyInfoAV={props.companyInfoAV}/>
          </div>
      </div>
  );
}

export default StockGraph;
