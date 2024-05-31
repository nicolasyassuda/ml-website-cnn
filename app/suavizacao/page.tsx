'use client'
import { useState, useRef, ChangeEvent, useEffect } from 'react';

const Home = () => {
    const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
    const [filterIntensity, setFilterIntensity] = useState<number>(0.11);
    const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const processedCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const animationFrameRef = useRef<number | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    const originalCanvas = originalCanvasRef.current;
                    const processedCanvas = processedCanvasRef.current;

                    if (originalCanvas && processedCanvas) {
                        const originalContext = originalCanvas.getContext('2d');
                        const processedContext = processedCanvas.getContext('2d');

                        if (originalContext && processedContext) {
                            originalCanvas.width = img.width;
                            originalCanvas.height = img.height;
                            originalContext.drawImage(img, 0, 0);
                            applyConvolutionFilter(img, filterIntensity);
                            processedCanvas.width = img.width;
                            processedCanvas.height = img.height;
                            processedContext.drawImage(img, 0, 0);
                        }
                    }
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIntensityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newIntensity = parseFloat(event.target.value);
        setFilterIntensity(newIntensity);
    };

    const applyConvolutionFilter = (image: HTMLImageElement, intensity: number) => {
        const canvas = processedCanvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const pixels = imageData.data;
        const imageWidth = imageData.width;
        const imageHeight = imageData.height;
        const result = context.createImageData(imageWidth, imageHeight);
        const kernel = 
          [ (1 - intensity), (1 - intensity), (1 - intensity), 
            (1 - intensity), intensity, (1 - intensity),
            (1 - intensity), (1 - intensity), (1 - intensity) ]; // Exemplo de kernel modificado pela intensidade

        const kernelSize = Math.round(Math.sqrt(kernel.length));
        const kernelRadius = Math.floor(kernelSize / 2);
        const alphaFactor = 1;

        for (let y = 0; y < imageHeight; y++) {
            for (let x = 0; x < imageWidth; x++) {
                const sourceY = y;
                const sourceX = x;
                const destOffset = (y * imageWidth + x) * 4;
                let red = 0, green = 0, blue = 0, alpha = 0;
                for (let kernelY = 0; kernelY < kernelSize; kernelY++) {
                    for (let kernelX = 0; kernelX < kernelSize; kernelX++) {
                        const sampleY = sourceY + kernelY - kernelRadius;
                        const sampleX = sourceX + kernelX - kernelRadius;
                        if (sampleY >= 0 && sampleY < imageHeight && sampleX >= 0 && sampleX < imageWidth) {
                            const sampleOffset = (sampleY * imageWidth + sampleX) * 4;
                            const weight = kernel[kernelY * kernelSize + kernelX];
                            red += pixels[sampleOffset] * weight;
                            green += pixels[sampleOffset + 1] * weight;
                            blue += pixels[sampleOffset + 2] * weight;
                            alpha += pixels[sampleOffset + 3] * weight;
                        }
                    }
                }
                result.data[destOffset] = red;
                result.data[destOffset + 1] = green;
                result.data[destOffset + 2] = blue;
                result.data[destOffset + 3] = alpha * alphaFactor;
            }
        }
        context.putImageData(result, 0, 0);
    };
    useEffect(() => {
        if (uploadedImage) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            const animate = () => {
                applyConvolutionFilter(uploadedImage, filterIntensity);
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animationFrameRef.current = requestAnimationFrame(animate);
            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }
    }, [filterIntensity, uploadedImage]);

    return (
        <div className=' p-4'>
            <h1>Image Convolution</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div className='flex w-full justify-around'>
                <canvas ref={originalCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                <div>
                    <h1>Filtro de Suavização</h1>
                    <label htmlFor="intensity">Intensity: {filterIntensity.toFixed(2)}</label>
                    <input
                        type="range"
                        id="intensity"
                        min="0.11"
                        max="1"
                        step="0.01"
                        value={filterIntensity}
                        onChange={handleIntensityChange}
                    />
                    <canvas ref={processedCanvasRef} style={{ border: '1px solid black', marginTop: '10px' }} />
                </div>
            </div>
            <p>
                O filtro de média ponderada é um tipo de filtro que pode ser aplicado para remoção de detalhes e suavização de uma imagem como um todo, após aplicação desse filtro,
                a imagem perde detalhes e se torna mais uniforme se tornando mais facil analisar o shape da image e das coisas contidas nela.
            </p>
            <p>
                Onde seu kernel é:<br />
                [ (1- x), (1 - x), (1 - x) ],<br />
                [ (1 - x), x, (1 - x) ],<br />
                [ (1 - x), (1 - x), (1 - x) ],
            </p>
        </div>
    );
};

export default Home;
