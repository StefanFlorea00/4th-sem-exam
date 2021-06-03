import React, { useState, useEffect } from 'react';

function ExtraInfo(props: any) {
  const [companyInfoAV, setCompanyInfoAV] = useState<CompanyInfoAV>();

  useEffect(() => {
    setCompanyInfoAV(props.companyInfoAV);
  }, []);

  type CompanyInfoAV = {
    FullTimeEmployees: '';
  };

  return (
    <div className='extra-info'>
      <div className='info-line'>
        <p>
          {companyInfoAV ? companyInfoAV.FullTimeEmployees : '...'} Employees
        </p>
      </div>
      {/* <div className='info-line'>
          <p>{companyInfoAV ? companyInfoAV.FullTimeEmployees : "..."} Employees</p>
        </div>
        <div className='info-line'>
          <p>{companyInfoAV ? companyInfoAV.FullTimeEmployees : "..."} Employees</p>
        </div>
        <div className='info-line'>
          <p>{companyInfoAV ? companyInfoAV.FullTimeEmployees : "..."} Employees</p>
        </div> */}
    </div>
  );
}

export default ExtraInfo;
