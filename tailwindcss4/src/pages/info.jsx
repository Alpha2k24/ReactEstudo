import { Link } from "react-router-dom";

export default function Info(params) {
    return (
        <div className="bg-gray-500 w-screen h-screen flex flex-col items-center justify-center">
            <Link className="text-9xl" to={"/"}>Not Found</Link>
        </div>
    )
}