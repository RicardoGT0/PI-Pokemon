import React from 'react'
import { useSelector } from 'react-redux';
import Card from './Card'
import './Home.css'
import PagesBar from './PagesBar';
import Searchbar from './Searchbar'

export default function Home() {
  const { pokeShow } = useSelector((state) => state);

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
      <PagesBar />
    </>
  )
}
