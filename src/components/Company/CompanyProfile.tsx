import React, {useEffect, useState} from 'react';
import app from '../FirebaseApp';
import CompanyHeadline from './CompanyHeadline';
import './CompanyProfile.scss';
import ShareStock from './ShareStock';
import StockGraph from './StockGraph';

function CompanyProfile(props: any) {

    const [Company, setCompany] = useState({});

    useEffect(() => {

        setCompany({
            name: 'DEBUG ' + props.match.params.id,
            field: 'Environment',
            companyDesc: 'Short company description',
            todayHigh: 40,
            todayLow: 30,
            wkHigh: 20,
            wkLow: 150,
            currentStock: 250,
            currency: '€'
        });
        
    }, [])
    
  function handleSignOut() {
    //sign out from the app
    app.auth().signOut();
  }

  return (
    <div className='company-profile'>
        <CompanyHeadline companyInfo={Company}/>
        <StockGraph companyInfo={Company}/>
        <p className="centered">Want to get a second opinion or help? Choose the range and share with others!</p>
        <ShareStock/>
    </div>
  );
}

export default CompanyProfile;
