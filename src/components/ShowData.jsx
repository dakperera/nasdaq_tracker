import React, { useState, useEffect  } from 'react'
import axios from 'axios';
import LineChart from './LineChart';

export default function ShowData(props){

    const {clearData, trackerSymbol} = props
    const apiKey = 'IOTXPI3NI774R9KA';
    const [results, setResults] = useState(null);
    const [ApiError, setApiError] = useState(null);

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${trackerSymbol.symbol}&outputsize=compact&apikey=${apiKey}`;
   
    React.useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get(url);
                let tempArray = response.data['Time Series (Daily)'];
                
                const newArray = Object.entries(tempArray).map(([date, values]) => {
                    return {
                        Date: date,
                        Open: values["1. open"]
                    }
                });
                setResults(newArray);

            }
            catch(err){
                setApiError('Error fetching data')
            }
        };
        fetchData();
        
    }, []);    

    return(
        <div className="searchBox">
            <div className={'searchContainer selectAnswerStyle'} >
                <div><span style={{fontWeight: 'bold'}}>Company Name: </span>{trackerSymbol['name']}
                </div>
                <div className='subSearchContainer'>
                    <div><span style={{fontWeight: 'bold'}}>Stock Symbol: </span>{trackerSymbol['symbol']}</div>
                    <div><span style={{fontWeight: 'bold'}}>Stock Exchange: </span>{trackerSymbol['stockExchange']}</div>  
                    <div><span style={{fontWeight: 'bold'}}>Currency: </span>{trackerSymbol['currency']}</div>                
                </div>  
            </div>

            {ApiError && <h3>{ApiError}</h3>}

            <h2>{`${trackerSymbol['name']} Opening Day Price Chart`}</h2>

            {results && <LineChart data={results} name={trackerSymbol['name']}/>}

            <button onClick={clearData} className='submitStyle'>Clear Data</button>
        </div>
    )
}