import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import notFound from "../assets/notfound.png"
import SongResults from "../components/SongResults"

export default function Album() {
    const { id, album } = useParams()

    const [image, setImage] = useState(notFound)
    const [name, setName] = useState("")
    const [songs, setSongs] = useState([])
    const [year, setYear] = useState("")

    const CLIENT_ID = localStorage.getItem("id") || ""
    const CLIENT_SECRET = localStorage.getItem("secret") || ""

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
        getData(album)
    }, [])

    return (
        <div>
            <img width="250px" src={image}></img>
            <h1>{name}</h1>
            <h2>{year}</h2>
            <SongResults songs={songs}></SongResults>
        </div>
    )
}