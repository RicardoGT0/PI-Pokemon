import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/actions';
import CheckB from './CheckB';
import './FilterModel.css'

export default function SortModel({ name, text, listOfFilters }) {
    const [show, setShow] = useState(false)
    const { sort } = useSelector((state) => state);
    const [checked, setChecked] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (sort[name])
            setChecked(sort[name])
    }, [])

    const handleCheck = (event) => {
        var updatedList = [...checked];

        if (event.target.checked) {
            if (updatedList.length < 2)
                updatedList = [...checked, event.target.value];
            else {
                event.target.checked = false
                alert('Te recuerdo que los Pokemon solo pueden tener 2 tipos como maximo')
            }
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        dispatch(setSort({ [name]: updatedList }))
    }



    const lista = listOfFilters.map((item) => {
        return (
            <CheckB
                key={item.ID}
                id={item.ID}
                name={item.Nombre}
                handleCheck={handleCheck}
                checked={checked}
            />
        )
    })

    return (
        <div className='divFilterModel'>
            <span className='spanTextFilter' onClick={() => setShow(!show)}>
                {name}: {checked.length ? checked.join(', ') : text}
            </span>
            {show ? lista : null}
        </div>
    )
}
