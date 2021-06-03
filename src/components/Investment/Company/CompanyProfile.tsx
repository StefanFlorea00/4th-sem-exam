import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import LoadingSVG from '../../Assets/Loading';
import Button from '../../Buttons/Button';
import app from '../../FirebaseApp';
import CompanyHeadline from './CompanyHeadline';
import ShareStock from './ShareStock';
import StockGraph from './StockGraph';

function CompanyProfile(props: any) {
  const [companyTD, setCompanyTD] = useState<CompanyTD | null>();
  const [companyAV, setCompanyAV] = useState<CompanyAV | null>();
  const [fetching, setFetching] = useState(false);
  const history = useHistory();
  
  document.title = `Community - ${props.match.params.id}`;

  type CompanyAV = {
    Name: string;
    Sector: string;
    Description: string;
    status: string;
  };

  type CompanyTD = {
    status: string;
    meta: string;
  };

  type Interval = '1h' | '1day' | '1week' | '1month';
  const [dataInterval, setDataInterval] = useState<Interval>('1day');

  useEffect(() => {
    setDataInterval('1month');
    fetchFullCompanyData();
    setFetching(true);
    // fetchCompanyStock();
  }, []);

  useEffect(() => {
    !fetching && fetchGraphData();
  }, [dataInterval]);

  async function fetchFullCompanyData() {
    //TWELVEDATA Refered to as TD, ALPHAVANTAGE Refered to as AV

    const API_KEY_TWELVEDATA = '44e4c120e4ab42239b2c7b36c9a4207f'; //https://api.twelvedata.com/stocks?symbol=${props.match.params.id}
    const API_KEY_ALPHAVANTAGE = '7KXQKJF29JM9VRZS';
    let API_Call = `https://api.twelvedata.com/time_series?symbol=${props.match.params.id}&interval=${dataInterval}&apikey=${API_KEY_TWELVEDATA}`;
    let API_Call2 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${props.match.params.id}&apikey=${API_KEY_ALPHAVANTAGE}`;

    console.log('Fetching...');
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

  function sendBack() {
    let path = '/investment';
    history.push(path);
  }

  return (
    <div className='company-profile'>

      {fetching ?
        <LoadingSVG hasErrorText className="company-loading"/>
        :
        (companyTD?.meta != null && companyAV?.Name != null ?
          (<div>
          <CompanyHeadline companyInfoAV={companyAV}/>
          <div className="top-btn-wrapper">
            <div className="back-btn-wrapper">
              <Button type="primary" text="Back" onClick={() => sendBack()}/>

            </div>
            <div className='timeline-btn-wrapper'>
              <p>Stock timeline interval:</p>
              <Button
                type={dataInterval == '1h' ? 'secondary' : 'primary'}
                text='1 Hour'
                onClick={() => setDataInterval('1h')}
              />
              <Button
                type={dataInterval == '1day' ? 'secondary' : 'primary'}
                text='1 Day'
                onClick={() => setDataInterval('1day')}
              />
              <Button
                type={dataInterval == '1week' ? 'secondary' : 'primary'}
                text='1 Week'
                onClick={() => setDataInterval('1week')}
              />
              <Button
                type={dataInterval == '1month' ? 'secondary' : 'primary'}
                text='1 Month'
                onClick={() => setDataInterval('1month')}
              />
            </div>
          </div>
          <StockGraph
            companyInfoTD={companyTD}
            dataInterval={dataInterval}
            companyInfoAV={companyAV}
          />
          <p className='centered'>
            Want to get a second opinion or help? Choose the range and share
            with others!
          </p>
          <ShareStock companyInfoTD={companyTD} companyInfoAV={companyAV} />
        </div>
      ) : (
        <div className='error-wrapper'>
          <h1>Sorry!</h1>
          <p className='error-text'>
            We don't currently have data about this company
          </p>
          <Button type='secondary' text='Go Back' onClick={() => sendBack()} />
        </div>
      ))}
    </div>
  );
}

export default CompanyProfile;
