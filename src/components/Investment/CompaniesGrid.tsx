import React, { useState, useEffect } from 'react';
import Button from '../Buttons/Button';
import './CompaniesGrid.scss';
import CompanyItem from './CompanyItem';

type CompanyProps = {
  filed: string;
  id: string;
  img: { testimg: string };
  name: string;
};

function CompaniesGrid(props: any) {
  const [companyList, setCompanyList] = useState<CompanyProps[] | [{}]>([{}]);
  const [displayedCompanyist, setDisplayedCompanyList] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(companyList);

  useEffect(() => {
    setCompanyList(props.companies);
    setDisplayedCompanyList(props.companies);
  }, []);

  function searchCompany(value: string) {
    setSearchTerm(value);
    value == ''
      ? setDisplayedCompanyList(companyList)
      : setDisplayedCompanyList(
          companyList.filter((company: CompanyProps | any) =>
            company.name.toLowerCase().includes(value.toLowerCase())
          )
        );
    console.log(displayedCompanyist, value);
  }

  return (
    <div className='companies-grid'>
      <div className='search-bar'>
        <input
          type='text'
          value={searchTerm}
          onChange={event => searchCompany(event.target.value)}
          placeholder="Search for a company..."
        />
        {/* <Button type='secondary' text='Search' /> */}
      </div>

      <div className='company-list'>
        {displayedCompanyist.map((company: any) => {
          return (
            <CompanyItem
              key={company.index}
              id={company.id}
              name={company.name}
              field={company.field}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CompaniesGrid;
