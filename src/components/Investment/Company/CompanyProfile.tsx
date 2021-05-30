import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import LoadingSVG from '../../Assets/Loading';
import Button from '../../Buttons/Button';
import app from '../../FirebaseApp';
import CompanyHeadline from './CompanyHeadline';
import './CompanyProfile.scss';
import ShareStock from './ShareStock';
import StockGraph from './StockGraph';

function CompanyProfile(props: any) {

    const [companyTD, setCompanyTD] = useState({});
    const [companyAV, setCompanyAV] = useState({});
    const [fetching, setFetching] = useState(false);
    const history = useHistory();
    
    type Interval  = "1h" | "1day" | "1week" | "1month" ;
    const [dataInterval, setDataInterval] = useState<Interval>("1day");

    useEffect(() => {
      setDataInterval("1month");
      fetchFullCompanyData();
      setFetching(true); 
      // fetchCompanyStock();       
      console.log(companyTD);
    }, [])

    useEffect(() => {
      !fetching && fetchGraphData();
    }, [dataInterval])
    
    async function fetchFullCompanyData(){
      //TWELVEDATA Refered to as TD, ALPHAVANTAGE Refered to as AV

      const API_KEY_TWELVEDATA = '44e4c120e4ab42239b2c7b36c9a4207f'; //https://api.twelvedata.com/stocks?symbol=${props.match.params.id} 
      const API_KEY_ALPHAVANTAGE = '7KXQKJF29JM9VRZS';
      let API_Call = `https://api.twelvedata.com/time_series?symbol=${props.match.params.id}&interval=${dataInterval}&apikey=${API_KEY_TWELVEDATA}`;
      let API_Call2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${props.match.params.id}&apikey=${API_KEY_ALPHAVANTAGE}`;

      console.log("Fetching...")
      const response = await fetch(API_Call);
      const response2 = await fetch(API_Call2);
      const TimeSeries = await response.json();
      const CompanyInformation = await response2.json();

      setCompanyTD(TimeSeries);
      setCompanyAV(CompanyInformation);

      setFetching(false);
  }

  async function fetchGraphData() {
    const API_KEY_TWELVEDATA = '44e4c120e4ab42239b2c7b36c9a4207f'; //https://api.twelvedata.com/stocks?symbol=${props.match.params.id} 
    let API_Call = `https://api.twelvedata.com/time_series?symbol=${props.match.params.id}&interval=${dataInterval}&apikey=${API_KEY_TWELVEDATA}`;
    
    const response = await fetch(API_Call);
    const TimeSeries = await response.json();

    setCompanyTD(TimeSeries);
  }

  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  function routeChange() {
    let path = "/investment";
    history.push(path);
  }

  return (
    <div className='company-profile'>
      {fetching ?
        <LoadingSVG className="company-loading"/>
        :
        companyTD != null ?
          <div>
          <CompanyHeadline companyInfo={companyAV}/>
          <div className="top-btn-wrapper">
            <div className="back-btn-wrapper">
              <Button type="primary" text="Back" onClick={() => routeChange()}/>
            </div>
            <div className="timeline-btn-wrapper">
                <Button type="secondary" text="1 Hour" onClick={() => setDataInterval("1h")}/>
                <Button type="secondary" text="1 Day" onClick={() => setDataInterval("1day")}/>
                <Button type="secondary" text="1 Week" onClick={() => setDataInterval("1week")}/>
                <Button type="secondary" text="1 Month" onClick={() => setDataInterval("1month")}/>
            </div>
          </div>
          <StockGraph companyInfoTD={companyTD} dataInterval={dataInterval} companyInfoAV={companyAV}/>
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
