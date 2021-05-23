import React, {useEffect, useState} from 'react';
import LoadingSVG from '../../Assets/Loading';
import app from '../../FirebaseApp';
import CompanyHeadline from './CompanyHeadline';
import './CompanyProfile.scss';
import ShareStock from './ShareStock';
import StockGraph from './StockGraph';

function CompanyProfile(props: any) {

    const [company, setCompany] = useState({});
    const companyName = props.match.params.name;
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      fetchCompanyStock();       
    }, [])

    type Interval  = "1day" | "1week" | "1month" ;
    const [dataInterval, setDataInterval] = useState<Interval>("1day");
    
    function fetchCompanyStock(){
      setDataInterval("1month");
      const API_KEY = '44e4c120e4ab42239b2c7b36c9a4207f';
      let API_Call = `https://api.twelvedata.com/time_series?symbol=${props.match.params.id}&interval=${dataInterval}&apikey=${API_KEY}`;

      console.log("Fetching...")
      setFetching(true);
      fetch(API_Call)
      .then(
          function(response){
              return response.json();
          })
      .then(
          function(data) {
              setCompany(data);
              console.log(company, data);
              setFetching(false);
          }
      )
  }

//   setCompany({
//     name: 'DEBUG ' + props.match.params.id,
//     field: 'Environment',
//     companyDesc: 'Short company description',
//     todayHigh: 40,
//     todayLow: 30,
//     wkHigh: 20,
//     wkLow: 150,
//     currentStock: 250,
//     currency: '€'
// });

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
    <div className='company-profile'>
      {fetching ?
        <LoadingSVG className="company-loading"/>
        :
        company != null ?
        <div>
        <CompanyHeadline companyInfo={company}/>
        <StockGraph companyInfo={company}/>
        <p className="centered">Want to get a second opinion or help? Choose the range and share with others!</p>
        <ShareStock/>
        </div>
        :
        <p className="error-text">Uh oh, looks like there's been a problem</p>
      }
    </div>
  );
}

export default CompanyProfile;
