import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/App.css'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

function App() {
  const CLIENT_ID = ""
  const CLIENT_SECRET = ""

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
    setIslLoading(true)
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`)
      .then((data) => {
        console.log(data.data.artists.items)
        setArtists(data.data.artists.items)
        setIslLoading(false)
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    requestToken()
  })


  return (
    <div>
      <h1>Hello world</h1>
      <SearchBar searchArtist={searchArtist} isLoading={isLoading}></SearchBar>
      <SearchResults artists={artists}></SearchResults>
    </div>
  )
}

export default App
