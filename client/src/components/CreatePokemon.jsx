import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewPokemon } from '../redux/actions'
import CheckB from './CheckB'
import './CreatePokemon.css'

export default function CreatePokemon() {
  const [pokemon, setPokemon] = useState({})
  const [errors, setErrors] = useState({})
  const [listTypes, setListTypes] = useState([])
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate();

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
    let cpErrors = { ...errors }

    if (name === 'Nombre' && value.length >= 20)
      cpErrors[name] = 'Nombre demasiado largo'
    else {
      if ((
        name === 'Altura' ||
        name === 'Peso' ||
        name === 'Vida' ||
        name === 'Velocidad' ||
        name === 'Ataque' ||
        name === 'Defensa' ||
        name === 'Ataque_Especial' ||
        name === 'Defensa_Especial') && isNaN(value)) {
        cpErrors[name] = `${name} debe de ser un Numero`
      } else {
        delete cpErrors[name]
      }
    }
    return cpErrors
  }

  const showErrors = () => {
    const listErrors = Object.keys(errors).map((target) => <p key={target} className='labelCreatePokemon labelError'>{`>> ${errors[target]}`}</p>)
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

  const sendForm = async (e) => {
    e.preventDefault()
    const valCreation = window.confirm('¿Seguro que deseas crear este Pokemon?\n(Cualquier estadistica que no haya sido proporcionada,\nse colocara en cero)')
    if (valCreation) {
      const typ= checked.map((t)=>{
        return listTypes.find((item)=>item.Nombre===t).ID
      })
      const cpPokemon = {
        ...pokemon,
        Imagen: pokemon['Imagen'] ? pokemon['Imagen'] : 'https://cdn-icons-png.flaticon.com/512/3088/3088877.png',
        Vida: pokemon['Vida'] ? pokemon['Vida'] : 0,
        Ataque: pokemon['Ataque'] ? pokemon['Ataque'] : 0,
        Defensa: pokemon['Defensa'] ? pokemon['Defensa'] : 0,
        Velocidad: pokemon['Velocidad'] ? pokemon['Velocidad'] : 0,
        Ataque_Especial: pokemon['Ataque_Especial'] ? pokemon['Ataque_Especial'] : 0,
        Defensa_Especial: pokemon['Defensa_Especial'] ? pokemon['Defensa_Especial'] : 0,
        Altura: pokemon['Altura'] ? pokemon['Altura'] : 0,
        Peso: pokemon['Peso'] ? pokemon['Peso'] : 0,
        Tipo: typ
      }

      try {
        const { data } = await axios.post('http://localhost:3001/pokemons', cpPokemon)
        dispatch(addNewPokemon(data))
        setChecked([])
        setPokemon({})
        setErrors([])
        navigate('/details/' + data.ID)
      } catch (error) {
        alert(error.response.data.Error)
      }
    }
  }

  return (
    <form className='divCreatePokemon'>
      <div className='divDetailsPokemon'>
        <div className='divDataPokemon'>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Nombre'] ? 'labelError' : null}`}>Nombre: </label>
            <input className='InputCreatePokemon' type="text" name='Nombre' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Imagen'] ? 'labelError' : null}`}>URL de Imagen: </label>
            <input className='InputCreatePokemon' type="text" name='Imagen' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Altura'] ? 'labelError' : null}`}>Altura: </label>
            <input className='InputCreatePokemon' type="text" name='Altura' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Peso'] ? 'labelError' : null}`}>Peso: </label>
            <input className='InputCreatePokemon' type="text" name='Peso' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Vida'] ? 'labelError' : null}`}>Vida: </label>
            <input className='InputCreatePokemon' type="text" name='Vida' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Velocidad'] ? 'labelError' : null}`}>Velocidad: </label>
            <input className='InputCreatePokemon' type="text" name='Velocidad' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Ataque'] ? 'labelError' : null}`}>Ataque: </label>
            <input className='InputCreatePokemon' type="text" name='Ataque' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Defensa'] ? 'labelError' : null}`}>Defensa: </label>
            <input className='InputCreatePokemon' type="text" name='Defensa' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Ataque_Especial'] ? 'labelError' : null}`}>Ataque Especial: </label>
            <input className='InputCreatePokemon' type="text" name='Ataque_Especial' onChange={handleFormInput} />
          </div>
          <div className='divInputCreatePokemon'>
            <label className={`labelCreatePokemon ${errors['Defensa_Especial'] ? 'labelError' : null}`}>Defensa Especial: </label>
            <input className='InputCreatePokemon' type="text" name='Defensa_Especial' onChange={handleFormInput} />
          </div>

        </div>
        {showErrors()}
        <div className='divPreviewImage'>
          {pokemon['Imagen'] ? <img className='previewImage' src={pokemon.Imagen} alt="previewImage" /> : null}
        </div>
      </div>
      <label className={`labelCreatePokemon labelTypes ${errors['Tipo'] ? 'labelError' : null}`}>Tipos: </label>
      <div className='divTypes'>
        {listTypes ? lista : null}
      </div>
      <div className='divButtonCreatePokemon'>
        {pokemon['Nombre'] && Object.keys(errors).length === 0 ? <button className='buttonCreatePokemon' onClick={sendForm}>Crear Pokemon</button> : null}
      </div>
    </form>
  )
}
