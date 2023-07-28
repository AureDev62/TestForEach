import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import'../../src/index.css'

export default function HttpCode() {
  const { http_code } = useParams();
  const [excuse, setExcuse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/excuses')
      .then((res) => res.json())
      .then((data) => {
        const getExcuse = data.find((excuse) => excuse.http_code === parseInt(http_code));
        if (getExcuse) {
          setExcuse(getExcuse.message);
        } else {
          navigate('*',{replace:true});
        }
      })
      .catch((err) => console.error('Erreur lors de la récupération des excuses', err));
  }, [http_code, navigate]);

  return (
    <div className='containerHttp'>
      <h1>Excuse pour le code HTTP {http_code}</h1>
      <p>{excuse}</p>
    </div>
  );
}
