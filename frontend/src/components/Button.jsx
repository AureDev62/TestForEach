import React, { useState, useEffect } from 'react';
import'../../src/index.css'

export default function Button() {
  const [excuses, setExcuses] = useState([]);
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [isLoading,  setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/excuses')
      .then((res) => res.json())
      .then((data) => {
        setExcuses(data);
        generateExcuse(data); 
      })
      .catch((error) => console.error('Erreur lors de la récupération des excuses', error));
  }, []);

  const generateExcuse = (excusesData) => {
    if (excusesData.length > 0) {
      const randomExcuse = Math.floor(Math.random() * excusesData.length);
      setCurrentExcuse(excusesData[randomExcuse].message);
    } else {
      setCurrentExcuse("Aucune excuse disponible.");
    }
  };

  const handleGenerateExcuse = () => {
    setIsLoading(true);

    setTimeout(()=>{
    generateExcuse(excuses);
    setIsLoading(false);
    },2000);
  };

  return (
    <div className='containerButton'>
      {isLoading ? (
        <div className='loader'>Loading</div>
      ) : (
        <p className='paragraphButton'>{currentExcuse}</p>
      )}
      <button className='button' onClick={handleGenerateExcuse}>
        Générer une nouvelle excuse
      </button>
    </div>
  );
}