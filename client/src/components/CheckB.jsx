import React from 'react'
import './CheckB.css'

export default function CheckB({id, name, handleCheck, checked}) {
    return (
        <div className='divCheckbox'>
            <input value={name} type="checkbox" onChange={handleCheck} checked={checked.includes(name)} />
            <span className='spanCheckBoxName'>{name}</span>
        </div>
    )
}
