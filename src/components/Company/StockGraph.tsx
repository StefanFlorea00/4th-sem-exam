import React, { useEffect, useState } from 'react';
import StockArrow from '../Assets/StockArrow';
import ExtraInfo from './ExtraInfo';
import './StockGraph.scss';
import StockInfo from './StockInfo';

function StockGraph(props: any) {

    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

    useEffect(() => {
        setStockChartXValues([]);
        setStockChartYValues([]);
        fetchStock();
    }, [])

    function fetchStock(){
        const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
        let API_Call = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=${API_KEY}`;

        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            })
        .then(
            function(data) {
                console.log(data);
            }
        )
    }

  return (
      <div className='stock-graph'>
          <h1>Stock prices</h1>
          {/* graph here */}
          <div className='info-div'>
          <StockInfo info={props.companyInfo}/>
          <ExtraInfo info={props.companyInfo}/>
          </div>
      </div>
  );
}

export default StockGraph;
