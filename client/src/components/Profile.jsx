import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './Profile.css'

export default function Profile() {
  const regularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/; //al menos una letra, al menos un numero, al menos una letra mayúscula, al menos 8 caracteres, no permite espacios.
  const textErrorPassword = 'La Contraseña debe ser de 8 Caracteres o mas y debe de contener Mayusculas, Minusculas, Numeros, sin espacios ni caracteres especiales'
  const { user } = useSelector((state) => state);
  const [passWord, setPassWord] = useState('')
  const [errorPassword, setErrorPassword] = useState(true)

  const valPassword = (value) => {
    if (regularPassword.test(value)) {
      setErrorPassword(false)
    } else {
      setErrorPassword(true)
    }
    setPassWord(value)
  }

  const handleErrorAction = () => {
    if (passWord.length > 0) {
      return errorPassword ?
        <span className='spanError'>{textErrorPassword}</span> :
        <button className='buttonProfile' onClick={updatePassword}>Guardar Contraseña</button>
    } else {
      return null
    }
  }

  const updatePassword = async () => {
    try {
      const { data } = await axios.put('http://localhost:3001/user/' + user.id, {
        body: { Password: passWord }
      })
      alert(data.message)
    } catch (error) {
      alert(error)
    }
  }

  const deleteUser = async () => {

  }

  return (
    <div className='divProfile'>
      <div className='headerProfile'>
        <h1 className='textProfileHeader'> {user.userName.toUpperCase()}</h1>
      </div>
      <div className='ProfileBox'>
        {/* <div className='divProfileImg'></div> */}
        <img className='profileImg' src='https://static.wikia.nocookie.net/espokemon/images/1/1b/Rangers_ROZA.png' alt={'Trainers'} />
        <div className='profileDescription'>
          <div className='divFormInput'>
            <label className='labelProfile'>Cambiar Contraseña:</label>
            <input className={errorPassword ? 'dangerInputLogin' : 'inputLogin'}
              type="password"
              name='password'
              value={passWord}
              placeholder='Nueva Contraseña'
              onChange={(e) => valPassword(e.target.value)} />
            <div className='divError'>
              {handleErrorAction()}
            </div>
          </div>
          <button className='buttonDeleteProfile' onClick={deleteUser}>Eliminar Cuenta</button>
        </div>
      </div>
    </div>
  )
}
