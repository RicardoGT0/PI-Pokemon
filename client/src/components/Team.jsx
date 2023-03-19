import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';
import './Team.css'

export default function Team() {
  const { user } = useSelector((state) => state);
  const [team, setTeam] = useState([])
  const [input, setInput] = useState("");

  useEffect(() => {
    if (team.length <= 0)
      getTeam()

  }, [])

  const getTeam = async () => {
    try {
      let { data } = await axios.get('http://localhost:3001/team/' + user.id)
      data.sort((y,x)=>x.memberID-y.memberID)
      const promises = data.map(async (member) => {
        const response = await axios.get('http://localhost:3001/pokemons/' + member.PokemonID)
        return response.data
      })

      const dataPoke = await Promise.all(promises)
      setTeam(data.map(registro => {
        return {
          ...registro,
          PokemonID: dataPoke.find(poke => poke.ID === registro.PokemonID)
        }
      }))
    } catch (error) {
      alert(error.response.data.Error)
    }
  }

  const removeOfTeam = (member) => {
    axios.delete('http://localhost:3001/team/' + user.id, { params: { memberID: member } })
      .then(resp => {
        alert(resp.data.message)
        getTeam()
      })
      .catch(error => alert(error.response.data.Error))


  }

  const createCards = () => {
    return team.map((registro, index) => {
      const pokemon = registro.PokemonID
      return (
        <div className='divCardTeam' key={index}>
          <Card
            ID={pokemon.ID}
            Nombre={pokemon.Nombre}
            Imagen={pokemon.Imagen}
            Tipo={pokemon.Tipo}
          />
          <button className='buttonRemove' onClick={() => removeOfTeam(registro.memberID)}>Quitar del Equipo</button>
        </div>
      )
    })
  }

  const handleInputChange = ({ target }) => {
    setInput(target.value);
  }

  const onSearch = async (event) => {
    event.preventDefault()
    if (team.length >= 6)
      alert('Hey! Solo puedes llevar 6 Pokémons contigo')
    else
      if (input !== "") {
        axios.get('http://localhost:3001/pokemons?name=' + input)
          .then(resp => {
            const pok = resp.data

            let nextMember = 1;
            const members = team.map(reg => reg.memberID)

            while (members.includes(nextMember)) {
              nextMember += 1
            }
            const newReg = {
              "PokemonID": pok.ID,
              "memberID": nextMember
            }

            axios.post('http://localhost:3001/team/' + user.id, newReg)
              .then(resp => {
                alert(resp.data.message)
                getTeam()
              })
          })
          .catch(error => alert("Ese Pokémon no Existe"))
      }
    setInput('')
  }

  return (
    <>
      <div className='divHeaderTeam'>
        <h1 className='headerTeamText'>{`Tienes ${team.length}/6 Compañeros de Aventuas`}</h1>
      </div>
      <form className='divSearch divSearchTeam' onSubmit={onSearch}>
        <input className='inputSearch inputSearchTeam'
          type='search'
          placeholder='Escribe el Nombre del Pokemon para agregarlo como compañero'
          onChange={handleInputChange}
          value={input}
        />
      </form>
      <div className='divTeam'>
        <div className='divCardsTeam'>
          {team.length > 0 ? createCards() : null}
        </div>
      </div>
    </>
  )
}

