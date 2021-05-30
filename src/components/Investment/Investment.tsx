import React, { useEffect, useState } from 'react';
import app from '../FirebaseApp';
import CompaniesGrid from './CompaniesGrid';
import './Investment.scss';
import testimg from '../Assets/testimg.jpg';
import LoadingSVG from '../Assets/Loading';
import Button from '../Buttons/Button';

function Investment() {
  const [companyList, setCompanyList] = useState([]);
  const [country, setCountry] = useState('United States');
  const [companyFetchNr, setCompanyFetchNr] = useState(500);
  const [fetching, setFetching] = useState(false);

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  useEffect(() => {
    fetchCompanies();
    setCountry('United States');
    // setCompanyFetchNr(500);
  }, []);

  async function fetchCompanies() {
    const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
    let API_Call = `https://api.twelvedata.com/stocks`;
    const response = await fetch(API_Call);
    setFetching(true);
    if (!response.ok) {
      setFetching(false);
      throw new Error('something went wrong');
    }
    const data = await response.json();
    const dataArr = await generateCompanyObjects(data);

    setCompanyList(dataArr);
    setFetching(false);
  }

  async function generateCompanyObjects(companyData) {
    let companies = [];
    for (let i = 0; i < companyData.data.length; i++) {
      if (companyData.data[i].country == country) {
        companies.push({
          id: companyData.data[i].symbol,
          name: companyData.data[i].name,
          field: companyData.data[i].country,
          img: { testimg },
        });
        if (companies.length > companyFetchNr) {
          return companies;
        }
      }
    }
  }

  return (
    <>
      <div className='investment'>
        <div className='description'>
          <h1>Currently available Companies</h1>
          <p>
            Here you can see a list of companies that are currently available to
            invest into. Please select a company to proceed.
          </p>
        </div>
        {fetching && <LoadingSVG className='company-loading' />}
        {companyList.length && <CompaniesGrid companies={companyList} />}
      </div>
    </>
  );
}

export default Investment;
