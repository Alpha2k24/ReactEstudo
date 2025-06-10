import { createContext, useReducer } from "react";

const ContextData = createContext({})

const formatNumber = (n) => {
    let newN = 0
    n < 10 ? newN = `0${n}` : newN = n
    return newN
}

const initialValue = { hr: 0, min: 0, sec: 0, start: false, history: [], name: "GhostGrizzly", contador: 1 }

function reducer(state, action) {
    switch (action.type) {
        case "inc":
            if (state.hr >= 23 && state.min >= 59 && state.sec >= 59) {
                return { ...state, hr: 0, min: 0, sec: 0 }
            }
            if (state.min >= 59 && state.sec >= 59) {
                return { ...state, hr: state.hr + 1, min: 0, sec: 0 }
            }
            if (state.sec >= 59) {
                return { ...state, min: state.min + 1, sec: 0 }
            }
            return { ...state, sec: state.sec + 1 }
        case "start":
            if (state.start) {
                return { ...state, start: !state.start, history: [...state.history, `${formatNumber(state.hr)}:${formatNumber(state.min)}:${formatNumber(state.sec)}`] }
            }
            return { ...state, start: !state.start }
        case "reset":
            return { ...initialValue, history: state.history }
        case "rename":
            { const names = ["GhostGrizzly", "Gaspar", "Eude", "Sidias", "Abigail", "Natyo", "Emília", "Nélio", "Ariane", "Adriel"]

            if (state.contador >= names.length - 1) {
                return { ...state, name: names[state.contador], contador: 1 }
            }
            return { ...state, name: names[state.contador], contador: state.contador + 1 } }
        default:
            break;
    }
}

export const DataProvider = ({ children })=>{
    const [state, dispatch] = useReducer(reducer, initialValue)

    return (
        <>
            <ContextData.Provider value={{state, dispatch, formatNumber}}>
                {children}
            </ContextData.Provider>
        </>
    )
}

export default ContextData;