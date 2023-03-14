import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShowPokemon } from '../redux/actions';
import Card from './Card'
import './Home.css'
import Searchbar from './Searchbar'


export default function Home() {
  const { pokeShow, allPokemon } = useSelector((state) => state);
  const [totalPages, setTotalPages] = useState(0)
  const [actualPage, setActualPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    setTotalPages(Math.ceil(allPokemon.length/12))
    dispatch(setShowPokemon(actualPage))
  }, [actualPage])


  const cards = pokeShow.map((pokemon, index) => {
    return (
      <Card key={index}
        ID={pokemon.ID}
        Nombre={pokemon.Nombre}
        Imagen={pokemon.Imagen}
        Tipo={pokemon.Tipo}
      />
    )
  })

  const nextPage=()=>{    
    setActualPage(actualPage+1)
  }
  return (
    < >
      <Searchbar />
      <div className='divHome'>
        <Card
          ID={'0'}
          Nombre={'Crear Pokemon'}
          Imagen={'./images/IconoAgregar.png'}
          Tipo={[]}
        />
        {cards}
      </div>
    </>
  )
}
