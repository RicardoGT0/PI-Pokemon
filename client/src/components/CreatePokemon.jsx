import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CheckB from './CheckB'
import './CreatePokemon.css'

export default function CreatePokemon() {
  const [pokemon, setPokemon] = useState({})
  const [errors, setErrors] = useState({})
  const [listTypes, setListTypes] = useState([])
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (listTypes.length === 0)
      fillTypes()

    if (checked.length === 0) {
      if (Object.keys(errors).length > 0) {
        setErrors({ ...errors, 'Tipo': `El pokemon debe de tener almenos 1 Tipo` })
      } else {
        setErrors({ 'Tipo': `El pokemon debe de tener almenos 1 Tipo` })
      }
    } else {
      if (Object.keys(errors).length > 0) {
        const temp = { ...errors }
        delete temp.Tipo
        setErrors(temp)
      } else {
        setErrors({})
      }
    }

  }, [checked])

  function handleFormInput(e) {
    const { name, value } = e.target;
    setPokemon({
      ...pokemon,
      [name]: value,
    });
    const newErrors = validacion(e.target)
    setErrors({ ...newErrors })
  }

  const validacion = ({ name, value }) => {
    let errores = { ...errors }
    if (name === 'Nombre' && value.length > 30)
      errores[name] = 'Nombre demasiado largo'
    else
      delete errores[name]

    if ((
      name === 'Altura' ||
      name === 'Peso' ||
      name === 'Vida' ||
      name === 'Velocidad' ||
      name === 'Ataque' ||
      name === 'Defensa' ||
      name === 'Ataque_Especial' ||
      name === 'Defensa_Especial') && isNaN(value)) {
      errores[name] = `${name} debe de ser un Numero`
    }
    else
      delete errores[name]

    return errores
  }

  const showErrors = () => {
    const listErrors = Object.keys(errors).map((target) => <p key={target} className='labelCreatePokemon labelError'>{errors[target]}</p>)
    return <div className='divErrors'>{listErrors}</div>
  }

  const fillTypes = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/pokemons/types')
      setListTypes(data)
    } catch (error) {
      return <span>{error.message}</span>
    }
  }

  const handleCheck = (event) => {
    var updatedList = [...checked];

    if (event.target.checked) {
      if (updatedList.length < 2)
        updatedList = [...checked, event.target.value];
      else {
        event.target.checked = false
        alert('Te recuerdo que los Pokemon solo pueden tener 2 tipos como maximo')
      }
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  }

  const lista = listTypes.map((item) => {
    return (
      <CheckB
        key={item.ID}
        id={item.ID}
        name={item.Nombre}
        handleCheck={handleCheck}
        checked={checked}
      />
    )
  })

  const sendForm = (e) => {
    e.preventDefault()
    if (checked.length === 0) {
      if (Object.keys(errors).length > 0) {
        setErrors({ ...errors, 'Tipo': `El pokemon debe de tener almenos 1 Tipo` })
      } else {
        setErrors({ 'Tipo': `El pokemon debe de tener almenos 1 Tipo` })
      }
    } else {
      try {

      } catch (error) {

      }
    }
  }

  return (
    <form className='divCreatePokemon'>
      <div className='divDetailsPokemon'>
        <div className='divDataPokemon'>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon '>Nombre: </label>
            <input className='InputCreatePokemon' type="text" name='Nombre' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'></div>
          <label className='labelCreatePokemon'>URL de Imagen: </label>
          <input className='InputCreatePokemon' type="text" name='Imagen' onChange={handleFormInput} />
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Altura: </label>
            <input className='InputCreatePokemon' type="text" name='Altura' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Peso: </label>
            <input className='InputCreatePokemon' type="text" name='Peso' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Vida: </label>
            <input className='InputCreatePokemon' type="text" name='Vida' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Velocidad: </label>
            <input className='InputCreatePokemon' type="text" name='Velocidad' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Ataque: </label>
            <input className='InputCreatePokemon' type="text" name='Ataque' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Defensa: </label>
            <input className='InputCreatePokemon' type="text" name='Defensa' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Ataque Especial: </label>
            <input className='InputCreatePokemon' type="text" name='Ataque_Especial' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className='labelCreatePokemon'>Defensa Especial: </label>
            <input className='InputCreatePokemon' type="text" name='Defensa_Especial' onChange={handleFormInput} />
          </div>

        </div>
        {showErrors()}
        <div className='divPreviewImage'>
          {pokemon['Imagen'] ? <img className='previewImage' src={pokemon.Imagen} alt="previewImage" /> : null}
        </div>
      </div>
      <label className='labelCreatePokemon labelTypes'>Tipos: </label>
      <div className='divTypes'>
        {listTypes ? lista : null}
      </div>
      <div className='divButtonCreatePokemon'>
      <button className='buttonCreatePokemon' onClick={sendForm}>Crear Pokemon</button>
      </div>
    </form>
  )
}
