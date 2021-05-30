import React, {useEffect, useState} from 'react';
import app from '../FirebaseApp';
import CompaniesGrid from './CompaniesGrid';
import './Investment.scss';
import testimg from '../Assets/testimg.jpg';
import LoadingSVG from '../Assets/Loading';
import Button from '../Buttons/Button';

function Investment() {

  const [companyList, setCompanyList] = useState([{}]);
  const [country, setCountry] = useState("");
  const [companyFetchNr, setCompanyFetchNr] = useState();
  const [fetching, setFetching] = useState(false);
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  useEffect(() => {
    fetchCompanies();
  }, [])

  async function fetchCompanies(){
    const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
    let  API_Call = `https://api.twelvedata.com/stocks`;

    setCountry("United States");
    setCompanyFetchNr(500);

    setFetching(true);
    try {
      const response = await fetch(API_Call);
      const json = await response.json();
      setCompanyList(generateCompanyObjects(json));
    } catch (e){
      console.log(e)
    } finally {
      setFetching(false);
    }
}

  function generateCompanyObjects(companyData){
    let companies = [];
    let fetchedCompaniesNr = 0;
    console.log(companyData);
    for(let i = 0 ; i< companyData.data.length ; i++ )  {
      if(companyData.data[i].country == country && fetchedCompaniesNr < companyFetchNr){
        companies.push(
          {
          id: companyData.data[i].symbol,
          name: companyData.data[i].name,
          field: companyData.data[i].country,
          img:{testimg}
          }
          );
        fetchedCompaniesNr++;
      }
    }
    return companies;
  }

  return (
    <>
    <div className='investment'>
      <div className='description'>
        <h1>Currently available Companies</h1>
        <p>Here you can see a list of companies that are currently available to invest into. Please select a company to proceed.</p>
      </div>
      {fetching ?
        <LoadingSVG className="company-loading"/>
        :
        <>
        {companyList.length == 0 ? 
          <div className="error-div">
            <p className="error-text">Uh oh, looks like there's been a problem</p>
            <Button onClick={() => fetchCompanies()} type="secondary" text="Retry"/>
          </div>
        : <CompaniesGrid companies={companyList}/>}
        </>
      }
    </div>
    </>
  );
}

export default Investment;
