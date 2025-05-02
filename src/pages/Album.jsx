import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import notFound from "../assets/notfound.png"
import SongResults from "../components/SongResults"
import AlbumArtists from "../components/AlbumArtists"
import "../styles/Album.css"

export default function Album() {
    const { id, album } = useParams()

    const [image, setImage] = useState(notFound)
    const [name, setName] = useState("")
    const [songs, setSongs] = useState([])
    const [year, setYear] = useState("")
    const [artists, setArtists] = useState([])

    const CLIENT_ID = localStorage.getItem("id") || ""
    const CLIENT_SECRET = localStorage.getItem("secret") || ""

    function requestToken() {
        return axios.post("https://accounts.spotify.com/api/token",
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

    function getData(id) {
        const url = `https://api.spotify.com/v1/albums/${id}`

        axios.get(url)
            .then((data) => {
                console.log(data.data)

                setName(data.data.name)
                setYear(data.data.release_date.slice(0, 4))
                try {
                    setImage(data.data.images[0].url)
                }
                catch (error) {
                    //console.log(error)
                }

                setArtists(data.data.artists)

                getSongs(data.data.tracks, [])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getSongs(songs, arr) {
        let newArr = arr.concat(songs.items)

        if (songs.next) {
            axios.get(songs.next)
                .then((data) => {
                    getSongs(data.data, newArr)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setSongs(newArr)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!axios.defaults.headers.common['Authorization']) {
                await requestToken();
            }

            getData(album)
        };

        fetchData();
    }, [album]);


    return (
        <div>
            <Link className="button-icon" to={`/details/${id}`}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>Volver</Link>
            <div className="album-details">
                <img src={image}></img>
                <h3>{year}</h3>
                <AlbumArtists artists={artists}></AlbumArtists>
                <h1 className="title">{name}</h1>
            </div>
            <SongResults songs={songs}></SongResults>
        </div>
    )
}