import React, { useEffect } from "react";
import { JSX, useReducer } from "react";

type Tarefa = {
    id: number;
    nome: string;
    estado: string;
    prioridade: string;
    data: string;
    descricao: string;
};

type State = {
    referencia: Tarefa;
    lista: Tarefa[];
    edit: boolean;
    indexEdit: number | null;
};

type Action =
    | { type: "referenciar"; key: keyof Tarefa; payload: string }
    | { type: "adicionar" }
    | { type: "eliminar"; payload: number }
    | { type: "editar"; payload: Partial<Tarefa> }
    | { type: "editarReferenciar"; payload: number }
    | { type: "cancelar" }
    | { type: "carregarLista"; payload: Tarefa[] };


const novaTarefa = (): Tarefa => ({
    id: Date.now(),
    nome: "",
    estado: "",
    prioridade: "",
    data: "",
    descricao: ""
});

const initialValue: State = { referencia: novaTarefa(), lista: [], edit: false, indexEdit: null };

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "referenciar":
            return { ...state, referencia: { ...state.referencia, [action.key]: action.payload } };
        case "adicionar":
            if (state.referencia.nome.trim() === "") {
                alert("O nome da tarefa não pode estar vazio.");
                return state;
            }
            localStorage.setItem("lista", JSON.stringify([...state.lista, state.referencia]));
            return {
                ...state, lista: [...state.lista, state.referencia],
                referencia: novaTarefa(),
            }
        case "eliminar":
            const updatedAfterDelete = state.lista.filter(e => e.id !== action.payload);
            localStorage.setItem("lista", JSON.stringify(updatedAfterDelete));
            return { ...state, lista: updatedAfterDelete };

        case "editar":
            const updatedList = state.lista.map((item) => {
                if (item.id === state.indexEdit) {
                    return { ...item, ...action.payload };
                }
                return item;
            });
            localStorage.setItem("lista", JSON.stringify(updatedList));

            return { ...state, lista: updatedList, referencia: novaTarefa(), edit: false };
        case "editarReferenciar":
            const tarefa = state.lista.find((item) => item.id === action.payload);
            return {
                ...state,
                edit: true,
                indexEdit: action.payload,
                referencia: tarefa || novaTarefa(),
            };
        case "cancelar":
            return { ...state, edit: false, indexEdit: null, referencia: novaTarefa() };
        case "carregarLista":
            return { ...state, lista: action.payload };

        default:
            return state;
    }
}

