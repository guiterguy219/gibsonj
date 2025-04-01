import React, { createRef, CSSProperties, Dispatch, MouseEvent, SetStateAction, TouchEvent, useCallback, useEffect, useState } from "react";
import Popover from "../../components/popover/Popover";
import { contrast, contrastYiq, invert, toRgbStr } from "./color-util";

interface BinIconProps{
    size: string;
    color: string;
}

const BinIcon: React.FC<BinIconProps> = ({size, color}) => {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" style={{
            fill: color,
        }}>
        <title>bin</title>
        <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
        <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
        </svg>
    )
}

const colors = [
    0xff0000,
    0xffa500,
    0xffff00,
    0x00ff00,
    0x0000ff,
    0x4b0082,
    0xee82ee,
    0x0,
    0xffffff
]

interface ColorPickerProps {
    setStrokeColor: Dispatch<SetStateAction<number>>,
    backgroundColor?: number,
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [contrastColor, setContrastColor] = useState(0xffffff);

    useEffect(() => {
        setContrastColor(invert(props.backgroundColor || 0x0));
    }, [props.backgroundColor]);
    
    return (
        <div style={{
            display: 'flex',
            gap: '0.8rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            background: toRgbStr(contrastColor),
            padding: '0.6rem',
            borderRadius: '1rem',
        }}>
            { colors.map(color =>
                <div style={{
                    background: toRgbStr(color),
                    height: '1.6rem',
                    width: '1.6rem',
                    borderRadius: '50%',
                    borderColor: toRgbStr(contrast(contrastColor, color) > 3 ? color : invert(contrastColor)),
                    borderWidth: '0.15rem',
                    borderStyle: 'solid',
                }}
                onClick={() => props.setStrokeColor(color)}
                key={color}></div>
            )}
        </div>
    )
}

interface Position {
    x: number;
    y: number
};
let isPainting = false;
const backgroundColors = [
    0x0,
    0x444444,
    0xffffff,
]

const menuBtnBgStyle: CSSProperties = {
    height: '2rem',
    width: '2rem',
    borderRadius: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const positionMap = new Map<string | number, Position>();
let initialized = false;

const Painter: React.FC = () => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined | null>();
    const [strokeColor, setStrokeColor] = useState(0xff);
    const [colorPickerExpanded, setColorPickerExpanded] = useState(false);
    const [backgroundSelected, setBackgroundSelected] = useState(0);
    const [contrastColor, setContrastColor] = useState(0xffffff);

    const canvasRef = createRef<HTMLCanvasElement>();
    const colorMenuBtnRef = createRef<HTMLDivElement>();

    const handleResize = useCallback(() => {
        if (!ctx) { return; }
        ctx.canvas.width = canvasRef.current?.clientWidth || window.innerWidth;
        ctx.canvas.height = canvasRef.current?.clientHeight || window.innerHeight;
    }, [ctx]);

    useEffect(() => {
        if (initialized || !canvasRef.current) { return; }
        setCtx(canvasRef.current.getContext('2d'));
        initialized = true;
    }, [canvasRef]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
    }, [handleResize])

    useEffect(() => {
        setContrastColor(contrastYiq(backgroundColors[backgroundSelected]));
    }, [backgroundSelected]);

    const setPositions = (event: MouseEvent | TouchEvent): void => {
        const canvas = canvasRef.current;
        if (!canvas) { return; }
        if ('screenX' in event) {
            positionMap.set('mouse', {
                x: event.clientX - (canvas.offsetLeft || 0),
                y: event.clientY - (canvas.offsetTop || 0)
            })
        } else if ('touches' in event) {

            new Array(event.touches.length).fill(1).forEach((_, i) => {
                const t = event.touches.item(i);
                positionMap.set(t.identifier, {
                    x: t.clientX - (canvas.offsetLeft || 0),
                    y: t.clientY - (canvas.offsetTop || 0)    
                })
            });
        }
    }

    const startPaint = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        isPainting = true;
        setPositions(event);
        setColorPickerExpanded(false);
    }

    const registerPaint = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        if (!isPainting) { return; }
        if (!ctx) { return; }

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = toRgbStr(strokeColor);
        // ctx.imageSmoothingEnabled = true;

        const prevPositionMap = new Map(positionMap);
        setPositions(event);

        // Move and reset position
        positionMap.forEach((pos, id) => {
            const prevPos = prevPositionMap.get(id);
            if (!prevPos) { return; }
            ctx.beginPath();
            ctx.moveTo(prevPos.x, prevPos.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        });
    }

    const stopPaint = () => {
        isPainting =  false;
        ctx?.closePath();
        positionMap.clear();
    }

    const toggleColorMenu = () => {
        setColorPickerExpanded((c) => !c);
    }

    const rotateBackgroundColor = () => {
        setBackgroundSelected((c) => (c + 1) % backgroundColors.length);
    }

    const clearCanvas = () => {
        ctx?.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: toRgbStr(backgroundColors[backgroundSelected]),
        }}>
            <div style={{
                display: 'flex',
                gap: '0.8rem',
                justifyContent: 'center',
                margin: '1rem',
                alignItems: 'center',
            }}>
                <div style={{
                    ...menuBtnBgStyle,
                    background: `linear-gradient(${backgroundColors.map(c => toRgbStr(c)).join(', ')})`,
                }} onClick={rotateBackgroundColor}></div>
                <div style={{
                    ...menuBtnBgStyle,
                    background: toRgbStr(contrastColor),
                }}>
                    <div style={{
                        background: `conic-gradient(${colors.slice(0,6).map(c => toRgbStr(c)).join(', ')})`,
                        height: '1.6rem',
                        width: '1.6rem',
                        borderRadius: '50%'
                    }}
                    onClick={toggleColorMenu}
                    ref={colorMenuBtnRef}
                    ></div>
                </div>
                <div
                    style={{
                        ...menuBtnBgStyle,
                        background: toRgbStr(contrastColor),
                    }}
                    onClick={clearCanvas}
                >
                    <BinIcon size={'1.4rem'} color={'#e36b6b'}/>   
                </div>
            </div>
            { colorPickerExpanded &&
                <Popover parentRef={colorMenuBtnRef}>
                    <ColorPicker setStrokeColor={setStrokeColor} backgroundColor={backgroundColors[backgroundSelected]}></ColorPicker>
                </Popover>
            }
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