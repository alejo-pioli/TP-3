import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import SearchResults from "../components/SearchResults"

export default function Details() {
    const { id } = useParams()

    const [albums, setAlbums] = useState([])
    const [next, setNext] = useState("")

    //const id = "7oPftvlwr6VrsViSDV7fJY"
    const url = `https://api.spotify.com/v1/artists/${id}/albums`

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

    function getDetails(url, albumsPar) {
        axios.get(url)
            .then((data) => {
                //console.log(data.data.items)
                const next = data.data.next

                if (data.data.items[0].album_type === "album") {
                    let albumsTemp = albumsPar
                    data.data.items.forEach((item) => {

                        if (item.album_type == "album") {
                            albumsTemp = albumsTemp.concat(item)
                        }
                        
                    })
                    getDetails(next, albumsTemp)
                }
                else {
                    setAlbums(albumsPar)
                }

            }).catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getDetails(url, [])
    }, [])

    return (
        <div>
            <h1>Hi</h1>
        </div>
    )
}