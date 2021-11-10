import { Link } from "react-router-dom";

function CountryCard(props){
    let { countryData } = props
    let country = countryData

    function population(country){ 
        return country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    return(
        <div className="card" key={countryData[0]}>
          <Link to={`/country/${country.alpha3Code}`}>
          <div className="card-img"><img src={country.flag} alt={country.name} width="300px"/></div>
          <div className="card-text">
            <h1 className="country-name">{ country.name }</h1>
            <div className="population"><span>Population:</span> { population(country) }</div>
            <div className="region"><span>Region:</span> { country.subregion }</div>
            <div className="capital"><span>Capital: { country.capital }</span></div>
          </div>
          </Link>
        </div> 
    )
}

export default CountryCard