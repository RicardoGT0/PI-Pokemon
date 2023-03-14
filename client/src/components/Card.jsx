import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export default function Card({ ID, Nombre, Imagen, Tipo = [] }) {
    const [hover, setHover] = useState(false)
    const showDescription = () => {
        return <div className='divCardDescription'>
            <div className='divCardID'># {ID}</div>
            <div className='divCardName'>{Nombre}</div>
            <div className='divCardTypes'>{Tipo.join('/')}</div>
        </div>
    }

    return (
        <Link to={ID === '0' ? '/create' : `/details/${ID}`} >
            <div className={`divCard`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                <div className={`divCardImage ${hover ? 'blur' : null}`} >
                    <img className='pokeImage' src={Imagen} alt={Nombre} />
                </div>
                {hover ? showDescription() : null}
            </div>
        </Link>
    )
}
