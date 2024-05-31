'use client'
import NextImage  from 'next/image';
import { useState, useRef, ChangeEvent, useEffect } from 'react';

const Home = () => {
    const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
    const [filterIntensity, setFilterIntensity] = useState<number>(0.11);
    const [theta, setTheta] = useState<number>(0);
    const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const magnitudeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const gradientCanvasRef = useRef<HTMLCanvasElement | null>(null);
    let sobelXKernelLatex = `G_x = \begin{bmatrix}
    -1 & 0 & 1 \\
    -2 & 0 & 2 \\
    -1 & 0 & 1
    \end{bmatrix}
    `;
    const sobelXKernel = [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    ];

    const sobelYKernel = [
        -1, -2, -1,
        0, 0, 0,
        1, 2, 1
    ];

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    const originalCanvas = originalCanvasRef.current;
                    const magnitudeCanvas = magnitudeCanvasRef.current;
                    const gradientCanvas = gradientCanvasRef.current;

                    if (originalCanvas && magnitudeCanvas && gradientCanvas) {
                        originalCanvas.width = img.width;
                        originalCanvas.height = img.height;
                        magnitudeCanvas.width = img.width;
                        magnitudeCanvas.height = img.height;
                        gradientCanvas.width = img.width;
                        gradientCanvas.height = img.height;
                        const context = originalCanvas.getContext('2d');
                        if (context) {
                            context.drawImage(img, 0, 0);
                            applySobelFilter(img);
                        }
                    }
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleThetaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTheta = parseFloat(event.target.value);
        setTheta(newTheta);
        if (uploadedImage) {
            applySobelFilter(uploadedImage);
        }
    };

    const applySobelFilter = (image: HTMLImageElement) => {
        const originalCanvas = originalCanvasRef.current;
        const magnitudeCanvas = magnitudeCanvasRef.current;
        const gradientCanvas = gradientCanvasRef.current;
        if (!originalCanvas || !magnitudeCanvas || !gradientCanvas) return;

        const originalContext = originalCanvas.getContext('2d');
        const magnitudeContext = magnitudeCanvas.getContext('2d');
        const gradientContext = gradientCanvas.getContext('2d');
        if (!originalContext || !magnitudeContext || !gradientContext) return;

        originalContext.drawImage(image, 0, 0);
        const imageData = originalContext.getImageData(0, 0, originalCanvas.width, originalCanvas.height);

        const width = imageData.width;
        const height = imageData.height;
        const sobelData = magnitudeContext.createImageData(width, height);
        const gradientData = gradientContext.createImageData(width, height);

        const data = imageData.data;
        const sobelDataArray = sobelData.data;
        const gradientDataArray = gradientData.data;

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
                const [gxR, gxG, gxB] = applyKernel(x, y, sobelXKernel);
                const [gyR, gyG, gyB] = applyKernel(x, y, sobelYKernel);
                const magnitudeIndex = (y * width + x) * 4;
                const gradientIndex = magnitudeIndex;

                // Calculate gradient magnitude
                const magnitudeR = Math.sqrt(gxR * gxR + gyR * gyR);
                const magnitudeG = Math.sqrt(gxG * gxG + gyG * gyG);
                const magnitudeB = Math.sqrt(gxB * gxB + gyB * gyB);

                sobelDataArray[magnitudeIndex] = magnitudeR;
                sobelDataArray[magnitudeIndex + 1] = magnitudeG;
                sobelDataArray[magnitudeIndex + 2] = magnitudeB;
                sobelDataArray[magnitudeIndex + 3] = 255;

                // Calculate directional gradient
                const directionR = gxR * Math.cos(theta) + gyR * Math.sin(theta);
                const directionG = gxG * Math.cos(theta) + gyG * Math.sin(theta);
                const directionB = gxB * Math.cos(theta) + gyB * Math.sin(theta);

                gradientDataArray[gradientIndex] = directionR;
                gradientDataArray[gradientIndex + 1] = directionG;
                gradientDataArray[gradientIndex + 2] = directionB;
                gradientDataArray[gradientIndex + 3] = 255;
            }
        }
        magnitudeContext.putImageData(sobelData, 0, 0);
        gradientContext.putImageData(gradientData, 0, 0);
    };

    useEffect(() => {
        if (uploadedImage) {
            applySobelFilter(uploadedImage);
        }
    }, [theta, uploadedImage]);

    return (
        <div className='p-4'>
            <h1>Image Convolution with Sobel Filter</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <section className='flex w-full justify-around'>
                <div>
                    <h1>Imagem Original</h1>       
                    <canvas ref={originalCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                </div>
                <div>
                    <h1>Gradient Direction (Filtro de Sobel)</h1>       
                    <canvas ref={magnitudeCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                </div>
                <div>
                    <h1>Gradient Direction (Filtro de Sobel directional)</h1>               
                    <label htmlFor="theta">Theta: {theta.toFixed(2)}</label>
                    <input
                        type="number"
                        id="theta"
                        min="0"
                        max={2 * Math.PI}
                        step="0.01"
                        value={theta}
                        onChange={handleThetaChange}
                    />
                    <canvas ref={gradientCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                </div>
            </section>
            <div>
                <p>O filtro de Sobel é um filtro muito utilizado para detecção de bordas onde você pode obter o formato do objeto de após aplicar-se o filtro, no exemplo
                    acima, a imagem original é a imagem sem o filtro, a imagem do meio é a imagem após aplicar o filtro de Sobel e a imagem da direita é a imagem após aplicar o filtro de Sobel com direção,
                    onde a imagem com direção basicamente multiplicamos o "gradiente" aplicado por um theta e assim podemos rotaciona-lo. Se quiser se aprofundar mais nisso, recomendo a leitura de <a className=' bg-cyan-700' href="https://en.wikipedia.org/wiki/Sobel_operator">Sobel Operator</a>.
                </p>
                <p>Seu kernel é a combinação de um kernel vertical e um kernel horizontal via sua resultante</p>
                
                <NextImage width={500} height={40} alt={"Formula Sobel"} src={"/imgs/formula-sobel.png"}></NextImage>
                <NextImage width={500} height={40} alt={"Formula Sobel"} src={"/imgs/resultante.png"}></NextImage>
                
            </div>
        </div>
    );
};

export default Home;
