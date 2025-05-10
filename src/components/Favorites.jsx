import { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import axios from 'axios';
import AlbumArtists from './AlbumArtists';
import { Link } from 'react-router-dom';

export default function Favorites({ isVisible, showFavourites, requestToken }) {

  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])

  function getArtists() {
    const favArtists = JSON.parse(localStorage.getItem("favoriteArtists")) || []
    setArtists(favArtists)
  }

  function getSongs() {
    const favSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || []
    console.log(favSongs)


    let songs = []
    favSongs.forEach((song) => {
      axios.get(`https://api.spotify.com/v1/tracks/${song}`)
        .then((data) => {
          console.log(data.data)
          songs.push(data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    })

    console.log(songs)
    setSongs(songs)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!axios.defaults.headers.common['Authorization']) {
        await requestToken();
      }

      getSongs()
    };

    fetchData()
    getArtists()
  }, [])

  return (
    isVisible && <div className="favorites slide-in-left">
      <button className="close button-icon" onClick={showFavourites}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>Cerrar</button>
      <h2 className="title">Artistas favoritos:</h2>
      <SearchResults artists={artists.sort((a, b) => a.name.localeCompare(b.name))}></SearchResults>
      <h2 className="title">Canciones favoritas:</h2>
      <div className="favorite-songs">
        <ul>
          {songs.sort((a, b) => a.name.localeCompare(b.name)).map((song) => (
              <li key={song.id} className="favorite-song">
                <Link to={`/details/${song.artists[0].id}/${song.album.id}`}>
                <img src={song.album.images[0].url}></img>
                </Link>
                <div className="song-details">
                  <Link to={`/details/${song.artists[0].id}/${song.album.id}`}>
                  <h3>{song.name}</h3>
                  </Link>
                  <AlbumArtists artists={song.artists}></AlbumArtists>
                </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

