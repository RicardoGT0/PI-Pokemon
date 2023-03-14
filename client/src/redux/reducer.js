import * as action from "./action_type";

const initialState = {
    user: {
        id: 8,
        userName: 'pe@hot.com'
    },
    access: true,
    allPokemon: [],
    pokeShow: [],
    filter: {},
    sort: {}
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case action.ACCESSON:
            return {
                ...state,
                user: payload,
                access: true
            }

        case action.ACCESSOFF:
            return {
                ...state,
                user: null,
                access: false,
                allPokemon: [],
                pokeShow: [],
                filter: {},
                sort: {},
            }

        case action.GETALLPOKES:
            return {
                ...state,
                allPokemon: [...state.allPokemon, ...payload]
            }
        case action.SETFILTER:
            return {
                ...state,
                filter: { ...state.filter, ...payload },
                pokeShow: state.allPokemon
                    .filter((pok) => {
                        if (!payload['Origen'])
                            return pok
                        else {
                            if (payload['Origen'].length > 1 || payload['Origen'].length === 0)
                                return pok
                            if (payload['Origen'][0] === 'Oficiales')
                                return pok.ID <= 1008
                            else
                                return pok.ID > 1008
                        }
                    })
                    .filter((pok) => {
                        if (!payload['Tipos'])
                            return pok
                        else {
                            if (payload['Tipos'].length === 0)
                                return pok
                            if (payload['Tipos'].length > 1)
                                return payload['Tipos'].includes(pok.Tipo[0]) && payload['Tipos'].includes(pok.Tipo[1])
                            else
                                return payload['Tipos'].includes(pok.Tipo[0]) || payload['Tipos'].includes(pok.Tipo[1])
                        }
                    })
            }
        case action.SETSORT:
            let tempState = [...state.pokeShow]
            return {
                ...state,
                sort: { ...state.sort, ...payload },
                pokeShow: tempState.sort((x, y) => {
                    if (payload['Orden Alfabetico'] && payload['Orden Alfabetico'].length > 0) {
                        if (payload['Orden Alfabetico'][0] === "Z-A") return y.Nombre.localeCompare(x.Nombre)
                        if (payload['Orden Alfabetico'][0] === "A-Z") return x.Nombre.localeCompare(y.Nombre)
                    }
                    if (payload['Orden por Ataque'] && payload['Orden por Ataque'].length > 0) {
                        if (payload['Orden por Ataque'][0] === "Ataque Ascendente") return x.Ataque - y.Ataque
                        if (payload['Orden por Ataque'][0] === "Ataque Descendente") return y.Ataque - x.Ataque
                    }
                    return 0
                })
            }
        case action.SETPOKEMONBYNAME:
            return {
                ...state,
                pokeShow: [payload]
            }
        case action.ADDNEWPOKEMON:
            return {
                ...state,
                pokeShow: [...state.pokeShow, payload],
                allPokemon: [...state.allPokemon, payload],
            }
        case action.SETSHOWPOKEMON:
            return {
                ...state,
                pokeShow: state.allPokemon.slice(12 * (payload - 1), 12 * payload)
            }


        default:
            return state
    }
}