import React, { useEffect, useState } from 'react';
import StockArrow from '../../Assets/StockArrow';
import './StockInfo.scss';

function StockInfo(props: any) {

    console.log("CCCCCCCC", props.companyInfo);
    const [companyInfo, setCompanyInfo] = useState({values: [{close: 1, high: 1, low: 1},{close: 1, high: 1, low: 1}], meta: {currency: 0}});
    const [recentPercentage, setRecentPercentage] = useState<number>(0);

    useEffect(() => {
        setCompanyInfo(props.companyInfo);
        if(companyInfo.values[0]){
        calculatePercentage(companyInfo.values[0].close, companyInfo.values[1].close);
        }
    }, [])

    function calculatePercentage(value1: number, value2: number){
        let percentage = (value1 - value2) / value2 * 100;
        setRecentPercentage(parseInt(percentage.toFixed(2)));
    }

  return (
      //to be done
        <div className='stock-info'>
              <div className="current-stock">
              <StockArrow className={ recentPercentage >= 0 ? "stock-arrow positive" : "stock-arrow negative" }/>
              <p className="current-stock-text">{companyInfo.values[0].close} {companyInfo.meta.currency}</p>
              <p className={ recentPercentage >= 0 ? "percentage positive" : "percentage negative" } >{recentPercentage}%</p>
              </div>
              <div className='info-line'>
                  <p>Today's high: </p> <p>{companyInfo.values[0].high} {companyInfo.meta.currency}</p>
              </div>
              <div className='info-line'>
                  <p>Today's low:</p> <p>{companyInfo.values[0].low} {companyInfo.meta.currency}</p>
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

