import React, { useState, useEffect} from 'react';
import Button from '../Buttons/Button';
import './CompaniesGrid.scss';
import CompanyItem from './CompanyItem';

function CompaniesGrid(props: any) {

    const [companyList, setCompanyList] = useState([{}]);

    useEffect(() => {
        setCompanyList(props.companies);
    }, [])

  return (
    <div className='companies-grid'>
        <div className='search-bar'>
            <input type="text"/>
            <Button type="secondary" text="Search"/>
        </div>

        <div className='company-list'>
            {
            companyList.map((company: any) => {
                return (
                <CompanyItem name={company.name} field={company.field} key={company.index}/>
                )
            })
            }
        </div>
    </div>
  );
}

export default CompaniesGrid;
