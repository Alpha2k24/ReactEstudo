import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import videoSource from "../assets/espaco.mp4";

const sections = [
  { label: "Sobre Mim", time: 1, content: "Sou Gaspar Dias, programador frontend apaixonado por criar experiências digitais imersivas." },
  { label: "Projetos", time: 5, content: "Tenho trabalhado em aplicações com React, animações com Framer Motion, e integrações com APIs modernas." },
  { label: "Habilidades", time: 9, content: "JavaScript, TypeScript, React, TailwindCSS, Node.js, Git, UI/UX e muito mais." },
  { label: "Contato", time: 13, content: "Entre em contato pelo email gaspardias@gmail.com ou via LinkedIn." },
];

export default function PortfolioGasparDias() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [activeSection, setActiveSection] = useState<null | typeof sections[0]>(null);
  const [buttonPositions, setButtonPositions] = useState(
    sections.map(() => ({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    }))
  );

  const goToTime = (seconds: number, section: typeof sections[0]) => {
    const video = videoRef.current;
    if (video) {
      setStarted(true);
      setActiveSection(section);
      video.pause();
      video.currentTime = seconds;
      const handleSeeked = () => {
        video.play().catch((e) => console.error("Erro ao retomar vídeo:", e));
        video.removeEventListener("seeked", handleSeeked);
      };
      video.addEventListener("seeked", handleSeeked);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonPositions((prev) =>
        prev.map(() => ({
          x: Math.random() * 300 - 150,
          y: Math.random() * 300 - 150,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeSection) {
      const timeout = setTimeout(() => setActiveSection(null), 6000);
      return () => clearTimeout(timeout);
    }
  }, [activeSection]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      {/* Video de fundo */}
      <video
        ref={videoRef}
        src={videoSource}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: "brightness(0.4)" }}
      />

      {/* Estrelas flutuantes */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-50 blur-sm z-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
            filter: `blur(${Math.random() * 3}px)`,
          }}
          animate={{
            y: ["0%", "-5%", "5%", "-3%", "0%"],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4 text-center">

        {/* Cabeçalho com animação de estrela caindo */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-10 mt-10 drop-shadow-md">
            Gaspar Dias
            <div className="text-lg md:text-2xl font-light mt-2">Programador Frontend</div>
          </h1>
        </motion.div>

        {/* Botões flutuando com movimento aleatório */}
        <div className="relative w-full h-full pointer-events-none">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => goToTime(section.time, section)}
              animate={{
                x: buttonPositions[index].x,
                y: buttonPositions[index].y,
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
              className={`absolute left-1/2 top-1/2 px-4 py-2 rounded-full shadow-md backdrop-blur-md font-semibold pointer-events-auto
                ${activeSection?.label === section.label
                  ? "bg-gray-100 text-black"
                  : "bg-blue-600 bg-opacity-80 text-white hover:bg-blue-700"}`}
              style={{ transform: "translate(-50%, -50%)", rotate: "0deg" }} // Força o texto a ficar legível
            >
              {section.label}
            </motion.button>
          ))}
        </div>

        {/* Texto informativo com animação de estrela caindo */}
        {activeSection && (
          <motion.div
            className="absolute top-30 md:top-50 left-1/2 transform -translate-x-1/2 max-w-md text-white bg-transparent bg-opacity-60 p-6 rounded-xl shadow-2xl backdrop-blur"
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2
              className="text-2xl font-bold mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {activeSection.label}
            </motion.h2>
            <motion.p
              className="text-md"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {activeSection.content}
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
