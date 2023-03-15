import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/actions';
import './FilterModel.css'

export default function SortModel({ name, text, listOfSorters }) {
    const { sort } = useSelector((state) => state);
    const [option, setOption] = useState(text)
    const dispatch = useDispatch()

    useEffect(() => {
        if (sort[name])
            setOption(sort[name])
    }, [sort])

    const lista = listOfSorters.map((item) => item.Nombre)

    const changeOption = () => {
        let index = lista.indexOf(option)
        if (index === lista.length - 1) index = -1
        setOption(lista[index + 1])
        dispatch(setSort({ [name]: lista[index+1] }))
    }

    return (
        <div className='divFilterModel'>
            <span className='spanTextFilter' onClick={changeOption}>
                {name}: {option}
            </span>
        </div>
    )
}
