import { useEffect, useState } from 'react';

function Carrocel() {
  const [tempo, setTempo] = useState({ inicio: 0, fim: 3 });

  const v = [1, 2, 3, 4, 5];
  const extended = [...v, ...v]; // duplica o vetor para permitir rotação contínua

  const handle = () => {
    setTempo((prevTempo) => {
      if (prevTempo.fim >= extended.length) {
        return { inicio: 0, fim: 3 };
      }
      return {
        inicio: prevTempo.inicio + 1,
        fim: prevTempo.fim + 1,
      };
    });
  };
  

  const card = extended.slice(tempo.inicio, tempo.fim).map((e, i) => {
    const classe = `${i !== 1
      ? 'bg-amber-200 w-3xs h-24 text-center flex items-center justify-center'
      : 'bg-amber-200 w-3xs h-32 text-center shadow-2xl flex items-center justify-center'
      }`;

    return (
      <span key={tempo.inicio + i} className={classe}>
        {e}
      </span>
    );
  });

  useEffect(() => {
    const interval = setInterval(handle, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row gap-7 items-center justify-center h-screen">
      {card}
    </div>
  );
}

export default Carrocel;
