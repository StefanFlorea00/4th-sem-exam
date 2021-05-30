import React, {useEffect, useState} from 'react';
import app, { uploadUserImage } from '../FirebaseApp';
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
  const [fetchError, setFetchError] = useState();

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  useEffect(() => {
    setCountry("Denmark");
    setCompanyFetchNr(500);
  }, []);

  useEffect(() => {
    !fetching && fetchCompanies();
  }, [country])

  async function fetchCompanies(){
    const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
    let  API_Call = `https://api.twelvedata.com/stocks`;

    setFetching(true);
    try {
      const response = await fetch(API_Call);
      const json = await response.json();
      const companyObjects = await generateCompanyObjects(json);
      setCompanyList(companyObjects);
    } catch (e){
      console.log(e);
      setFetchError(e);
    } finally {
      setFetching(false);
    }
}

 async function generateCompanyObjects(companyData: any){
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

  function changeCountry(value: string){
    setCountry(value);    
  }

  return (
    <>
    <div className='investment'>
      <div className='description'>
        <h1>Currently available Companies</h1>
        <p>Here you can see a list of companies that are currently available to invest into. Please select a company to proceed.</p>
      </div>
      <div className='country-select-wrapper'>
        <label htmlFor="countries">Country:</label>
        <select name="countries" onChange={e=> changeCountry(e.target.value)} value={country} id="countries" className="country-select">
          <option value="Denmark">Denmark</option>
          <option value="Sweden">Sweden</option>
          <option value="Germany">Germany</option>
          <option value="United States">United States</option>
        </select>
      </div>
      {fetching ?
        <LoadingSVG className="company-loading"/>
        :
        <>
        {companyList.length == 0 || fetchError ? 
          <div className="error-div">
            <p className="error-text">Uh oh, looks like there's been a problem</p>
            {fetchError && <p>Response: {fetchError}</p>}
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
