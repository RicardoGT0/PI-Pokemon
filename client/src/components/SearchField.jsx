
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setShowPokemon } from '../redux/actions';
import './Searchbar.css'


export default function SearchField() {

    const [input, setInput] = useState("");
    const dispatch = useDispatch()

    const handleInputChange = ({ target }) => {
        setInput(target.value);
    }



    const onSearch = async (event) => {
        event.preventDefault()
        dispatch(setShowPokemon(input))
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
