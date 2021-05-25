import React, {useEffect, useState} from 'react';
import './CompanyHeadline.scss';

function CompanyHeadline(props: any) {

  const [companyInfo, setCompanyInfo] = useState({data: [{}]});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCompanyInfo(props.companyInfo);
  }, [])

  useEffect(() => {
    setLoading(false);
  }, [companyInfo])

  return (
    //! to fix
      <div className='company-headline'>
          <img src={loading ? "..." : companyInfo.data[0].img} alt=''/>
          <div className='desc'>
          <p className='name'>{loading ? "..." : companyInfo.data[0].name}</p>
          <p className='field'>{loading ? "..." : companyInfo.data[0].country}</p>
          </div>
          <p className='company-desc'>{loading ? "..." : companyInfo.data[0].companyDesc}</p>
      </div>
  );
}

export default CompanyHeadline;
