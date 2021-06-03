import React, { useEffect, useState } from 'react';
import StockArrow from '../../Assets/StockArrow';

function StockInfo(props: any) {
  const [companyInfoTD, setCompanyInfoTD] = useState<CompanyInfoTD>({
    values: [
      { close: 1, high: 1, low: 1 },
      { close: 1, high: 1, low: 1 },
    ],
    meta: { currency: 0 },
  });
  const [companyInfoAV, setCompanyInfoAV] = useState<CompanyInfoAV>();
  const [recentPercentage, setRecentPercentage] = useState<number>(0);

  type CompanyInfoAV = {
    '52WeekHigh': string;
    '52WeekLow': string;
  };

  type CompanyInfoTD = {
    values: [
      {
        close: number;
        high: number;
        low: number;
      },
      {
        close: number;
        high: number;
        low: number;
      }
    ];
    meta: {
      currency: number;
    };
  };

  useEffect(() => {
    setCompanyInfoTD(props.companyInfoTD);
    setCompanyInfoAV(props.companyInfoAV);
    companyInfoTD &&
      calculatePercentage(
        companyInfoTD.values[0].close,
        companyInfoTD.values[1].close
      );
  }, []);

  function calculatePercentage(value1: number, value2: number) {
    let percentage = ((value1 - value2) / value2) * 100;
    setRecentPercentage(parseFloat(percentage.toFixed(4)));
  }

  return (
    //to be done
    <div className='stock-info'>
      <div className='current-stock'>
        <StockArrow
          className={
            recentPercentage >= 0
              ? 'stock-arrow positive'
              : 'stock-arrow negative'
          }
        />
        <p className='current-stock-text'>
          {companyInfoTD.values
            ? Number(companyInfoTD.values[0].close).toFixed(2)
            : 'No Data'}{' '}
          {companyInfoTD.meta && companyInfoTD.meta.currency}
        </p>
        <p
          className={
            recentPercentage >= 0
              ? 'percentage positive'
              : 'percentage negative'
          }
        >
          {recentPercentage}%
        </p>
      </div>
      <div className='info-line'>
        <p>Today's high: </p>{' '}
        <p>
          {companyInfoTD.values
            ? Number(companyInfoTD.values[0].high).toFixed(2)
            : 'No Data'}{' '}
          {companyInfoTD.meta && companyInfoTD.meta.currency}
        </p>
      </div>
      <div className='info-line'>
        <p>Today's low:</p>{' '}
        <p>
          {companyInfoTD.values
            ? Number(companyInfoTD.values[0].low).toFixed(2)
            : 'No Data'}{' '}
          {companyInfoTD.meta && companyInfoTD.meta.currency}
        </p>
      </div>
      <div className='info-line'>
        <p>52wk high: </p>{' '}
        <p>
          {companyInfoAV
            ? Number(companyInfoAV['52WeekHigh']).toFixed(2)
            : 'No Data'}{' '}
          {companyInfoTD.meta && companyInfoTD.meta.currency}
        </p>
      </div>
      <div className='info-line'>
        <p>52wk low: </p>{' '}
        <p>
          {companyInfoAV
            ? Number(companyInfoAV['52WeekLow']).toFixed(2)
            : 'No Data'}{' '}
          {companyInfoTD.meta && companyInfoTD.meta.currency}
        </p>
      </div>
    </div>
  );
}

export default StockInfo;
