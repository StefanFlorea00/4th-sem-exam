import { format } from 'echarts';
import React, { useEffect, useState } from 'react';

function CompanyHeadline(props: any) {
  const [companyInfo, setCompanyInfo] = useState<CompanyAV>();

  type CompanyAV = {
    Name: string;
    Sector: string;
    Description: string;
  };

  useEffect(() => {
    setCompanyInfo(props.companyInfoAV);
  }, []);

  return (
    //! to fix
    <div className='company-headline'>
      <div className='desc'>
        <p className='name'>
          {companyInfo && companyInfo.Name ? companyInfo.Name : '...'}
        </p>
        <p className='field'>
          {companyInfo && companyInfo.Sector ? companyInfo.Sector : '...'}
        </p>
      </div>
      <p className='company-desc'>
        {companyInfo && companyInfo.Description
          ? companyInfo.Description.split('. ')[0]
          : '...'}
      </p>
    </div>
  );
}

export default CompanyHeadline;
