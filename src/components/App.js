import './App.css';
import Header from './Header'
import CountryCard from './CountryCard'
import CountryDetails from './CountryDetails';
import SearchBar from './SearchBar'
import React, { useState, useEffect } from 'react';
import spinner from '../assets/spinner.gif'

import {Routes, Route } from "react-router-dom";


function App() {
  const [allCountries, setAllCountries] = useState()
  const [showTheseCountries, setShowTheseCountries] = useState()
  const [filterValue, setFilterValue] = useState('')
  const [regionCountries, setRegionCountries] = useState()
  
  // console.log()

  function filterCountries(val) {
    let Val = val?.toLowerCase()?.trim()
    // console.log('filterVal', Val)
    const useThisData = regionCountries ? regionCountries : Object.values(allCountries)
    // console.log('thisData', useThisData, Object.values(useThisData));

    const searchedCountry = (!val || val === '') ? useThisData : Object.values(useThisData).filter((filterCountry) =>
      filterCountry.name.toLowerCase().includes(Val) ||
      filterCountry.alpha3Code.toLowerCase().includes(Val) ||
      filterCountry.nativeName.toLowerCase().includes(Val))

    // console.log(searchedCountry, searchedCountry.length);
    setShowTheseCountries(searchedCountry)
    // this.showFilteredCountries = this.searchedCountry
  }

  const changeRegion = (currentRegion) => {
    // console.log('Region', currentRegion)
    // console.log(allCountries);

    if (!currentRegion || currentRegion === '') {
      // console.log(allCountries)
      setShowTheseCountries(allCountries)
      setRegionCountries(allCountries)
    }
    else {
      const filterRegionCountries = Object.values(allCountries || []).filter(item => item.region === currentRegion)
      setRegionCountries(filterRegionCountries)
      setShowTheseCountries(filterRegionCountries)
      // console.log('region', filterRegionCountries)
    }
    localStorage.setItem('savedRegion', currentRegion)
  }

  useEffect(() => {
    fetch('https://restcountries.com/v2/all/').then(response => response.json())
      .then(recivedData => {
        // console.log(recivedData)
        setAllCountries({...recivedData})
        setShowTheseCountries({...recivedData})
        // if(localStorage.getItem('savedRegion')) changeRegion(localStorage.getItem('savedRegion'))
      })
  }, [])

  useEffect(() => {
    changeRegion(localStorage.getItem('savedRegion') || '')
  }, [allCountries]) // przez te asynchronicznosc musialem dodac osobno wywolanie funkcji dopiero po
  // odpowiednim zapisaniu danych w zmiennej allCountries

  useEffect(() => {
    if(filterValue) filterCountries(filterValue)
  }, [regionCountries])


  return ( 
  <div className="container" >
    <Header />
    <Routes>
      <Route path="country/:country" element={<CountryDetails />} />
        <Route path="*" element={
          <div>
            <SearchBar onFilterCountries={data => setFilterValue(data, filterCountries(data))}
                        onChangeRegion={val => changeRegion(val)}
                        filterValue={filterValue} /> 
            <div className = "showFilteredCountries row"> 
              {showTheseCountries && Object.entries(showTheseCountries).map(country => {
                  return (<CountryCard countryData={country[1]} key={country[1]?.alpha3Code || country[1].alpha2Code} />)
                  })
              }
              {!allCountries && ( <img className="loader" src={spinner} alt = "" /> )} 
              {filterValue && showTheseCountries.length === 0 && (<div>No countries found</div>)}
            </div> 
          </div>
        } />
    </Routes>

</div>
    )
  }

export default App
