'use client'
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import Link from "next/link";
import dynamic from "next/dynamic";
const MathJaxComponent = dynamic(() => import('@/app/components/MathJaxComponent'), { ssr: false });

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

  const [newImageMarioConvolution,setNewImageMarioConvolution] = useState<Array<number[]>>([[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]])
  const [indexImageMarioConvolution,setIndexImageMarioConvolution] = useState<number>(0)

  const [marginLeftPolling,setMarginLeftPolling] = useState<number>(0)
  const [marginTopPolling, setMarginTopPolling] = useState<number>(0)

  const [newImageMarioPolling1,setNewImageMarioPolling1] = useState<Array<number[]>>([[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]])

  const [indexImageMarioPolling,setIndexImageMarioPolling] = useState<number>(0)

  let marioConvolution: Array<number[]> = [
    [255,233,188,143,121,121,121,121,143,166,188,210],
    [255,214,150,86,77,90,103,81,103,131,182,210],
    [236,189,128,100,113,139,152,107,107,113,164,198],
    [217,186,129,123,136,175,201,156,134,140,191,225],
    [198,167,123,149,162,188,201,156,112,89,112,168],
    [217,192,161,168,175,188,201,179,134,112,118,174],
    [236,195,160,150,157,157,152,130,130,130,158,192],
    [233,188,137,118,112,112,108,108,130,148,198,227],
    [188,121,76,68,72,77,72,68,85,99,143,188],
    [176,109,75,88,97,102,102,97,88,75,109,176],
    [186,136,112,109,106,111,111,106,109,112,136,186],
    [219,173,138,118,111,111,111,111,118,138,173,219],
    [231,189,148,107,113,131,131,113,107,148,189,231],
    [224,169,121,110,147,184,184,147,110,121,169,224],
    [198,142,105,126,181,237,237,181,126,105,142,198],
    [198,160,141,179,217,255,255,217,179,141,160,198]];

  let marioImage : Array<string[]> = [
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

  function handlerOnClickSlideMario(avanco: number){
    let newImageMarioAuxiliar = [...newImageMarioConvolution]

    if((marginTopMario == 0 && avanco == -1 && marginLeftMario == 0) || (marginTopMario == 480 && avanco == 1 && marginLeftMario == 352)) {
      console.log('entrou')
      return
    };

    let resultConvolution = calculateConvolutionImageDesenhada(marginLeftMario/32,marginTopMario/32)
    if(avanco==1){
      newImageMarioAuxiliar[indexImageMarioConvolution].push(resultConvolution)
      setNewImageMarioConvolution(newImageMarioAuxiliar)
    }else{
      console.log('entrou2')

      newImageMarioAuxiliar[indexImageMarioConvolution].pop()
      setNewImageMarioConvolution(newImageMarioAuxiliar)

    }

    if (marginLeftMario <= 0 && avanco == -1){
      setMarginLeftMario(352)
      setMarginTopMario(marginTopMario + avanco * 32)
      setIndexImageMarioConvolution(indexImageMarioConvolution - 1)
      return;
    }
    else if (marginLeftMario >= 352 && avanco == 1) {
      setMarginLeftMario(0)
      setMarginTopMario(marginTopMario + avanco * 32)
      setIndexImageMarioConvolution(indexImageMarioConvolution + 1)
      return;
    }else{
      setMarginLeftMario(marginLeftMario + avanco * 32)
      return;
    }


  }
  function calculateMaxPolling(x:number,y:number){
    let max = 0;
    max = Math.max(marioConvolution[y][x],marioConvolution[y][x+1],marioConvolution[y+1][x],marioConvolution[y+1][x+1])
    return max;
  }
  function handlerOnClickSlideMarioPolling(avanco: number){
    console.log(marginLeftPolling,marginTopPolling)
    let newImagePollingAuxiliar = [...newImageMarioPolling1]

    if((marginTopPolling == 0 && avanco == -1 && marginLeftPolling == 0) || (marginTopPolling == 448 && avanco == 1 && marginLeftPolling == 320)) {
      return;
    };

    let resultOfPolling = calculateMaxPolling(marginLeftPolling/32,marginTopPolling/32)
    if(avanco==1){
      newImagePollingAuxiliar[indexImageMarioPolling].push(resultOfPolling)
      setNewImageMarioPolling1(newImagePollingAuxiliar)
    }else{

      newImagePollingAuxiliar[indexImageMarioPolling].pop()
      setNewImageMarioPolling1(newImagePollingAuxiliar)

    }

    if (marginLeftPolling <= 0 && avanco == -1){
      setMarginLeftPolling(320)
      setMarginTopPolling(marginTopPolling + avanco * 64)
      setIndexImageMarioPolling(indexImageMarioPolling - 1)
      return;
    }
    else if (marginLeftPolling >= 320 && avanco == 1) {
      setMarginLeftPolling(0)
      setMarginTopPolling(marginTopPolling + avanco * 64)
      setIndexImageMarioPolling(indexImageMarioPolling + 1)
      return;
    }else{
      setMarginLeftPolling(marginLeftPolling + avanco * 64)
      return;
    }
  }
  function imagemSimples(alinhada:boolean = false){
    let imagemMontada = [[0,1,0],[1,1,1],[0,1,0]];
    return (
    <div className="flex gap-4">
      <div>
        <p>Imagem</p>
        <div className={`flex ${alinhada?'flex-row':'flex-col'}`}>{imagemMontada.map((value) => {
          return <div key={Math.random()} className="flex">{
          value.map((value) => {
            if(value == 0) return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-white text-black text-center">1</span>)
            if(value == 1) return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-cyan-800 text-center">.2</span>)
            // return(<span className="w-1 h-1 bg-black"></span>)
          })}
          </div>
        })}</div>
      </div>
      <div>
        <p>Filtro</p>
        <div className={`flex ${alinhada?'flex-row':'flex-col'}`}>{imagemMontada.map((value) => {
          return <div key={Math.random()} className="flex">{
          value.map((value) => {
            if(value == 0) return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-white text-black text-center">1</span>)
            return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-white text-black text-center">{(value/2).toString().substring(1,3)}</span>)
          })}
          </div>
        })}</div>
      </div>
    </div>
  )
  }
  function imagemDesenhada(cinza:boolean = true,mario:boolean = false){
    if(cinza){
      return marioImage.map((value) => {
        return <div key={Math.random()} className="flex flex-row">{
          value.map((value) => {
            if(value == 'w') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8 bg-white text-black">255</span>)
            if(value == 'r') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8" style={{backgroundColor:"rgb(54,54,54)"}}>54</span>)
            if(value == 'm') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8 bg-amber-900" style={{backgroundColor:"rgb(84,84,84)"}}>84</span>)
            if(value == 'c') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8 bg-orange-200" style={{backgroundColor:"rgb(201,201,201)"}}>201</span>)
            if(value == 'p') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8 bg-black" style={{backgroundColor:"rgb(0,0,0)"}}>0</span>)
            if(value == 'a') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8 bg-blue-800" style={{backgroundColor:"rgb(95,95,95)"}}>95</span>)
            if(value == 'am') return(<span key={Math.random()} className=" border-2 text-center border-black w-8 h-8 bg-yellow-300" style={{backgroundColor:"rgb(236,236,236)"}}>236</span>)
            return(<span key={Math.random()} className="w-1 h-1 bg-black"></span>)
          })}
        </div>
      })
    }
    else{
      if(mario)
      return marioImage.map((value) => {
        return <div key={Math.random()} className="flex flex-row">{
          value.map((value) => {
            if(value == 'w') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-white"></span>)
            if(value == 'r') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6" style={{backgroundColor:"rgb(255,0,0)"}}></span>)
            if(value == 'm') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-amber-900" style={{backgroundColor:"rgb(150,75,0)"}}></span>)
            if(value == 'c') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-orange-200" style={{backgroundColor:"rgb(255,200,180)"}}></span>)
            if(value == 'p') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-black" style={{backgroundColor:"rgb(0,0,0)"}}></span>)
            if(value == 'a') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-blue-800" style={{backgroundColor:"rgb(0,0,255)"}}></span>)
            if(value == 'am') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-yellow-300" style={{backgroundColor:"rgb(255,255,0)"}}></span>)
            return(<span key={Math.random()} className="w-1 h-1 bg-black"></span>)
          })}
        </div>
      })
      else
      return marioImage.map((value) => {
        return <div key={Math.random()} className="flex flex-row">{
          value.map((value) => {
            if(value == 'w') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-white"></span>)
            if(value == 'r') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6" style={{backgroundColor:"rgb(0,255,0)"}}></span>)
            if(value == 'm') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-amber-900" style={{backgroundColor:"rgb(150,75,0)"}}></span>)
            if(value == 'c') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-orange-200" style={{backgroundColor:"rgb(255,200,180)"}}></span>)
            if(value == 'p') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-black" style={{backgroundColor:"rgb(0,0,0)"}}></span>)
            if(value == 'a') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-blue-800" style={{backgroundColor:"rgb(0,0,255)"}}></span>)
            if(value == 'am') return(<span key={Math.random()} className=" border-2 border-black w-6 h-6 bg-yellow-300" style={{backgroundColor:"rgb(255,255,0)"}}></span>)
            return(<span key={Math.random()} className="w-1 h-1 bg-black"></span>)
          })}
        </div>
      })
    }
  
  }
  function renderMarioConvolution(){
    return <div className="flex flex-col ml-8">{newImageMarioConvolution.map((value) => {
      return <div key={Math.random()} className="flex flex-row">{
        value.map((value) => {
          return(<span key={Math.random()} className=" border-2 border-black w-8 h-8 text-center text-black" style={{backgroundColor:`rgb(${value},${value},${value})`}}>{value.toFixed()}</span>)
        })}
      </div>})
      }</div>
  }
  function renderMarioConvolutionList(list:Array<number[]>){
    return <div className="flex flex-col">{list.map((value) => {
      return <div key={Math.random()} className="flex flex-row">{
        value.map((value) => {
          return(<span key={Math.random()} className=" border-2 border-black w-8 h-8 text-center text-black" style={{backgroundColor:`rgb(${value},${value},${value})`}}>{value.toFixed()}</span>)
        })}
      </div>})
      }</div>
  }
  function colorConversor(value:string):number{
    let valuePixel = 0;
    switch(value){
      case 'w':
        valuePixel = 255;
        break;
      case 'r':
        valuePixel = 54;
        break;
      case 'm':
        valuePixel = 84;
        break;
      case 'c':
        valuePixel = 201;
        break;
      case 'p':
        valuePixel = 0;
        break;
      case 'a':
        valuePixel = 95;
        break;
      case 'am':
        valuePixel = 236;
        break;
    }
    return valuePixel;
  }
  function calculateConvolutionImageDesenhada(x:number,y:number){
    
    let GaussianKernel: number = 1/9;
    let result: number = colorConversor(marioImage[y][x])*GaussianKernel + colorConversor(marioImage[y][x+1])*GaussianKernel + colorConversor(marioImage[y][x+2])*GaussianKernel 
                        + colorConversor(marioImage[y+1][x])*GaussianKernel + colorConversor(marioImage[y+1][x+1])*GaussianKernel + colorConversor(marioImage[y+1][x+2])*GaussianKernel + 
                          colorConversor(marioImage[y+2][x])*GaussianKernel + colorConversor(marioImage[y+2][x+1])*GaussianKernel + colorConversor(marioImage[y+2][x+2])*GaussianKernel;
    return result;
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
          Um pouco de teoria para podermos nos contextualizar, mas prometo que depois ficará tudo mais claro e simples de ser entendido.
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

        <p className="indent-14">Agora sabemos que é possível passar funções dentro de vetores. 
        Vamos imaginar que essa função de transformação é, na verdade, outro vetor. 
        A dinâmica se altera levemente, mas continua utilizando processos matemáticos básicos. 
        Quando falamos sobre a convolução de dois vetores, estamos nos referindo a uma operação 
        matemática entre eles que resulta em um terceiro vetor. 
        Podemos visualizar essa operação como um dos vetores deslizando sobre o outro.
         Os valores correspondentes são multiplicados e, em seguida, somados para formar os valores do vetor resultante.</p>
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
            <span className="min-h-fit hover:cursor-pointer text-white" style={{ transform: "rotate(180deg)" }} onClick={() => handlerOnClick(-1)}>{'=>'}</span>
            <span className=" min-h-fit hover:cursor-pointer text-white" onClick={() => handlerOnClick(1)}>{'=>'}</span>
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
          {imagemDesenhada(false, true)}
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <p>
            Para simplificar a explicação deixaremos ela em tons de cinza e atribuirmos um número ao tom.
          </p>
          <div className="flex flex-row w-1/2 justify-between items-center ">
              
            <span className="flex flex-col relative justify-center items-center">
              {imagemDesenhada(true,true)}
              <div className="flex flex-col absolute" style={{left:marginLeftMario,top:marginTopMario}}>
                <div className="flex flex-row">
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                </div>
                <div className="flex flex-row">
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                </div>
                <div className="flex flex-row">
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                  <span className="w-8 h-8 bg-white border-2 border-black text-black text-center opacity-75">1/9</span>
                </div>
              </div>
              <div className="flex flex-row w-24 justify-between">
                <span className="min-h-fit hover:cursor-pointer text-white" style={{ transform: "rotate(180deg)" }} onClick={() => handlerOnClickSlideMario(-1)}>{'=>'}</span>
                <span className=" min-h-fit hover:cursor-pointer text-white" onClick={() => handlerOnClickSlideMario(1)}>{'=>'}</span>
              </div>
            </span>
            {renderMarioConvolution()}
          </div>
          <div>
            <p>
              Parabéns! Você acabou de aplicar uma convolução em uma imagem, mais especificamente, filtro Gaussiano que borra a imagem.
            </p>
          </div>
          <div className="flex">
            <MathJaxComponent formula={'Conv[x,y] = \\sum_{x=0}^{2} \\sum_{y=0}^{2}\\text{vet}[x,y] \\cdot \\text{filt}[x,y]'} />
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
            <p className="indent-14">
              Veremos alguns exemplos muito importantes de filtros que são utilizados em CNNs, como o filtro de Sobel, que é utilizado para detectar bordas em imagens,
              filtro Laplacinano, que é utilizado para detectar pontos de mudança de intensidade de cor, e o filtro de suavização e remoção de ruidos e os detalhes finos, 
              que é utilizado para podermos generalizar melhor uma imagem sem se atentar demais a detalhes (dependendo do peso colocado em x). Para isso clique nos botões a seguir:
            </p>
            <div className="flex flex-row w-3/4 justify-around mt-8">
              <Link href="/sobel" className=" bg-cyan-800 p-4 rounded-md"> Filtro de Sobel </Link>
              <Link href="/laplaciano" className=" bg-cyan-800 p-4 rounded-md"> Filtro Laplaciano</Link>
              <Link href="/suavizacao" className=" bg-cyan-800 p-4 rounded-md"> Filtro de Suavização</Link>

            </div>
        </div>
      </section>
      <section className="flex gap-4 flex-col mt-10">
          <p className="indent-14">
            Após compreendermos a base de convolução e vermos alguns kernels muito utilizados em CNNs, podemos nós aprofundar um pouco mais no assunto, agora te faço uma pergunta para pensar um pouco:
          </p>
          <p className="text-center bg-white text-black p-2 rounded-md">
              Como reconheceremos uma imagem com o que aprendemos?
          </p>
          <p className="indent-14">
              O reconhecemento de imagem utilizando tecnicas de convolução é feito da mesma forma como vimos no caso do mario, onde aplicamos um filtro em uma imagem,
               e assim obtemos uma nova imagem. Com essa nova imagem podemos comparar ela com um outra imagem que já foi vista anteriormente,
               através de combinação de matrizes onde verificamos o quão igual é a gerada com a que já foi vista anteriormente e classificada.
          </p>
          <div className="flex flex-col justify-center items-center">
            {imagemDesenhada(false, false)}

          </div>
          <p className="indent-14">
              A imagem em preto e branco obviamente não ficou 100% igual, porém tem muitas similiariades com a imagem vista do mario (estamos usando a imagem abaixo apenas como um exemplo). Se aplicarmos o mesmo filtro visto anteriormente teriamos um resultado muito parecido. E ao compararmos uma com a outra
              nosso modelo provavelmente diria que é o mario. Principalmente se tivessemos um modelo baseado em bordas ou coisa do tipo. Porém ele estaria equivocado.
          </p>
          <div className="flex flex-row justify-center items-center">
              
              <span className="flex flex-col relative justify-center items-center">
                {imagemDesenhada(true,true)}
              </span>
              <Image width={400} height={400} alt={"mario convolução pronta"} src={"/imgs/convolucao_pronta.png"}></Image>
              <Image width={400} height={400} alt={"mario convolução pronta"} src={"/imgs/convolucao_pronta.png"}></Image>

            </div>


          <p className="indent-14">
          Mas então por que não utilizamos apenas a convolução para identificação de imagem? Ainda é utilizada em casos mais simples, mas isso implicaria em treinar com todas as imagens do mundo para obtermos todos os tipos de variações.
          Por exemplo, no caso de um cachorro, treinar com milhões de fotos de cada raça seria um processo extremamente caro e custoso. Portanto, surgiu a ideia: e se pudéssemos ensinar o computador a aprender a identificar imagens por si mesmo,
          de uma forma mais natural, sem ter que ensinar todas as variações possíveis de um cachorro? E se ensinássemos o que é um cachorro e permitíssemos que ele aprendesse a identificar pontos-chave de um cachorro? Assim, surgiram as Redes Neurais Convolucionais.
          </p>
          <p className="text-center bg-white text-black">
            Agora, vamos complicar um pouco mais!
          </p>
          <p className="indent-14">
          Imagine que temos um quebra-cabeça já montado e queremos que um computador consiga montá-lo. 
          Para isso, precisamos ensinar o computador a montar o quebra-cabeça, ensinando técnicas básicas como encaixar peças de acordo com a cor,
          o formato, e assim por diante. Precisamos de um modelo que consiga aprender essas técnicas. 
          Para isso, inserimos o quebra-cabeça já montado e o desmontado, mostrando que podemos extrair informações das peças separadamente, como cor, formato, desenho e textura. 
          Tudo isso é feito através de filtros convolucionais que são aplicados nas peças, permitindo que o computador aprenda a montar o quebra-cabeça perfeitamente.
          </p>
          <p className = "indent-14">Mas como o computador faz tudo isso? Como ele identifica e junta as peças até formar o quebra-cabeça completo?</p>
          <p className="indent-14">
          Para responder essas perguntas vamos entender como um cérebro se comporta. O cérebro recebe informações de todos os sentidos, e essas informações disparam pequenos estímulos aprendidos ao longo do tempo. 
          Esses estímulos se conectam até que nosso cérebro entenda o que está acontecendo, o que está enxergando ou ouvindo. Isso é uma Rede Neural Natural (não é à toa que o modelo computacional se chama Rede Neural também), 
          onde cada neurônio é equivalente a um ponto minúsculo de informação aprendida. Ao vermos uma imagem, nosso cérebro dispara neurônio por neurônio até juntar todos o seus sinais e busca no conjunto de memórias o que aquele conjunto específico de sinais significa.
          concluindo:   {'"Da última vez que todos esses neurônios foram ativados em conjunto, isso era um cachorro, porém há algo diferente; a cor está meio cinza (cachorro idoso), mas ainda assim, tenho quase certeza. Vou dizer: Isso é um cachorro! "'}.
          A rede neural artificial funciona com o mesmo princípio de armazenamento de informações e checagem de sinais específicos.
          Com esse conhecimento podemos seguir para o proximo passo.
          </p>
          <p className="text-center bg-white text-black">
              Como o processo de extração de dados é feito pela rede neural (em CNNs)?
          </p>
          <p className="indent-14">
            O processo de extração de dados é feito através de camadas de convolução e pooling repeditidas vezes para podermos assim extrair o maximo de informações importantes possiveis,
            existentes dois tipos de pooling principais AVG Polling, Max Polling , que serve para simplificar a informação vinda da camada de convolução para uma unidade escolhida (no caso demonstrado 2x2) onde ele diminuirá a informação para 1/4 do tamanho original.
            Mas ainda mantendo os valores maximos ou medianos da região, podendo assim nós trazer informações importantes da camada anterior diminuindo a quantidade de pesos a serem aprendidos e evitando tambem o overfitting já que o algoritmo não aprenderá a entrada como um todo.
          </p>
          
          <div className="flex relative flex-row w-fit justify-center items-center">
            <div className="flex relative flex-col w-full">
              {renderMarioConvolutionList(marioConvolution)}
              <div className="flex flex-col absolute" style={{marginLeft:marginLeftPolling, marginTop:marginTopPolling}}>
                  <div className="flex flex-row">
                    <span className="w-16 h-16 bg-white border-2 border-black text-black text-center opacity-75">MAX max(x)</span>
                  </div>
                </div>

              <div>
              <div className="flex flex-row w-full justify-between ">
                  <span className="min-h-fit hover:cursor-pointer text-white" style={{ transform: "rotate(180deg)" }} onClick={() => handlerOnClickSlideMarioPolling(-1)}>{'=>'}</span>
                  <span className=" min-h-fit hover:cursor-pointer text-white" onClick={() => handlerOnClickSlideMarioPolling(1)}>{'=>'}</span>
              </div>
              </div>
            </div>
            <div className="ml-8">
              {renderMarioConvolutionList(newImageMarioPolling1)}
            </div>
          </div>
          <p className="indent-14">
              Este processo é repetido diversas vezes conforme o necessario, onde cada algoritmo tem suas peculiaridades alguns escolhem intercalar as camadas até que a camada de polling minima, então tudo depende do objetivo do modelo,arquitetura ou qual a profundidade de rede que estamos trabalhando.
          </p>
          <p className="text-center bg-white text-black">
              Ta mas e as camadas de convolução escolhemos qualquer uma e vamos testando??
          </p>
          <p className="indent-14">
            Graças a Rede Neural não, o proposito de se ter uma rede neural é justamente esse onde nunca saberemos qual o melhor filtro para detectar certas peculiaridades em um conjunto de imagens (obvio que estamos tratando de problemas mais complexos aqui),
            portanto é isso que fazemos quando treinamos uma rede neural, ela aprende a melhor forma de detectar certas características em um conjunto de imagens, e isso é feito através de um processo chamado de backpropagation, onde a rede neural aprende a melhor 
            forma de detectar certas características em um conjunto de imagens, chutando diversos filtros (inclusive um diferente em cada camada) onde segundo ao resultado do modelo no conjunto de testes mudamos os pesos de cada uma das features, podendo elas ser 
            os proprios filtros (forma como lidamos com as bordas e cortes), camadas de polling (tamanho e como se comportam), funções de ativação para atribuição de atributos não linares permitindo a captura de elemento mais complexos entre outros.
          </p>
          <p className="text-center bg-white text-black">
              Como isso se liga a ideia de neurônios e redes neurais?
          </p>
          <p className="indent-14">
            Após o todo o processo de extração de informações, características existe uma camada chamada de camada densa (fully connected) onde é feito a classificação da imagem, onde a rede neural aprendeu a relação entre as características e as classes de interesse,
            evaluando, assim como cada camada polling interage com a entrada inicial assim aprendendo as peculiaridades de cada um das imagens para reconhecimento, assim mesmo que mudassemos a entrada isso não alteraria muita coisa pois a camada densa já teria aprendido
            as peculiaridades de cada objeto, forma, animal entre outras coisas onde pequenas mudanças não causariam grandes impactos, assim como nós aprendemos a reconhecer um cachorro mesmo que ele esteja deitado, de lado, de costas, de frente, com a boca aberta, fechada,
            nos aprendemos um conjunto de informações sobre o mesmo e gravamos isso é um cachorro.
          </p>
          <p className="text-center bg-white text-black">
              Com isso entendido podemos entrar no passo a passo para a criação de uma rede neural para reconhecimento de imagens utilizando convolução. Ou as famosas CNN&apos;s
          </p>
          <ul className="gap-6">
            <li>
              <p className="indent-14">
              Passo 1: Pré-processamento da imagem - Nesta etapa, a imagem de entrada é normalmente redimensionada para um tamanho fixo e convertida para escala de cinza, se necessário. Isso ajuda a reduzir a complexidade computacional e a normalizar os dados.
              </p>
            </li>
            <li>
              <p className="indent-14">
              Passo 2: Extração de características - Nesta etapa, são aplicados filtros convolucionais para extrair características importantes da imagem. 
              Esses filtros podem detectar bordas, texturas e outros padrões relevantes para a tarefa de reconhecimento.
              </p>
            </li>
            <li className="flex flex-col justify-center items-center gap-2">
            <p className="indent-14">
            Passo 3: Pooling - Após a extração de características, é comum aplicar uma operação de pooling para reduzir a dimensionalidade dos dados. 
            O pooling ajuda a preservar as características mais importantes, enquanto reduz o tamanho dos dados e torna o modelo mais eficiente. 
            É como se fosse uma média dos valores de uma região. Os mais conhecidos são o MaxPooling e o AveragePooling. 
            Essa operação pica a imagem em vários pedaços, pegando apenas os pontos mais importantes segundo a técnica escolhida, gerando assim um novo mapa de características.
              </p>
              <p className="text-center bg-white text-black">
              Polling {'=>'} Mapa de Caracteristicas Gerado (Aplicado uma convolução para extrarir informações) {'=>'} Polling {'=>'} Mapa de Caracteristicas Gerado (Aplicado uma convolução para extrarir informações).
              </p>
              <Image width={500} height={200} src={"/imgs/camadas.webp"} alt="Camadas de Extração de Informação"></Image>
            </li>
            <li>
            <p className="indent-14">
            Passo 4: Classificação - Nesta etapa, as características extraídas são fornecidas a uma rede neural densa (fully connected) para realizar a classificação. A rede neural densa é responsável por aprender a relação entre as características e as classes de interesse.
              </p>
            </li>
            <li>
            <p className="indent-14">
            Passo 5: Treinamento e ajuste do modelo - O modelo é treinado usando um conjunto de dados rotulados, onde as imagens são associadas às suas respectivas classes. Durante o treinamento, os pesos do modelo são ajustados para minimizar a diferença entre as previsões do modelo e os rótulos verdadeiros.
              </p>
            </li>
            <li>
            <p className="indent-14">
            Passo 6: Avaliação do modelo - Após o treinamento, o modelo é avaliado usando um conjunto de dados de teste separado. Isso permite verificar a capacidade do modelo de generalizar para novos exemplos e medir sua precisão.
              </p>
            </li>
          </ul>
          <p className="text-center bg-white text-black">
              Mas e como é feito o treinamento destes modelos de CNN&apos;s para reconhecimento de imagens?
          </p>
          <ul className="gap-6">
            <li>
              <p className="indent-14">
                Passo 1: Inicialmente, os valores dos filtros são configurados aleatoriamente.
              </p>
            </li>
            <li>
              <p className="indent-14">
              Passo 2: A imagem de entrada passa pela rede, camada por camada, realizando convoluções, pooling e ativações. A saída final é comparada com a verdade real (label) usando uma função de perda.
              </p>
            </li>
            <li>
              <p className="indent-14">
              Passo 3: A função de perda (como cross-entropy para classificação) mede o quão longe a predição da rede está da verdade real.
              </p>
            </li>
            <li>
              <p className="indent-14">
              Passo 4: O algoritmo de backpropagation calcula os gradientes da função de perda em relação aos pesos dos filtros. Esses gradientes indicam a direção na qual os pesos devem ser ajustados para reduzir a perda.
              </p>
            </li>
            <li>
              <p className="indent-14">
              Passo 5: Usando um algoritmo de otimização (como gradiente descendente), os pesos dos filtros são atualizados. Isso ajusta os filtros de forma a melhorar o desempenho da rede na tarefa de reconhecimento.
              </p>
            </li>
            <li>
              <p className="indent-14">
              Passo 6: O processo é repetido várias vezes (batches) até que a rede atinja um desempenho satisfatório no conjunto de treinamento.
              </p>
            </li>
          </ul>
          <p className="indent-14">
              Aqui neste projeto foco principalmente em assuntos relacionados a CNN&apos;s, mas é importante entender os conceitos de BackPropagation,Cross-Entropy, Algoritmos de Otimização, portanto recomendo a leitura de alguns livros e blogs sendo esses:
              Obs: Só o Livro do Geron ja daria conta de muitas dessas explicações, porém os outros são mais uma leitura rapida.
          </p>
          <p className="indent-14">
            <Link href="https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646">- Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems</Link>
          </p>
          <p className="indent-14">
            <Link href="https://medium.com/@l228104/understanding-cross-entropy-loss-and-its-role-in-classification-problems-d2550f2caad5">- Understanding Cross-Entropy Loss and Its Role in Classification Problems</Link>
          </p>
          <p className="indent-14">
            <Link href="https://medium.com/data-hackers/algoritmos-de-otimiza%C3%A7%C3%A3o-hill-climbing-e-simulated-annealing-3803061f66f0">- Algoritmos de otimização: Hill Climbing e Simulated Annealing</Link>
          </p>
          <p className="indent-14">
            <Link href="https://medium.com/itau-data/redes-neurais-convolucionais-2206a089c715">- Redes neurais convolucionais</Link>
          </p> 
          <p className="indent-14">
            <Link href="https://medium.com/@l228104/understanding-cross-entropy-loss-and-its-role-in-classification-problems-d2550f2caad5">- Understanding Cross-Entropy Loss and Its Role in Classification Problems</Link>
          </p> 
          <p className="indent-14">
              <Link href="https://medium.com/neuronio-br/entendendo-redes-convolucionais-cnns-d10359f21184">- Entendendo Redes Convolucionais (CNNs)</Link>
          </p>
        </section>
    </main>
  );
}
