import React from 'react'
import './Filters.css'
import SortModel from './SortModel'

export default function Sorters() {
  const listSortName = [{ ID: 0, Nombre: 'Sin Orden Alfabetico' }, { ID: 1, Nombre: 'A-Z' }, { ID: 2, Nombre: 'Z-A' }]
  const listSortAtk = [{ ID: 0, Nombre: 'Sin Orden por Ataque' }, { ID: 1, Nombre: 'Ataque Ascendente' }, { ID: 2, Nombre: 'Ataque Descendente' }]
  return (
    <div className='divFilters'>
      <SortModel name={'Orden Alfabetico'} listOfSorters={listSortName} text={'Sin Orden Alfabetico'} />
      <SortModel name={'Orden por Ataque'} listOfSorters={listSortAtk} text={'Sin Orden por Ataque'} />
    </div>
  )
}
