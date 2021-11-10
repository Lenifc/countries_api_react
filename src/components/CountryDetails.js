import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './CountryDetails.css'
import spinner from '../assets/spinner.gif'
import leftArrow from '../assets/left-arrow.svg'

const CountryDetails = () =>{
    let params = useParams()

    const [detailedData, setDetailedData] = useState()

    async function fetchData(){
        let data = await (await fetch(`https://restcountries.com/v2/alpha/${params.country}`)).json()
        if(data.status) {
            console.log("tutaj zrobic redirect do '/'")
            // return (<Link exact to='/'></Link>) ??
        }
        else setDetailedData({...data})
    }

    function countryPopulation() { return detailedData.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
    function countrySize() { return detailedData.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
    function Currencies() { return detailedData.currencies.map(curr => curr.name).join(', ')}
    function Languages () { return detailedData.languages.map(lang => lang.name).join(', ')}
    function Borders() { return detailedData.borders.map(border => {
        return( <Link to={`/country/${border}`} key={border}>
                   <button className="border-btn">{ border }</button>
                </Link>)
    })}


    useEffect(() => {
        fetchData()
    }, [params.country])


    return (
        <div className="container">
            <Link to="/">
                <button className="back-btn"><img src={leftArrow} width="30px" alt="" />Back</button>
            </Link>

   {detailedData && (<div className="fullCard">
      <div className="detailedCard row">
         <div className="detailed-card-img"><img src={detailedData.flag} alt="" /></div>
         <div className="detailed-card-text">
            <div className="detailed-country-name">{ detailedData.name }</div>
            <div className="details-row">
               <div className="details-row1">
                  <div className="country-native-name"><span>Native Name: </span>{ detailedData.nativeName }</div>
                  <div className="population"><span>Population:</span> { detailedData.population ? countryPopulation() : "Unknown" }</div>
                <div className="region"><span>Region:</span> { detailedData.subregion }</div>
                  <div className="capital"><span>Capital: { detailedData.capital }</span></div>
               </div>
               <div className="details-row2">
                  <div className="size"><span>Size: </span>{ detailedData.area ? countrySize() : "Unknown" } <span> km<sup>2</sup></span></div>
                  <div className="currencies"><span>Currencies: </span>{ Currencies() }</div>
                  <div className="languages"><span>Languages: </span>{ Languages() }</div>
               </div>
            </div>
            {detailedData?.borders && detailedData?.borders.length && <div className="borders"><span>Border Countries: </span>
                {Borders()} 
            </div>}
         </div>
      </div>
   </div>
   )}
   {!detailedData && ( <img className="loader" src={spinner} alt = "" /> )}
   </div>
    )
}

export default CountryDetails