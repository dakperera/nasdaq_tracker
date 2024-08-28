import React, { useState, useEffect  } from 'react'
import './style.css'
import axios from 'axios';
import ShowOptions from './components/ShowOptions';
import ShowData from './components/ShowData';

function App() {
    
  const [trackerSymbol, setTrackerSymbol] = React.useState(undefined);
  const [results, setResults] = useState(null);
  const [ApiError, setApiError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [userInput, setUserInput] = useState("");
  const [inputBoxDisabled, setInputBoxDisabled] = useState(false);

  function updateTrackerSymbol(newValue){
    setTrackerSymbol(newValue);
    setInputBoxDisabled(true);

  }

  function clearData(){
    setTrackerSymbol(undefined);
    setResults(null);
    setApiError(null);
    setErrorMessage(undefined);
    setUserInput("")
    setInputBoxDisabled(false);
  }

  function handleInputChange(event){
    setUserInput(event.target.value);
  }

  async function handleSubmit(event){
      event.preventDefault();
      clearData();
      
      const url = `https://financialmodelingprep.com/api/v3/search?query=${userInput}&exchange=NASDAQ&exchange=NYSE&exchange=TSX&exchange=AMEX&apikey=yTBhAhVuKXSadNt9DrH80oZ5DNReYcXk`
      
      try{
          const response = await axios.get(url);
          
          if(response.data){
            if(response.data.length==0){
              setErrorMessage("No Results Found, Try a Different Entry")
            }
            else{
              setResults(response.data);
            }
          }
          else{
            setErrorMessage("Error with Data")          }

          console.log(response)
      }
      
      catch (err){
        setApiError('Error fetching data')
      }
  }  

  return (
    <main>
      
      <h1>North American Stock Tracker</h1>
      <div>
        <input 
          required
          type="text"
          name="trackerName"
          placeholder="Search for a stock symbol or company name"
          onChange={handleInputChange}
          className='inputStyle'
          value = {userInput}
          disabled = {inputBoxDisabled}
        />
        {(!trackerSymbol) && <button onClick={handleSubmit} className='submitStyle'>Begin Search</button>}
      
      </div>      
      <h4>Search for Stocks on the New York, Nasdaq, and Toronto Stock Exchanges</h4>

      {ApiError && <h3>Error Obtaining Data From API side</h3>}   

      {(results && !trackerSymbol) && <ShowOptions results={results} updateTrackerSymbol={updateTrackerSymbol}/>}   

      {trackerSymbol && <ShowData clearData={clearData} trackerSymbol={trackerSymbol}/>}           

      {
        errorMessage ? <h3>{errorMessage}</h3> : null
      }

      <h6>Data provided by <a href="https://financialmodelingprep.com/developer/docs/" target="_blank" rel="noopener">Financial Modeling Prep</a> and <a href="https://www.alphavantage.co/documentation/" target="_blank" rel="noopener">Alpha Vantage</a></h6>
      
    </main>
  )
}

export default App
