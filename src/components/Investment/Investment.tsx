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
    setCountry("United States");
    setCompanyFetchNr(500);
    fetchCompanies();
  }, [])

  async function fetchCompanies(){
    const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
    let  API_Call = `https://api.twelvedata.com/stocks`;

    setFetching(true);
    const response = await fetch(API_Call);
    const json = await response.json();
    if(json){
    addCompanies(json);
    setFetching(false);
    }
    // fetch(API_Call)
    // .then(
    //     function(response){
    //         console.log(response);
    //         return response.json();
    //     })
    // .then(
    //     function(data) {
    //       addCompanies(data);
    //       setFetching(false);
    //     }
    // )
}

  function addCompanies(companyData){
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
    setCompanyList(companies);
  }

  //to get from db later
  // const Companies=[
  //   {id:"0", name: "Green", field:"Technology", img:{testimg}},
  //   {id:"1", name: "Blue", field:"Technology", img:{testimg}},
  //   {id:"2", name: "Pink", field:"Cleaning", img:{testimg}},
  //   {id:"3", name: "Red", field:"Food", img:{testimg}},
  //   {id:"4", name: "I", field:"Ran", img:{testimg}},
  //   {id:"5", name: "Out", field:"Of", img:{testimg}},
  //   {id:"6", name: "Names", field:"", img:{testimg}},
  //   {id:"7", name: "Names", field:"", img:{testimg}},
  //   {id:"8", name: "Names", field:"", img:{testimg}},
  //   {id:"9", name: "Names", field:"", img:{testimg}},
  // ]

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
