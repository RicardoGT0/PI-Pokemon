import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Details.css'

export default function Details() {
  const { id } = useParams();
  const [character, setCharacter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((char) => {
        setCharacter(char);
        setIsLoading(false)
      })
      .catch((err) => {
        window.alert("No hay personajes con ese ID");
      });
    return setCharacter({});
  }, [id]);

  if (isLoading) {
    return (<>
      <h1 className='textdetail'>...Cargando</h1>
    </>)
  } else {
    return (
      <div className='detail'>
        <div className='headerDetail'>
          <h1 className='textdetailHeader'># {id} </h1>
          <h1 className='textdetailHeader'> {character.Nombre.toUpperCase()}</h1>
        </div>
        <div className='detailBox'>
          <div className='divDetailImg'>
            <img className='detailImg' src={character.Imagen} alt={character.Nombre} />
          </div>
          <div className='detailDescription'>
            <div>
              <h1 className='textdetail'>Tipo: {character.Tipo.join(' / ')}</h1>
              <h1 className='textdetail'>Altura: {character.Altura}</h1>
              <h1 className='textdetail'>Peso: {character.Peso}</h1>
              <h1 className='textdetail'>Vida: {character.Vida}</h1>
              <h1 className='textdetail'>Ataque: {character.Ataque}</h1>
              <h1 className='textdetail'>Defensa: {character.Defensa}</h1>
              <h1 className='textdetail'>Velocidad: {character.Velocidad}</h1>
              <h1 className='textdetail'>Ataque Especial: {character.Ataque_Especial}</h1>
              <h1 className='textdetail'>Defensa Especial: {character.Defensa_Especial}</h1>
            </div>
          </div>
        </div>
      </div >
    )
  }

}
