import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import AlbumResults from "../components/AlbumResults"
import notFound from "../assets/notfound.png"

export default function Details() {
    const { id } = useParams()

    const [name, setName] = useState("Artist")
    const [image, setImage] = useState(notFound)
    const [albums, setAlbums] = useState([])

    const url = `https://api.spotify.com/v1/artists/${id}/albums`

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

    function getArtist(id) {
        const url = `https://api.spotify.com/v1/artists/${id}`

        axios.get(url)
            .then((data) => {
                setName(data.data.name)
                setImage(data.data.images[0].url)
            })
            .catch((error) => {
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
        const fetchData = async () => {
            if (!axios.defaults.headers.common['Authorization']) {
                await requestToken();
            }

            getArtist(id);
            getDetails(url, []);
        };

        fetchData();
    }, [id, url]);


    return (
        <div>
            <img width="300px" src={image}></img>
            <h1>{name}</h1>
            <AlbumResults albums={albums} id={id}></AlbumResults>
        </div>
    )
}