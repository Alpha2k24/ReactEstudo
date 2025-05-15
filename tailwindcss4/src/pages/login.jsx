import { useState } from 'react';

function Login() {
  const [sign, setSign] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setSign(!sign);
  };


  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-950">
      <h1 className="text-5xl font-serif text-gray-500 mb-6">Login</h1>
      <div className="relative w-4/6 h-5/12 overflow-hidden rounded-xl">
        {/* Container dos formulários */}
        <div className="w-full h-full relative">
          {/* Formulário de Sign Up */}
          <form className={`absolute w-full h-full grid grid-cols-2 bg-gray-300 rounded-xl transform transition-transform duration-700 ease-in-out ${sign ? '-translate-x-full' : 'translate-x-0'
            }`}>
            <div className="bg-gray-500 rounded-xl rounded-br-4xl rounded-tr-4xl flex flex-col justify-center items-center">
              <button
                className="border border-gray-300 p-2 px-4 rounded-2xl hover:bg-gray-300 m-3 w-60"
                type="button"
                onClick={handleClick}
              >
                Sign in
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <input className="border border-gray-500 w-xs p-2 rounded-2xl m-2" type="text" placeholder="Nome" />
              <input className="border border-gray-500 w-xs p-2 rounded-2xl m-2" type="email" placeholder="Email" />
              <input className="border border-gray-500 w-xs p-2 rounded-2xl m-2" type="password" placeholder="Senha" />
              <button className="border border-gray-500 p-2 px-4 rounded-2xl hover:bg-gray-500 m-3" type="button">
                Sign up
              </button>
            </div>
          </form>

          {/* Formulário de Sign In */}
          <form className={`absolute w-full h-full grid grid-cols-2 bg-gray-300 rounded-xl transform transition-transform duration-700 ease-in-out ${sign ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <input className="border border-gray-500 w-xs p-2 rounded-2xl m-2" type="email" placeholder="Email" />
              <input className="border border-gray-500 w-xs p-2 rounded-2xl m-2" type="password" placeholder="Senha" />
              <button className="border border-gray-500 p-2 px-4 rounded-2xl hover:bg-gray-500 m-3" type="button">
                Sign in
              </button>
            </div>
            <div className="bg-gray-500 rounded-xl rounded-bl-4xl rounded-tl-4xl flex flex-col justify-center items-center">
              <button
                className="border border-gray-300 p-2 px-4 rounded-2xl hover:bg-gray-300 m-3 w-60"
                type="button"
                onClick={handleClick}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
