import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import { Link } from 'react-router-dom'
import "../styles/App.css"

export default function App() {
  const CLIENT_ID = localStorage.getItem("id") || ""
  const CLIENT_SECRET = localStorage.getItem("secret") || ""

  const [isVisible, setVisible] = useState(false)
  const [artists, setArtists] = useState([])
  const [isLoading, setIslLoading] = useState(false);

  function requestToken() {
    axios.post("https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then((data) => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token
      }).catch((error) => {
        console.log(`Error: ${error}`)
        console.log(error)
      })
  }

  function searchArtist(artist) {
    setVisible(true)
    setIslLoading(true)
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
      .then((data) => {
        setArtists(data.data.artists.items)
        setIslLoading(false)
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    requestToken()
  }, [])


  return (
    <div>
      <Link to={"/login"} className="button-text">Registrarse</Link>
      <h1 className="title">Buscar artista de Spotify</h1>
      <SearchBar searchArtist={searchArtist} isLoading={isLoading}></SearchBar>
      <SearchResults artists={artists}></SearchResults>
    </div>
  )
}