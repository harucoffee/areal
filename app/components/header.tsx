import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './menu';


const Header = () => {
    return (
        <header className="w-full h-20 bg-blue-500 opacity-80 justify-between items-center flex p-5">
            <h1 className="text-white text-2xl font-bold justify-center items-center">areal</h1>
            <MenuIcon style={{ color: 'white', fontSize: '3rem' }}>
                <Drawer/>
            </MenuIcon>
        </header>
    );
}

export default Header;