import React, {useEffect, useState} from 'react';
import './CompanyHeadline.scss';

function CompanyHeadline(props: any) {

  const [companyInfo, setCompanyInfo] = useState<CompanyAV>();

  type CompanyAV  = {
    Name: "",
    Sector: "",
    Description: ""
  };

  useEffect(() => {
    console.log(props.companyInfo);
    setCompanyInfo(props.companyInfo);
  }, [])

  return (
    //! to fix
      <div className='company-headline'>
          <img src={companyInfo ? "" : "..."} alt=''/>
          <div className='desc'>
          <p className='name'>{companyInfo ? companyInfo.Name : "..."}</p>
          <p className='field'>{companyInfo ? companyInfo.Sector : "..."}</p>
          </div>
          <p className='company-desc'>{companyInfo ? companyInfo.Description.split(".")[0] : "..."}</p>
      </div>
  );
}

export default CompanyHeadline;