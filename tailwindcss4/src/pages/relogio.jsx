import { useReducer, useEffect, useRef, useContext } from 'react';
import ContextData from '../context/contextData';
import { Link } from 'react-router-dom';


function Relogio() {
    const {state, dispatch, formatNumber} = useContext(ContextData)

    useEffect(() => {
        if (state.start) {
            const interval = setInterval(() => dispatch({ type: "inc" }), 0.1);
            return () => clearInterval(interval)
        }
    }, [state.start]);

    useEffect(() => {
        if (state.start) {
            const interval = setInterval(() => dispatch({ type: "rename" }), 3000);
            return () => clearInterval(interval)
        }
    }, [state.contador, state.start]);


    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-600 gap-4'>
            <Link to={"/"} className="border border-gray-500 p-2 px-4 rounded-2xl hover:bg-gray-500 m-3 text-white" >Login</Link>
            <h1 className='text-7xl text-blue-400 text-shadow-2xs text-shadow-blue-50'>{state.name}</h1>
            <div className='shadow-2xl rounded-2xl w-5xl bg-white flex flex-col items-center p-4 text-7xl'>
                {formatNumber(state.hr)}:{formatNumber(state.min)}:{formatNumber(state.sec)}
            </div>
            <div className='flex flex-row gap-4'>
                <button onClick={() => dispatch({ type: "start" })} className='bg-green-600 w-40 rounded-4xl cursor-pointer'>{!state.start ? "Iniciar" : "Parar"}</button>
                <button onClick={() => dispatch({ type: "reset" })} className='bg-amber-600 w-40 rounded-4xl cursor-pointer'>Resetar</button>
            </div>
            <div className='shadow-2xl rounded-2xl w-5xl bg-white flex flex-col items-center p-4 text-4xl'>
                {state.history.map(e => e).join(" | ")}
            </div>
        </div>
    );
}

export default Relogio;
