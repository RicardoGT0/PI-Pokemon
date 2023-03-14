
import axios from 'axios'
import * as action from './action_type'


export const accessOn = (id) => {
    return {
        type: action.ACCESSON,
        payload: id
    }
}

export const accessOff = () => {
    return {
        type: action.ACCESSOFF
    }
}

export const getAllPokes = () => (dispatch) => {
    for (let i = 1; i <= 2; i++) {  //86 paginado maximo
        axios.get('http://localhost:3001/pokemons', { params: { page: i } })
            .then(resp => {
                dispatch({
                    type: action.GETALLPOKES,
                    payload: resp.data
                })
            })
    }
}

export const setFilter = (filter) => {
    return {
        type: action.SETFILTER,
        payload: filter
    }
}
export const setSort = (sort) => {
    return {
        type: action.SETSORT,
        payload: sort,
    }
}

export const setPokemonByName = (name) => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/pokemons?name=' + name)
        dispatch({
            type: action.SETPOKEMONBYNAME,
            payload: data
        })
    } catch (error) {
        console.log(error.response.data.Error)
    }
}

export const setShowPokemon = (page)  => {
   return{
            type: action.SETSHOWPOKEMON,
            payload: page
        }
}

export const addNewPokemon=(newPokemon)=>{
    return {
        type: action.ADDNEWPOKEMON,
        payload: newPokemon,
    }
}

