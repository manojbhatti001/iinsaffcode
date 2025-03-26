import React, { useState } from 'react';

const CircularMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { label: 'style', angle: 0 },
        { label: 'photo', angle: 45 },
        { label: 'add', angle: 90 },
        { label: 'text', angle: 135 },
        { label: 'link', angle: 180 },
        { label: 'image', angle: 225 },
        { label: 'code', angle: 270 },
        { label: 'lines', angle: 315 },
    ];

    return (
        <div className="menu-container relative">
            <div className="menu-center-button " onClick={toggleMenu}>
                <span>{isOpen ? 'close' : 'open'}</span>
            </div>
            <div className='absolute top-[80px] left-[75px]'>
            <div className={`menu-items ${isOpen ? 'show' : 'hide'}`}>
                {menuItems.map((item, index) => {
                    const angleInRadians = (item.angle * Math.PI) / 180;
                    const x = 100 * Math.cos(angleInRadians);
                    const y = 100 * Math.sin(angleInRadians);
                    return (
                        <div
                            key={index}
                            className={`menu-item ${isOpen ? 'visible' : 'invisible'}`}
                            style={{
                                transform: `translate(${x}px, ${y}px)`,
                                transitionDelay: `${index * 0.3}s`, // Increased delay
                                animationDelay: `${index * 0.3}s`,
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
    );
};

export default CircularMenuButton;
