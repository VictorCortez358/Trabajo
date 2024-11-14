import React, { useEffect, useState } from 'react';

function Imagen() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/obtener/imagen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si necesitas enviar un token de autorización o cookies:
        // 'Authorization': `Bearer ${yourToken}`,
        // 'Access-Control-Allow-Origin': 'http://localhost:5173', // Esto generalmente no es necesario en el frontend
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        setImageUrl(data.url);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener la imagen:', error);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando imagen...</p>
      ) : (
        imageUrl && <img src={imageUrl} alt="Imagen desde Laravel" />
      )}
    </div>
  );
}

export default Imagen;
