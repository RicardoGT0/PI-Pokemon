import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FilterModel from './FilterModel';
import './Filters.css'

export default function Filters() {
  const [filtersType, setFiltersType] = useState([])

  useEffect(() => {
    fillFilters()

  }, [])

  const fillFilters = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/pokemons/types')
      setFiltersType(data)
    } catch (error) {
      return <span>{error.message}</span>
    }
  }

  const listOrigins = [{ ID: 1, Nombre: 'Oficiales' }, { ID: 2, Nombre: 'Creados' }]

  return (
    <div className='divFilters'>
      <FilterModel name={'Origen'} listOfFilters={listOrigins} text={'Todos los Origenes'} />
      <FilterModel name={'Tipos'} listOfFilters={filtersType} text={'Todos los Tipos'} />
    </div>
  )
}
