import * as action from "./action_type";

const initialState = {
    user: {
        id: 0,
        userName: ''
    },
    access: false,
    allPokemon: [],
    pokeShow: [],
    pokefound: [],
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
                allPokemon: [...state.allPokemon, ...payload],
                pokefound: [...state.allPokemon, ...payload]
            }

        case action.SETPOKEFOUND:
            return {
                ...state,
                pokefound: [...state.allPokemon]
            }

        case action.SETFILTER:
            const fil = { ...state.filter, ...payload }
            const orig = state.allPokemon.filter((pok) => {
                if (!fil['Origen'])
                    return pok
                else {
                    if (fil['Origen'].length > 1 || fil['Origen'].length === 0)
                        return pok
                    if (fil['Origen'][0] === 'Oficiales')
                        return pok.ID <= 1008
                    else
                        return pok.ID > 1008
                }
            })
            const typ = orig.filter((pok) => {
                if (!fil['Tipos'])
                    return pok
                else {
                    if (fil['Tipos'].length === 0)
                        return pok
                    if (fil['Tipos'].length > 1)
                        return fil['Tipos'].includes(pok.Tipo[0]) && fil['Tipos'].includes(pok.Tipo[1])
                    else
                        return fil['Tipos'].includes(pok.Tipo[0]) || fil['Tipos'].includes(pok.Tipo[1])
                }
            })
            //atk<60
            const atk = typ.filter((pok) => {
                if (!fil['Ataque'])
                    return pok
                else {
                    if (fil['Ataque'].length === 0)
                        return pok
                    if (fil['Ataque'][0] === '<60')
                        return pok.Ataque < 60
                    else
                        return pok
                }

            })
            return {
                ...state,
                filter: fil,
                pokefound: atk

            }
        case action.SETSORT:
            let tempState = [...state.pokefound]
            const sor = { ...state.sort, ...payload }
            return {
                ...state,
                sort: sor,
                pokefound: tempState.sort((x, y) => {
                    if (sor['Orden por Ataque'] === "Ataque Ascendente") return x.Ataque - y.Ataque
                    if (sor['Orden por Ataque'] === "Ataque Descendente") return y.Ataque - x.Ataque

                    if (sor['Orden Alfabetico'] === "Z-A") return y.Nombre.localeCompare(x.Nombre)
                    if (sor['Orden Alfabetico'] === "A-Z") return x.Nombre.localeCompare(y.Nombre)
                    return 0
                })
            }
        case action.SETPOKEMONBYNAME:
            return {
                ...state,
                pokefound: [payload]
            }
        case action.ADDNEWPOKEMON:
            return {
                ...state,
                pokefound: [...state.pokefound, payload],
                allPokemon: [...state.allPokemon, payload],
            }
        case action.SETSHOWPOKEMON:

            return {
                ...state,
                pokeShow: state.pokefound.slice(12 * (payload - 1), 12 * payload)
            }


        default:
            return state
    }
}