export default function ToDoList(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialValue);
    
    useEffect(() => {
        const storedList = localStorage.getItem("lista");
        if (storedList) {
            const parsedList: Tarefa[] = JSON.parse(storedList);
            dispatch({ type: "carregarLista", payload: parsedList });
        }
    }, []);


    return (
        <div className='w-full h-screen scroll-smooth grid grid-cols-2 bg-gray-900 gap-4 overflow-y-auto'>
            <div className="flex flex-col items-center gap-4 mt-5">
                <h1 className='text-4xl text-blue-400 text-shadow-2xs text-shadow-blue-50'>To Do List</h1>
                <div className='shadow-2xl shadow-gray-600 w-1/2 rounded-2xl bg-gray-600 flex flex-col items-center p-2 text-2xl'>
                    <form className='flex flex-col gap-4 mt-4'>
                        <input type="text" placeholder="Nome da tarefa" value={state.referencia.nome} className='p-2 rounded-lg bg-transparent placeholder:text-black border border-gray-900' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "nome" })} />
                        <select name="Estado" value={state.referencia.estado} id="" className='p-2 rounded-lg bg-transparent text-black border border-gray-900' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "estado" })}>
                            <option value="">Estado</option>
                            <option value="por fazer">Por Fazer</option>
                            <option value="em andamento">Em Andamento</option>
                            <option value="feito">Feito</option>
                        </select>
                        <select name="Prioridade" value={state.referencia.prioridade} id="" className='p-2 rounded-lg bg-transparent text-black border border-gray-900' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "prioridade" })}>
                            <option value="">Prioridade</option>
                            <option value="nenhuma">Nenhuma</option>
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                        <input type="date" value={state.referencia.data} className='p-2 rounded-lg bg-transparent text-black border border-gray-900' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "data" })} />
                        <textarea placeholder="Descrição" value={state.referencia.descricao} className='p-2 rounded-lg bg-transparent placeholder:text-black border border-gray-900' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "descricao" })}></textarea>
                        <div className="flex flex-col justify-center items-center gap-4">
                            <button type="button" disabled={state.edit} onClick={() => dispatch({ type: "adicionar" })} className='bg-blue-400 p-2 w-40 rounded-4xl cursor-pointer hover:bg-gray-900 hover:text-white'>Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex flex-col mt-5 items-center gap-4">
                <h2 className='text-5xl text-blue-400 text-shadow-2xs text-shadow-blue-50'>Lista de Tarefas</h2>
                <ul className='list-disc'>
                    {state.lista.map((item) => (
                        <>
                            <li key={item.id} className='text-2xl w-full text-white bg-gray-600 p-2 rounded-lg m-2 '>
                                <strong className="font-sans">Nome:</strong> {item.nome} <br />
                                <strong className="font-sans">Estado:</strong> {item.estado} <br />
                                <strong className="font-sans">Prioridade:</strong> {item.prioridade} <br />
                                <strong className="font-sans">Data:</strong> {item.data} <br />
                                <strong className="font-sans">Descrição:</strong> {item.descricao} <br />
                                <button className="ml-2 text-sm bg-red-700 p-1 rounded-2xl italic cursor-pointer" onClick={() => dispatch({ type: "eliminar", payload: item.id })}>Eliminar</button>
                                <button className="ml-2 text-sm bg-blue-700 p-1 rounded-2xl italic cursor-pointer" onClick={() => dispatch({ type: "editarReferenciar", payload: item.id })}>Editar</button>
                            </li>
                            {state.edit && state.indexEdit === item.id && (
                                <form className='flex flex-col w-full gap-4 bg-gray-600 p-4 rounded-lg ml-2'>
                                    <h3 className='text-2xl text-blue-400 text-shadow-2xs text-shadow-blue-50'>Editar Tarefa</h3>
                                    <input type="text" placeholder="Nome da tarefa" value={state.referencia.nome} className='p-2 rounded-lg' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "nome" })} />
                                    <select name="Estado" value={state.referencia.estado} id="" className='p-2 rounded-lg' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "estado" })}>
                                        <option value="">Estado</option>
                                        <option value="por fazer">Por Fazer</option>
                                        <option value="em andamento">Em Andamento</option>
                                        <option value="feito">Feito</option>
                                    </select>
                                    <select name="Prioridade" value={state.referencia.prioridade} id="" className="p-2 rounded-lg" onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "prioridade" })}>
                                        <option value="">Prioridade</option>
                                        <option value="nenhuma">Nenhuma</option>
                                        <option value="baixa">Baixa</option>
                                        <option value="média">Média</option>
                                        <option value="alta">Alta</option>
                                    </select>
                                    <input type="date" value={state.referencia.data} className='p-2 rounded-lg' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "data" })} />
                                    <textarea placeholder="Descrição" value={state.referencia.descricao} className='p-2 rounded-lg' onChange={(e) => dispatch({ type: "referenciar", payload: e.target.value, key: "descricao" })}></textarea>
                                    <button type="button" onClick={() => dispatch({ type: "editar", payload: state.referencia })} className='bg-green-600 w-40 rounded-4xl cursor-pointer'>Salvar</button>
                                    <button type="button" onClick={() => dispatch({ type: "cancelar" })} className='bg-orange-600 w-40 rounded-4xl cursor-pointer'>Cancelar</button>
                                </form>

                            )
                            }
                        </>
                    ))}

                </ul>
            </div>
        </div>
    );
}