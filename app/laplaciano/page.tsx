'use client'
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import NextImage  from 'next/image';

const Home = () => {
    const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
    const [lambda, setLambda] = useState<number>(0.5);
    const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    const originalCanvas = originalCanvasRef.current;
                    const resultCanvas = resultCanvasRef.current;

                    if (originalCanvas && resultCanvas) {
                        originalCanvas.width = img.width;
                        originalCanvas.height = img.height;
                        resultCanvas.width = img.width;
                        resultCanvas.height = img.height;
                        const context = originalCanvas.getContext('2d');
                        if (context) {
                            context.drawImage(img, 0, 0);
                            applyLaplacianFilter(img);
                        }
                    }
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLambdaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newLambda = parseFloat(event.target.value);
        setLambda(newLambda);
        if (uploadedImage) {
            applyLaplacianFilter(uploadedImage);
        }
    };

    const applyLaplacianFilter = (image: HTMLImageElement) => {
        const originalCanvas = originalCanvasRef.current;
        const resultCanvas = resultCanvasRef.current;
        if (!originalCanvas || !resultCanvas) return;

        const originalContext = originalCanvas.getContext('2d');
        const resultContext = resultCanvas.getContext('2d');
        if (!originalContext || !resultContext) return;

        originalContext.drawImage(image, 0, 0);
        const imageData = originalContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height);

        const width = imageData.width;
        const height = imageData.height;
        const resultData = resultContext.createImageData(width, height);

        const data = imageData.data;
        const resultDataArray = resultData.data;

        const laplacianKernel = [
            0,  1,  0,
            1, -4,  1,
            0,  1,  0
        ];
        
        const applyKernel = (x: number, y: number, kernel: number[]) => {
            let r = 0, g = 0, b = 0;
            const halfSide = Math.floor(Math.sqrt(kernel.length) / 2);
            for (let ky = -halfSide; ky <= halfSide; ky++) {
                for (let kx = -halfSide; kx <= halfSide; kx++) {
                    const scx = x + kx;
                    const scy = y + ky;
                    if (scx >= 0 && scx < width && scy >= 0 && scy < height) {
                        const srcOffset = (scy * width + scx) * 4;
                        const weight = kernel[(ky + halfSide) * 3 + (kx + halfSide)];
                        r += data[srcOffset] * weight;
                        g += data[srcOffset + 1] * weight;
                        b += data[srcOffset + 2] * weight;
                    }
                }
            }
            return [r, g, b];
        };

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const [laplacianR, laplacianG, laplacianB] = applyKernel(x, y, laplacianKernel);
                const originalIndex = (y * width + x) * 4;

                // Combine original image with Laplacian
                const combinedR = lambda * laplacianR + (1 - lambda) * data[originalIndex];
                const combinedG = lambda * laplacianG + (1 - lambda) * data[originalIndex + 1];
                const combinedB = lambda * laplacianB + (1 - lambda) * data[originalIndex + 2];

                resultDataArray[originalIndex] = combinedR;
                resultDataArray[originalIndex + 1] = combinedG;
                resultDataArray[originalIndex + 2] = combinedB;
                resultDataArray[originalIndex + 3] = data[originalIndex + 3]; // Preserve alpha channel
            }
        }
        resultContext.putImageData(resultData, 0, 0);
    };

    useEffect(() => {
        if (uploadedImage) {
            applyLaplacianFilter(uploadedImage);
        }
    }, [lambda, uploadedImage]);

    return (
        <div className='p-4'>
            <h1>Image Convolution with Laplacian Filter</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div>

            </div>
            <div className='flex w-full justify-around'>
                <canvas ref={originalCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                <div>
                 <h1>Filtro Laplaciano com alteração de intensidade</h1>
                 <label htmlFor="lambda">Lambda: {lambda.toFixed(2)}</label>
                <input
                    type="range"
                    id="lambda"
                    min="0"
                    max="1"
                    step="0.01"
                    value={lambda}
                    onChange={handleLambdaChange}
                />
                 <canvas ref={resultCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                </div>
            </div>
            <div>
                <p>
                    O filtro Laplaciano é um tipo de filtro de imagem utilizado principalmente para realçar bordas em uma imagem. 
                    Ele é baseado na segunda derivada da imagem, identificando regiões onde a intensidade do pixel muda rapidamente, 
                    o que corresponde às bordas e linhas na imagem. Este filtro é especialmente útil em técnicas de detecção de bordas, 
                    pois acentua as áreas de transição entre diferentes níveis de intensidade. Porém ele é sensível a ruídos, devemos 
                    tomar cuidado ao aplicá-lo em imagens com ruídos, nestes casos é recomendado aplicação de um filtro de suavização
                    como um filtro Gaussiano. Para saber mais sobre o filtro Laplaciano, acesse o link: <a className='bg-cyan-800' href="https://en.wikipedia.org/wiki/Discrete_Laplace_operator">Laplace Operator</a>
                </p>
                <p>Este é o kernel laplaciano:</p>
                <NextImage width={200} height={40} alt={"Formula Sobel"} src={"/imgs/laplaciano.png"}></NextImage>
            </div>
        </div>
    );
};

export default Home;
