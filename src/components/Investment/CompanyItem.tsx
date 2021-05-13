import React from 'react';
import './CompanyItem.scss';

function CompanyItem(props: any) {

  return (
    <div className='company-item'>
        <img src={props.img} alt=''/>
        <div className='desc'>
        <p className='name'>{props.name}</p>
        <p className='field'>{props.field}</p>
        </div>
    </div>
  );
}

export default CompanyItem;
