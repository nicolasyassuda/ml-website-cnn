'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {


  const [fx1, setFx1] = useState<number>(0);
  const [fx2, setFx2] = useState<number>(0);
  const [fx3, setFx3] = useState<number>(0);
  const [fxLoading2, setFxLoading2] = useState<boolean>(false);

  const [gx1, setGx1] = useState<number>(0);
  const [gx2, setGx2] = useState<number>(0);
  const [gx3, setGx3] = useState<number>(0);
  const [gxLoading2, setGxLoading2] = useState<boolean>(false);

  const [marginLeft, setMarginLeft] = useState<number>(-256)
  const [marginLeftMario, setMarginLeftMario] = useState<number>(0)
  const [marginTopMario, setMarginTopMario] = useState<number>(0)


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

  function handlerOnClickSlideMario(value: number){
    if (marginLeftMario <= 0 && value == -1 && marginTopMario > 0){
      setMarginLeftMario(0)
      setMarginTopMario(marginTopMario + value * 32)
      return;
    }
    else if (marginLeftMario >= 352 && value == 1 && marginTopMario < 2000) {
      setMarginLeftMario(0)
      setMarginTopMario(marginTopMario + value * 32)
      return;
    }else{
      return;
    }

    setMarginLeftMario(marginLeftMario + value * 32)
  }
  function imagemSimples(alinhada:boolean = false){
    let imagemMontada = [[0,1,0],[1,1,1],[0,1,0]];
    return (
    <div className="flex gap-4">
      <div>
        <p>Imagem</p>
        <div className={`flex ${alinhada?'flex-row':'flex-col'}`}>{imagemMontada.map((value) => {
          return <div className="flex">{
          value.map((value) => {
            if(value == 0) return(<span className=" border-2 border-black w-6 h-6 bg-white text-black text-center">1</span>)
            if(value == 1) return(<span className=" border-2 border-black w-6 h-6 bg-cyan-800 text-center">.2</span>)
            // return(<span className="w-1 h-1 bg-black"></span>)
          })}
          </div>
        })}</div>
      </div>
      <div>
        <p>Filtro</p>
        <div className={`flex ${alinhada?'flex-row':'flex-col'}`}>{imagemMontada.map((value) => {
          return <div className="flex">{
          value.map((value) => {
            if(value == 0) return(<span className=" border-2 border-black w-6 h-6 bg-white text-black text-center">1</span>)
            return(<span className=" border-2 border-black w-6 h-6 bg-white text-black text-center">{(value/2).toString().substring(1,3)}</span>)
          })}
          </div>
        })}</div>
      </div>
    </div>
  )
  }
  function imagemDesenhada(n:number = 0,full:boolean = true, cinza:boolean = true){
    let marioImage = [
      ['w','w','w','w','w','w','w','w','w','w','w','w','w','w'],
      ['w','w','w','w','r','r','r','r','r','r','w','w','w','w'],
      ['w','w','w','r','r','r','r','r','r','r','r','r','r','w'],
      ['w','w','w','m','m','m','c','c','c','p','c','w','w','w'],
      ['w','w','m','c','m','c','c','c','c','p','c','c','c','w'],
      ['w','w','m','c','m','m','c','c','c','c','p','c','c','c'],
      ['w','w','m','m','c','c','c','c','c','p','p','p','p','w'],
      ['w','w','w','w','c','c','c','c','c','c','c','c','w','w'],
      ['w','w','w','r','r','a','r','r','r','r','w','w','w','w'],
      ['w','w','r','r','r','a','r','r','a','r','r','r','w','w'],
      ['w','r','r','r','r','a','a','a','a','r','r','r','r','w'],
      ['w','c','c','r','a','am','a','a','am','a','r','c','c','w'],
      ['w','c','c','c','a','a','a','a','a','a','c','c','c','w'],
      ['w','c','c','a','a','a','a','a','a','a','a','c','c','w'],
      ['w','w','w','a','a','a','w','w','a','a','a','w','w','w'],
      ['w','w','m','m','m','w','w','w','w','m','m','m','w','w'],
      ['w','m','m','m','m','w','w','w','w','m','m','m','m','w'],
      ['w','w','w','w','w','w','w','w','w','w','w','w','w','w'],
    ]
    if(full){
      if(cinza){
        return marioImage.map((value) => {
          return <div className="flex flex-row">{
            value.map((value) => {
              if(value == 'w') return(<span className=" border-2 text-center border-black w-8 h-8 bg-white text-black">255</span>)
              if(value == 'r') return(<span className=" border-2 text-center border-black w-8 h-8" style={{backgroundColor:"rgb(54,54,54)"}}>54</span>)
              if(value == 'm') return(<span className=" border-2 text-center border-black w-8 h-8 bg-amber-900" style={{backgroundColor:"rgb(84,84,84)"}}>84</span>)
              if(value == 'c') return(<span className=" border-2 text-center border-black w-8 h-8 bg-orange-200" style={{backgroundColor:"rgb(201,201,201)"}}>201</span>)
              if(value == 'p') return(<span className=" border-2 text-center border-black w-8 h-8 bg-black" style={{backgroundColor:"rgb(0,0,0)"}}>0</span>)
              if(value == 'a') return(<span className=" border-2 text-center border-black w-8 h-8 bg-blue-800" style={{backgroundColor:"rgb(95,95,95)"}}>95</span>)
              if(value == 'am') return(<span className=" border-2 text-center border-black w-8 h-8 bg-yellow-300" style={{backgroundColor:"rgb(236,236,236)"}}>236</span>)
              return(<span className="w-1 h-1 bg-black"></span>)
            })}
          </div>
        })
      }
      else{
        return marioImage.map((value) => {
          return <div className="flex flex-row">{
            value.map((value) => {
              if(value == 'w') return(<span className=" border-2 border-black w-6 h-6 bg-white"></span>)
              if(value == 'r') return(<span className=" border-2 border-black w-6 h-6" style={{backgroundColor:"rgb(255,0,0)"}}></span>)
              if(value == 'm') return(<span className=" border-2 border-black w-6 h-6 bg-amber-900" style={{backgroundColor:"rgb(150,75,0)"}}></span>)
              if(value == 'c') return(<span className=" border-2 border-black w-6 h-6 bg-orange-200" style={{backgroundColor:"rgb(255,200,180)"}}></span>)
              if(value == 'p') return(<span className=" border-2 border-black w-6 h-6 bg-black" style={{backgroundColor:"rgb(0,0,0)"}}></span>)
              if(value == 'a') return(<span className=" border-2 border-black w-6 h-6 bg-blue-800" style={{backgroundColor:"rgb(0,0,255)"}}></span>)
              if(value == 'am') return(<span className=" border-2 border-black w-6 h-6 bg-yellow-300" style={{backgroundColor:"rgb(255,255,0)"}}></span>)
              return(<span className="w-1 h-1 bg-black"></span>)
            })}
          </div>
        })
      }

      
    }
    else{
      return marioImage[n].map((value) => {
        if(value == 'w') return(<span className=" border-2 border-black w-6 h-6 bg-white"></span>)
        if(value == 'r') return(<span className=" border-2 border-black w-6 h-6 bg-red-500"></span>)
        if(value == 'm') return(<span className=" border-2 border-black w-6 h-6 bg-amber-900"></span>)
        if(value == 'c') return(<span className=" border-2 border-black w-6 h-6 bg-rose-300"></span>)
        if(value == 'p') return(<span className=" border-2 border-black w-6 h-6 bg-black"></span>)
        if(value == 'a') return(<span className=" border-2 border-black w-6 h-6 bg-blue-800"></span>)
        return(<span className="w-1 h-1 bg-black"></span>)
      })
    }
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
            {gxLoading2 ?
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
          <div className="flex flex-row w-24 justify-between">
            <span className="min-h-fit hover:cursor-pointer" style={{ transform: "rotate(180deg)" }} onClick={() => handlerOnClick(-1)}>{'=>'}</span>
            <span className=" min-h-fit hover:cursor-pointer" onClick={() => handlerOnClick(1)}>{'=>'}</span>
          </div>
          <p>{'='}</p>
          <div className="flex flex-row text-black text-center">
            <div className="h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2">
              {fx1*gx3}
            </div>
            <div className={`h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2 ${marginLeft<-128?'invisible':''}`}  >
              {fx1*gx2 + fx2*gx3}
            </div>
            <div className={`h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2 ${marginLeft<0?'invisible':''}`}>
              {fx1*gx1 + fx2*gx2 + fx3*gx3}
            </div>
            <div className={`h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2 ${marginLeft<128?'invisible':''}`}>
              {gx1*fx2+fx3*gx2}
            </div>
            <div className={`h-6 w-16 bg-white text-black text-center border-gray-400 border-r-2 ${marginLeft<256?'invisible':''}`}>
              {fx3*gx1}
            </div>
          </div>
        </div>
      </section>
      <section className="flex gap-4 flex-col mt-10">
        <p className=" indent-14"> 
          A partir disto podemos entender melhor como isso é feito em imagens, se você pensar que na verdade  uma imagem é um vetor de pixels, 
          e que cada pixel é um valor de intensidade de cor, podemos aplicar a convolução de 2 vetores nessa imagem, onde um vetor é a imagem 
          e o outro é o filtro, que é uma matriz de valores que irá multiplicar os valores da imagem, e assim obteremos uma nova imagem com 
          as características que o filtro está procurando. 
        </p>
        <div className="flex w-full justify-center">
              {imagemSimples()} 
        </div>
        <p className=" indent-14">
            Transformando para 2d para melhor compreenção, podemos ver que a imagem é uma matriz de valores, e o filtro também é uma matriz de valores,
        </p>
        <div className="flex w-full justify-center">
          {imagemSimples(true)} 
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <p>
            E se a gente aplicasse a convolução de um filtro em uma imagem?
          </p>
          {imagemDesenhada(1,true,false)}
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <p>
            Para simplificar a explicação deixaremos ela em tons de cinza e atribuirmos um numero ao tom.
          </p>
          <div className="flex flex-col w-full justify-center items-center ">

            <span className="relative">
              {imagemDesenhada(1,true,true)}
              <div className="flex flex-col absolute" style={{left:marginLeftMario,top:marginTopMario}}>
                <div className="flex flex-row">
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">0</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">1</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">0</span>
                </div>
                <div className="flex flex-row">
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">1</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">0</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">1</span>
                </div>
                <div className="flex flex-row">
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">0</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">1</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center">0</span>
                </div>
              </div>
            </span>
            <div className="flex flex-row w-24 justify-between">
            <span className="min-h-fit hover:cursor-pointer" style={{ transform: "rotate(180deg)" }} onClick={() => handlerOnClickSlideMario(-1)}>{'=>'}</span>
            <span className=" min-h-fit hover:cursor-pointer" onClick={() => handlerOnClickSlideMario(1)}>{'=>'}</span>
          </div>
          </div>

        </div>
      </section>
    </main>
  );
}
