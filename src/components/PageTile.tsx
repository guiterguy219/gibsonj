import { PropsWithChildren } from "react";

interface Props {
    accentPosition: 'top' | 'left' | 'right' | 'bottom';
    accentColor: string;
    style: React.CSSProperties;
}

const PageTile: React.FC<PropsWithChildren<Props>> = (props: PropsWithChildren<Props>) => {
    return (
        <div style={{
            [formatBroderPropertyName(props.accentPosition)]: '0.5rem solid' + props.accentColor,
            backgroundColor: '#2b2b2b',
            ...props.style
        }}>
            {props.children}
        </div>
    )
}

const formatBroderPropertyName = (position: string) =>
    'border' + position.charAt(0).toUpperCase() + position.slice(1);

export default PageTile;