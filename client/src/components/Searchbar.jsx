import React, { useState } from 'react'
import Filters from './Filters'
import './Searchbar.css'
import SearchField from './SearchField'
import Sorters from './Sorters'

export default function Searchbar() {
  
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)

  return (
    <>
      <div className='divSearchbar'>
        <div>
          <div className='divFilter'>
          <button className='filterButton' onClick={() => setShowSort(!showSort)}>Ordenar</button>
          </div>
        </div>
        <SearchField/>
        <div className='divFilter'>
          <button className='filterButton' onClick={() => setShowFilters(!showFilters)}>Filtros</button>
        </div>
      </div>
      {showSort ? <Sorters /> : null}
      {showFilters ? <Filters /> : null}
    </>
  )
}
