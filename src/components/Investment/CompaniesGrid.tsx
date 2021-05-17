import React, { useState, useEffect} from 'react';
import Button from '../Buttons/Button';
import './CompaniesGrid.scss';
import CompanyItem from './CompanyItem';

function CompaniesGrid(props: any) {

    const [companyList, setCompanyList] = useState([{}]);
    const [displayedCompanyist, setDisplayedCompanyList] = useState([{}]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCompanyList(props.companies);
        setDisplayedCompanyList(props.companies);
    }, [])

    function searchCompany(value: string) {
        setSearchTerm(value);
        value == '' ? setDisplayedCompanyList(companyList) : setDisplayedCompanyList(companyList.filter(company => company.name.toLowerCase().includes(value)));
        console.log(displayedCompanyist, value);
    }

  return (
    <div className='companies-grid'>
        <div className='search-bar'>
            <input type='text' value={searchTerm} onChange={(event) => searchCompany(event.target.value)} />
            <Button type='secondary' text='Search'/>
        </div>

        <div className='company-list'>
            {
            displayedCompanyist.map((company: any) => {
                return (
                <CompanyItem key={company.index} id={company.id} name={company.name} field={company.field} img={company.img != null ? company.img.testimg : company.img} /* temporary, just for test *//>
                )
            })
            }
        </div>
    </div>
  );
}

export default CompaniesGrid;
