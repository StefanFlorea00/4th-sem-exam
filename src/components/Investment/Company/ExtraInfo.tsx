import React, { useState, useEffect } from 'react';

function ExtraInfo(props: any) {
  const [companyInfoAV, setCompanyInfoAV] = useState<CompanyInfoAV>();

  useEffect(() => {
    setCompanyInfoAV(props.companyInfoAV);
  }, []);

  type CompanyInfoAV = {
    FullTimeEmployees: string,
    FiscalYearEnd: string,
    ProfitMargin: string,
    Symbol: string,
    AssetType: string
  }

  return (
    <div className='extra-info'>
        <div className='info-line'>
          <p>Employees: {companyInfoAV ? companyInfoAV.FullTimeEmployees : ""} </p>
        </div>
        <div className='info-line'>
          <p>Fiscal year end: {companyInfoAV ? companyInfoAV.FiscalYearEnd : ""}</p>
        </div>
        <div className='info-line'>
          <p>Profit margin: {companyInfoAV ? companyInfoAV.ProfitMargin : ""}</p>
        </div>
        <div className='info-line'>
          <p>Symbol: {companyInfoAV ? companyInfoAV.Symbol : ""}</p>
        </div>
        <div className='info-line'>
          <p>Asset type: {companyInfoAV ? companyInfoAV.AssetType : ""}</p>
        </div>
    </div>
  );
}

export default ExtraInfo;
