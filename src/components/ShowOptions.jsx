import React, { useState, useEffect  } from 'react'

export default function ShowOptions(props){

    const {results, updateTrackerSymbol} = props
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleCompanyClick = (index) => {
            setSelectedIndex(index)
    }

    const selectClass = (index) => {
        let theClass = "searchContainer"

        if(index==selectedIndex){
            theClass+= " selectAnswerStyle"
        }
        return theClass;
    }

    const searchResults = results.map((result, index) => (
        <div key={index} className={selectClass(index)} 
            onClick={()=>handleCompanyClick(index)}>
            <div ><span style={{fontWeight: 'bold'}}>Company Name: </span>{result['name']}
            </div>
            <div className='subSearchContainer'>
                <div >Stock Symbol: {result['symbol']}</div>
                <div >Stock Exchange: {result['stockExchange']}</div>  
                <div >Currency: {result['currency']}</div>                
            </div>  
        </div>
    ))

    return(
        <div className='searchBox'>
            
           <h3>Select The Company to Research</h3>
            {searchResults}
            {<button className='submitStyle' 
            onClick={()=>updateTrackerSymbol(results[selectedIndex])}>Submit Selection
            </button>}

        </div>
    )
}