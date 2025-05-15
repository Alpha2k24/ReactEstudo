import { Link } from 'react-router-dom';


export default function Pessoas() {
    const items = [
        { id: 1, name: "Constance", age: 4 },
        { id: 2, name: "Fiance", age: 20 },
        { id: 3, name: "Loreau", age: 41 },
        { id: 4, name: "Crisna", age: 14 },
    ]
    return (
        <>
            <Link to={"/relogio"} className="border border-gray-500 p-2 px-4 rounded-2xl hover:bg-gray-500 m-3 text-white" >Relogio</Link>
            {items.map((e) => {
                return <Link key={e.id} className="border border-gray-500 p-2 px-4 rounded-2xl hover:bg-gray-500 m-3 text-white" to={`dashboard/${e.id}`}>{e.name}</Link>
            })}
        </>
    )
}