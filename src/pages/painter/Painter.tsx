import { createRef, MouseEvent, TouchEvent, useEffect, useState } from "react";

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'brown',
    'black'
]

const Painter: React.FC = () => {
    const [isPainting, setIsPainting] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined | null>();
    const [coordX, setCoordX] = useState(0);
    const [coordY, setCoordY] = useState(0);
    const [strokeColor, setStrokeColor] = useState('black');

    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        setCtx(canvasRef.current?.getContext('2d'));
    }, [canvasRef]);

    useEffect(() => {
        const handleResize = () => {
            if (!ctx) { return; }
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    }, [ctx])

    const setPosition = (event: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) { return; }
        let x = 0;
        let y = 0;
        if ('screenX' in event) {
            x = event.clientX;
            y = event.clientY;
        } else if ('touches' in event) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        }
        setCoordX(x - (canvas.offsetLeft || 0));
        setCoordY(y - (canvas.offsetTop || 0));
    }

    const startPaint = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        setIsPainting(true);
        setPosition(event);
    }

    const registerPaint = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        if (!isPainting) { return; }
        if (!ctx) { return; }
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = strokeColor;

        // Move and reset position
        ctx.moveTo(coordX, coordY);
        setPosition(event);

        ctx.lineTo(coordX, coordY);
        ctx.stroke();
    }

    const stopPaint = () => {
        setIsPainting(false);
        ctx?.closePath();
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                margin: '1rem',
                justifyContent: 'center'
            }}>
                { colors.map(color =>
                    <div style={{
                        background: color,
                        height: '3rem',
                        width: '3rem',
                        borderRadius: '50%'
                    }}
                    onClick={() => setStrokeColor(color)}
                    key={color}></div>
                )}
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={(e) => startPaint(e)}
                onMouseMove={(e) => registerPaint(e)}
                onMouseUp={stopPaint}
                onTouchStart={(e) => startPaint(e)}
                onTouchMove={(e) => registerPaint(e)}
                onTouchEnd={stopPaint}
                onTouchCancel={stopPaint}
                style={{
                    width: '100vw',
                    flexGrow: '1',
                    touchAction: 'none',
                }}
            ></canvas>
        </div>
    )
}

export default Painter;