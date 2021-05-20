import React from 'react';
import './CompanyHeadline.scss';

function CompanyHeadline(props: any) {

  return (
      <div className='company-headline'>
          <img src={props.companyInfo.img} alt=''/>
          <div className='desc'>
          <p className='name'>{props.companyInfo.name}</p>
          <p className='field'>{props.companyInfo.field}</p>
          </div>
          <p className='company-desc'>{props.companyInfo.companyDesc}</p>
      </div>
  );
}

export default CompanyHeadline;
