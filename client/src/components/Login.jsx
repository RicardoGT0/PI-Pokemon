import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokes } from '../redux/actions'
import Form from './Form'
import './Login.css'

export default function Login() {
  const [loading, setLoading] = useState(true)
  const { allPokemon } = useSelector((state) => state);
  const [valProgress, setValProgress] = useState(0)
  const dispatch = useDispatch()


  useEffect(() => {
    const lowLimit = 70
    const topLimit = 86
    if (allPokemon.length === 0) {
      setLoading(true)
      for (let i = lowLimit; i < topLimit; i++) {  //86 paginado maximo
        axios.get('http://localhost:3001/pokemons', { params: { page: i } })
          .then(resp => {
            dispatch(getAllPokes(resp.data))
          })
      }
    }
    setValProgress(allPokemon.length / ((topLimit - lowLimit - 1) * 12))
    if (allPokemon.length >= ((topLimit - lowLimit - 1) * 12)) {
      setLoading(false)
    }
  }, [allPokemon])

  if (loading) {
    return (
      <div className='divLoading'>
        <div className='videoLoading'>
          <video loop autoPlay muted>
            <source src="./images/LoadingVideo.mp4" type="video/mp4" />
          </video>
        </div>
        <h1 className='textLoading'> Cargando ... </h1>
        <progress value={valProgress} />
      </div>
    )
  } else {
    return (
      <div className='divRoot'>
        <img className='textroot' src="/images/titulo.png" alt="titulo" />
        <Form />
      </div>
    )
  }


}
