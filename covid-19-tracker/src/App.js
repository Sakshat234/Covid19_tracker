import React from 'react';
import './App.css';
import {MenuItem,
FormControl,
Select}
from "@material-ui/core";
import { useState,useEffect } from 'react';

function App() {
  const[countries,SetCountries]=useState([])
  const[country,SetCountry]=useState("worldwide")
  useEffect(() => {
    const getCountriesData= async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {
        const countries=data.map((country)=>({
         name:country.country,
         value:country.countryInfo.iso2, 
        }));
        SetCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async(event)=>{
    const countryCode= event.target.value;
    console.log("Yoo >>>" ,countryCode);
    SetCountry(countryCode)
  };
  

  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID-19 tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {
            countries.map((country)=>(<MenuItem value={country.value}>{country.name}
            </MenuItem>))
          }
        </Select>
      </FormControl>
      <div className="app__stats">
        
      </div>
      
      </div>

      
    </div>
  );
}

export default App;
