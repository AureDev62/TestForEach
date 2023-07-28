import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import'../../src/index.css'

export default function Lost() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className='containerLost'>
      <h1>I'm Lost</h1>
      <iframe
      title='gif'
        src="https://giphy.com/embed/9JgjpeyN48rdtzIvOZ"
        width="480"
        height="202"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}
