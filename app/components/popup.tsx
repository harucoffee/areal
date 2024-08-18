'use client';

import { useEffect, useState } from 'react';

function NamePopup({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <h2>Enter your name</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NamePopup;
