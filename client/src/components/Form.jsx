import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Form.css'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { accessOn } from '../redux/actions'


export default function Form() {
    const [passWord, setPassWord] = useState('')
    const [userName, setUserName] = useState('')
    const [errorUser, SetErrorUser] = useState(true)
    const [errorPassword, setErrorPassword] = useState(true)
    const dispatch = useDispatch()
    const regularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/; //al menos una letra, al menos un numero, al menos una letra mayúscula, al menos 8 caracteres, no permite espacios.
    const regularUser = /\S+@\S+\.\S+/; //un correo electronico
    const textErrorUser = 'El Nombre de Usuario debe ser un Correo'
    const textErrorPassword = 'La Contraseña debe ser de 8 Caracteres o mas y debe de contener Mayusculas, Minusculas, Numeros, sin espacios ni caracteres especiales'
    const textErrorGeneral = 'Nombre de Usuario y/o Contraseña no Validos'
    const navigate = useNavigate();

    const login = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/user', {
                params: { Password: passWord, UserName: userName }
            })
            //data={id: 13, created: true}
            dispatch(accessOn({id:data.id, userName:userName}))
            if (data.created)
                alert("¡Tu propia leyenda POKÉMON está a punto de comenzar!\n¡Te espera un mundo de sueños y aventuras con los POKÉMON!\n¡Adelante!  "+ userName)
            else
                alert(`Hola, estaba deseando verte ${userName}`);
            navigate("/home");            
        } catch (error) {
            //error.response.data={Error: 'Nombre de Usuario y/o Contraseña Incorrectos'}
            alert(error.response.data.Error);
        }
    }

    const valUser = (value) => {
        if (regularUser.test(value)) {
            SetErrorUser(false)
        } else {
            SetErrorUser(true)
        }
        setUserName(value)
    }

    const valPassword = (value) => {
        if (regularPassword.test(value)) {
            setErrorPassword(false)
        } else {
            setErrorPassword(true)
        }
        setPassWord(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

    const errorMessage = () => {
        if (errorUser && errorPassword) {
            return <span className='spanError'>{textErrorGeneral}</span>
        }
        if (errorUser) {
            return <span className='spanError'>{textErrorUser}</span>
        }
        if (errorPassword) {
            return (<span className='spanError'>{textErrorPassword}</span>)
        }
        return <button className='buttonLogin' type='submit'>Acceder</button>
    }

    return (
        <div className='containerForm'>
            <div className='containerPikaSit'>
                <img className='pikaSit' src="/images/sit_pika.png" alt='pikaSit' />
            </div>
            <form className="divForm" onSubmit={((e) => { handleSubmit(e) })}>
                <h2 className='loginText'>Acceso</h2>
                <div className='divCaptura'>
                    <div className='divFormInput'>
                        <label className='labelLogin'>Usuario: </label>
                        <input className={`inputLogin ${errorUser ? 'dangerInputLogin' : null}`}
                            type="text"
                            name="userName"
                            value={userName}
                            placeholder="correo@dominio.com"
                            onChange={(e) => valUser(e.target.value)} />
                    </div>
                    <div className='divFormInput'>
                        <label className='labelLogin'>Contraseña: </label>
                        <input className={errorPassword ? 'dangerInputLogin' : 'inputLogin'}
                            type="password"
                            name='password'
                            value={passWord}
                            placeholder='Contraseña'
                            onChange={(e) => valPassword(e.target.value)} />
                    </div>
                </div>
                <div className='divError'>
                    {errorMessage()}
                </div>
            </form>
        </div>

    )
}

