import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setShowPokemon } from '../redux/actions';
import './PagesBar.css'

export default function PagesBar() {
    const { pokefound } = useSelector((state) => state);
    const [totalPages, setTotalPages] = useState(0)
    const [actualPage, setActualPage] = useState(1)
    const [input, setInput] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        const total = Math.ceil(pokefound.length / 12)
        setTotalPages(total)
        if (actualPage > total) {
            setActualPage(1)
            dispatch(setShowPokemon(1))
            setInput(1)
        }
        dispatch(setShowPokemon(actualPage))
        setInput(actualPage)
    }, [actualPage, pokefound])

    const nextPage = () => {
        setActualPage(1 + actualPage)
    }
    const prevPage = () => {
        setActualPage(actualPage - 1)
    }

    const handleInputChange = ({ target }) => {
        if (target.value > totalPages)
            setInput(totalPages);
        else if (target.value < 1)
            setInput(1);
        else
            setInput(Number(target.value));
    }

    const submit = (e) => {
        e.preventDefault()

        setActualPage(input)
        dispatch(setShowPokemon(input))
    }

    return (
        <div className='divPageBar'>
            {actualPage <= 1 ? null : <button className='pagesButton' onClick={prevPage}>{'<'}</button>}
            <form className='divNumPage' onSubmit={submit}>
                <input className='numPageInput'
                    type="search"
                    name="numPage"
                    onChange={handleInputChange}
                    value={input}
                />
                <label className='numPageLabel'>{` / ${totalPages}`}</label>
            </form>
            {actualPage >= totalPages ? null : <button className='pagesButton' onClick={nextPage}>{'>'}</button>}
        </div>
    )
}
