import React, { useState, useEffect } from 'react';

export default function FavouriteAlbum({ album }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoriteAlbums') || '[]');
    setIsFavorite(favs.some(a => a.id === album.id));
  }, [album.id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favoriteAlbums') || '[]');
    let updated;

    if (isFavorite) {
      updated = favs.filter(a => a.id !== album.id);
    } else {
      updated = [...favs, album];
    }

    localStorage.setItem('favoriteAlbums', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    /*
    <div className="album-card">
      <img src={album.images[0]?.url} alt={album.name} width="150" />
      <h4>{album.name}</h4>
      <button onClick={toggleFavorite}>
        {isFavorite ? '★ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
      </button>
    </div>
    */
  );
}

