import React from 'react';
import StockArrow from '../Assets/StockArrow';
import './StockInfo.scss';

function StockInfo(props: any) {

  return (
        <div className='stock-info'>
              <div className="current-stock">
              <StockArrow className="stock-arrow"/>
              <p className="current-stock-text">{props.info.currentStock} {props.info.currency}</p>
              <p className="percentage">-5%</p>
              </div>
              <div className='info-line'>
                  <p>Today's high: </p> <p>{props.info.todayHigh} {props.info.currency}</p>
              </div>
              <div className='info-line'>
                  <p>Today's low:</p> <p>{props.info.todayLow} {props.info.currency}</p>
              </div>
              <div className='info-line'>
                  <p>52wk high: </p><p>{props.info.wkHigh} {props.info.currency}</p>
              </div>
              <div className='info-line'>
                  <p>52wk low: </p><p>{props.info.wkLow} {props.info.currency}</p>
              </div>
        </div>
  );
}

export default StockInfo;

