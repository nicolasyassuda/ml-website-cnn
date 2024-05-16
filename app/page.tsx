'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [fx, setFx] = useState<number>(0);
  const [gx, setGx] = useState<number>(0);
  const [fxLoading, setFxLoading] = useState<boolean>(false);
  const [gxLoading, setGxLoading] = useState<boolean>(false);

  const [fx1, setFx1] = useState<number>(0);
  const [fx2, setFx2] = useState<number>(0);
  const [fx3, setFx3] = useState<number>(0);
  const [fxLoading2, setFxLoading2] = useState<boolean>(false);

  const [gx1, setGx1] = useState<number>(0);
  const [gx2, setGx2] = useState<number>(0);
  const [gx3, setGx3] = useState<number>(0);
  const [gxLoading2, setGxLoading2] = useState<boolean>(false);

  const [marginLeft, setMarginLeft] = useState<number>(0)
  function fxFunct(value: number) {
    if (!value) return 0;
    return value;
  }
  function gxFunct(value: number) {
    if (!value) return 0;
    return value * value;
  }
  function calculateFunctions(value: string, funct: (value: number) => number, set: (value: number) => void, setLoading: (value: boolean) => void) {
    setLoading(true)
    setTimeout(() => (setLoading(false), set(funct(parseFloat(value)))), 1000)
  }

  function handlerOnClick(value: number) {
    if (marginLeft <= -256 && value == -1) return;
    if (marginLeft >= 256 && value == 1) return;

    setMarginLeft(marginLeft + value * 128)
  }
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 pl-40 pr-40">
      <section>
        <h1 className=" font-bold text-xl">Introdução</h1>
        <p className=" indent-14 leading-relaxed">
          Neste site, exploraremos as Redes Neurais Convolucionais (CNNs),
          que são amplamente utilizadas para análise de imagens em diversas aplicações,
          como detecção de objetos e classificação de imagens. Para compreender completamente as CNNs,
          é essencial primeiro entender o conceito de convoluções. Vamos começar discutindo o que são filtros e
          como eles são aplicados nas imagens para extrair características importantes. Inicialmente parecerá um pouco
          complexo entender o processo de convolução, mas com a prática e a exploração de exemplos, você se sentirá mais
          confortável com o assunto.
        </p>
      </section>
      <section className="flex gap-4 flex-col">
        <h1 className=" font-bold text-xl">Convolução</h1>
        <p className="indent-14 leading-relaxed">
          Um pouco de teoria para podermos nós contextualizar mas prometo que depois ficará tudo mais claro e simples de ser entendido.
          Primeiro imagine 2 funções f(x) e g(x), a convolução entre essas duas funções é dada por:
        </p>
        <p className=" text-center">
          f(x)= x
          <br />
          g(x)= x²
        </p>
        <p className="indent-14">
          Imagine que a que cada função é um bloquinho onde nós entramos com um valor e saímos com outro valor, por exemplo:
        </p>

        <div className="flex flex-row w-full justify-center items-center mb-6">
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center" onChange={(e) => calculateFunctions(e.target.value, fxFunct, setFx, setFxLoading)}></input>
          <p>{'=>'}</p>
          <div className="flex items-center justify-center w-24 h-24 border-2">
            {fxLoading ?
              <ClipLoader color="#fff" loading={fxLoading} size={24} />
              : <p>f(x)</p>}
          </div>
          <p>{'=>'}</p>
          <div className="h-6 w-16 bg-white text-black text-center">
            {fx}
          </div>
        </div>

        <div className="flex flex-row w-full justify-center items-center">
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center" onChange={(e) => calculateFunctions(e.target.value, gxFunct, setGx, setGxLoading)}></input>
          <p>{'=>'}</p>
          <div className="flex items-center justify-center w-24 h-24 border-2">
            {gxLoading ?
              <ClipLoader color="#fff" loading={gxLoading} size={24} />
              : <p>g(x)</p>}
          </div>
          <p>{'=>'}</p>
          <div className="h-6 min-w-16 w-fit bg-white text-black text-center">
            {gx}
          </div>
        </div>

        <p className="indent-14">E se a gente entrasse com um vetor nessa função? Por exemplo:</p>
        <div className="flex flex-row w-full justify-center items-center">
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center border-r-2" onChange={(e) => calculateFunctions(e.target.value, fxFunct, setFx1, setFxLoading2)}></input>
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center border-r-2" onChange={(e) => calculateFunctions(e.target.value, fxFunct, setFx2, setFxLoading2)}></input>
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center" onChange={(e) => calculateFunctions(e.target.value, fxFunct, setFx3, setFxLoading2)}></input>

          <p>{'=>'}</p>
          <div className="flex items-center justify-center w-24 h-24 border-2">
            {fxLoading2 ?
              <ClipLoader color="#fff" loading={fxLoading2} size={24} />
              : <p>f(x)</p>}
          </div>
          <p>{'=>'}</p>
          <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
            {fx1}
          </div>
          <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
            {fx2}
          </div>
          <div className="h-6 w-16 bg-white text-black text-center">
            {fx3}
          </div>
        </div>

        <div className="flex flex-row w-full justify-center items-center">
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center border-r-2" onChange={(e) => calculateFunctions(e.target.value, gxFunct, setGx1, setGxLoading2)}></input>
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center border-r-2" onChange={(e) => calculateFunctions(e.target.value, gxFunct, setGx2, setGxLoading2)}></input>
          <input id="fx_input" type="number" placeholder="0" max={10} min={-10} className="h-6 w-16 text-black text-center" onChange={(e) => calculateFunctions(e.target.value, gxFunct, setGx3, setGxLoading2)}></input>

          <p>{'=>'}</p>
          <div className="flex items-center justify-center w-24 h-24 border-2">
            {gxLoading ?
              <ClipLoader color="#fff" loading={gxLoading2} size={24} />
              : <p>g(x)</p>}
          </div>
          <p>{'=>'}</p>
          <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
            {gx1}
          </div>
          <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
            {gx2}
          </div>
          <div className="h-6 w-16 bg-white text-black text-center">
            {gx3}
          </div>
        </div>

        <p className="indent-14"> Quando falamos que há a convolução de 2 vetores é só imaginarmos esses 2 vetores deslizando um abaixo de outro os valores que tiverem correspondetes serão multiplicados:</p>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex flex-row">
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {fx1}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {fx2}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center">
              {fx3}
            </div>
          </div>
          <div className="flex">
            <p className="h-6 w-16 text-center">{marginLeft <= 0 ? '*' : ''}</p>
            <p className="h-6 w-16 text-center">{marginLeft >= -128 && marginLeft <= 128 ? '*' : ''}</p>
            <p className="h-6 w-16 text-center">{marginLeft >= 0 ? '*' : ''}</p>
          </div>
          <div className=" slide flex flex-row" style={{ marginLeft: `${marginLeft}px` }}>
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {gx1}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {gx2}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center">
              {gx3}
            </div>
          </div>
          <div className="flex">
            <button className="min-h-fit" style={{ transform: "rotate(180deg)" }} onClick={() => handlerOnClick(-1)}>{'=>'}</button>
            <button className=" min-h-fit" onClick={() => handlerOnClick(1)}>{'=>'}</button>
          </div>
          <p>{'='}</p>
          <div className="flex flex-row text-black text-center">
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {fx1*gx3}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {fx1*gx2 + fx2*gx3}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {fx1*gx1 + fx2*gx2 + fx3*gx3}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {gx1*fx2+fx3*gx2}
            </div>
            <div className="h-6 w-16 bg-white text-black text-center">
              {fx3*gx1}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
