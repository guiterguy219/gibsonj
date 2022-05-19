import { PropsWithChildren, RefObject, useCallback, useEffect, useState } from "react";

interface PopoverProps {
    parentRef: RefObject<HTMLElement>,
    offset?: number,
    zIndex?: string,
}

const Popover: React.FC<PropsWithChildren<PopoverProps>> = ({ parentRef, offset, zIndex, children }) => {
    const [posTop, setPosTop] = useState(0);
    const [posLeft, setPosLeft] = useState(0);
    const [visible, setVisible] = useState(false);

    const setPosition = useCallback(() => {
        if (!parentRef.current) { return; }
        setVisible(false);
        const { bottom, left, width } = parentRef.current?.getBoundingClientRect();
        setPosTop(bottom + (offset || 10));
        setPosLeft(left + (width / 2) + (offset || 10));
        setVisible(true);
    }, [parentRef, offset]);

    useEffect(() => {
        setPosition();
        window.addEventListener('resize', setPosition);
    }, [setPosition]);

    return (
        <div style={{
            position: 'absolute',
            top: posTop,
            left: posLeft,
            transform: 'translate3d(-50%, 0, 0)',
            zIndex: zIndex || '8000',
            opacity: visible ? '1' : '0',
            transition: 'opacity 0.2s',
        }}>
            { children }
        </div>
    )
}

export default Popover;