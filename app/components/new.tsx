import React from 'react';
import CreateIcon from '@mui/icons-material/Create';

export default function New() {
    return (
        <div className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-4 shadow-md">
            <CreateIcon style={{ color: 'white', fontSize: '3rem' }} />
        </div>
    );
}
