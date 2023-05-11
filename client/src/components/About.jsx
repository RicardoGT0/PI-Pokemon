import React from 'react'
import "./About.css";

export default function About() {
  return (
    <>
      <div className='divHeaderAbout'>
        <h1 className='headerAboutText'>P I  -  P o k é m o n </h1>
        <h1 className='headerAboutText'>Fecha de elaboracion de la pagina: Marzo 2023</h1>
      </div>
      <div className='divAbout'>
        <h1 className='textabout'>Acerca del desarrollador</h1>
        <h1 className='textabout'>Nombre: Ricardo González Tello</h1>
        <h1 className='textabout'>Titulo: M. en T. de Computo</h1>
        <div>
          <a className='linkTextabout'
            target="_blank"
            rel="noopener noreferrer"
            href='https://www.linkedin.com/in/ricardo-gt'
          >LinkedIn</a>
        </div>
        <div>
          <a className='linkTextabout'
            target='_blank'
            rel="noopener noreferrer"
            href="https://github.com/RicardoGT0"
          >GitHub</a>
        </div>
      </div>
    </>
  )
}
