import React, { useState, useEffect} from 'react';
import Button from '../Buttons/Button';
import './CompaniesGrid.scss';
import CompanyItem from './CompanyItem';

function CompaniesGrid(props: any) {

    const [companyList, setCompanyList] = useState([{}]);

    useEffect(() => {
        setCompanyList(props.companies);
        console.log(companyList);
    }, [])

  return (
    <div className='companies-grid'>
        <div className='search-bar'>
            <input type='text'/>
            <Button type='secondary' text='Search'/>
        </div>

        <div className='company-list'>
            {
            companyList.map((company: any) => {
                return (
                <CompanyItem key={company.index} name={company.name} field={company.field} img={company.img != null ? company.img.testimg : company.img} /* temporary, just for test *//>
                )
            })
            }
        </div>
    </div>
  );
}

export default CompaniesGrid;
