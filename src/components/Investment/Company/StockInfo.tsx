import React, { useEffect, useState } from 'react';
import StockArrow from '../../Assets/StockArrow';
import './StockInfo.scss';

function StockInfo(props: any) {
  return (
      //to be done
        <div className='stock-info'>
              <div className="current-stock">
              <StockArrow className="stock-arrow"/>
              <p className="current-stock-text"></p>
              <p className="percentage">-5%</p>
              </div>
              <div className='info-line'>
                  <p>Today's high: </p> <p></p>
              </div>
              <div className='info-line'>
                  <p>Today's low:</p> <p></p>
              </div>
              <div className='info-line'>
                  <p>52wk high: </p><p></p>
              </div>
              <div className='info-line'>
                  <p>52wk low: </p><p></p>
              </div>
        </div>
  );
}

export default StockInfo;

