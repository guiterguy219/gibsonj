import { useState } from 'react';
import './MenuButton.scss';

const MenuButton: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const height = 20;
    const menuBarStyle = {
        backgroundColor: 'white',
        height: height * 0.1,
    };

    return (
        <div id="menuWrapper" style={{
            height: '1rem',
            width: height * 1.5 + 'px',
        }}
        onClick={() => setExpanded(!expanded)}
        className={expanded ? 'expanded' : ''}>
            <div id="menuBar1" className={'menu-bar'} style={menuBarStyle}></div>
            <div id="menuBar2" className={'menu-bar'} style={menuBarStyle}></div>
            <div id="menuBar3" className={'menu-bar'} style={menuBarStyle}></div>
        </div>
    )
}

export default MenuButton;