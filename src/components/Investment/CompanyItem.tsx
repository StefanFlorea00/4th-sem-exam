import React from 'react';
import { Link } from 'react-router-dom';

function CompanyItem(props: any) {
  return (
    <Link to={'/company/' + props.id} style={{ textDecoration: 'none' }}>
      <div className='company-item'>
        <div className='desc'>
          <p className='name'>{props.name}</p>
          <p className='field'>{props.field}</p>
        </div>
      </div>
    </Link>
  );
}

export default CompanyItem;
