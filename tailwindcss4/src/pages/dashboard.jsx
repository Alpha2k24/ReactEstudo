import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Dashboard(params) {
    const { id } = useParams()
    const navigate = useNavigate()
    const items = [
        { id: 1, name: "Constance", age: 4 },
        { id: 2, name: "Fiance", age: 20 },
        { id: 3, name: "Loreau", age: 41 },
        { id: 4, name: "Crisna", age: 14 },
    ]

    useEffect(()=>{
        setTimeout(()=>navigate("/"), 1000)
    },[])

    const person = items.find((e) => id == e.id)

    return (
        <div className="bg-gray-500 w-screen h-screen flex flex-col items-center justify-center">
            <div className="border border-gray-500 p-2 px-4 rounded-2xl hover:bg-gray-500 m-3 text-white">{person.name}</div>
        </div>
    )
}