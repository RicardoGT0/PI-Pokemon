import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPokefound, setPokemonByName } from '../redux/actions';
import './Searchbar.css'

export default function SearchField() {

    const [input, setInput] = useState("");
    const dispatch = useDispatch()

    const handleInputChange = ({ target }) => {
        setInput(target.value);
    }

    const onSearch = async (event) => {
        event.preventDefault()
        if (input === "")
            dispatch(setPokefound())
        else
            dispatch(setPokemonByName(input))
    }

    return (
        <form className='divSearch' onSubmit={onSearch}>
            <input className='inputSearch'
                type='search'
                placeholder='Nombre del Pokemon'
                onChange={handleInputChange}
                value={input}
            />
        </form>
    )
}
