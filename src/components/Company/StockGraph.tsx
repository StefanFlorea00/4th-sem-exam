import React from 'react';
import StockArrow from '../Assets/StockArrow';
import ExtraInfo from './ExtraInfo';
import './StockGraph.scss';
import StockInfo from './StockInfo';

function StockGraph(props: any) {

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
