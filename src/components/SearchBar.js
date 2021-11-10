import search from "../assets/search.svg"

const regions = ['Worldwide', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const SearchBar = ({onChangeRegion, onFilterCountries, filterValue}) =>{
  

    return (
        <div className="search-bar row">
      <div className="search-icon"><img src={search} alt="search" width="30px" /></div>
      <input onInput={(e) => onFilterCountries(e.target.value)} type="text" placeholder="Search for a country..." value={filterValue} />
    <select name="region" className="regionFilter" onChange={(e) => onChangeRegion(e.target.value)} value={localStorage.getItem('savedRegion') || ''}>
      {regions.map(region => {
          return (<option value={region==='Worldwide' ? '' : region} key={region}>{region}</option>)
      }
      )}
    </select>
    </div>
    )
}

export default SearchBar