import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import AlbumResults from "../components/AlbumResults"
import notFound from "../assets/notfound.png"
import "../styles/Details.css"
import AddFavoriteArtist from "../components/AddFavoriteArtist"

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
                //console.log(data.data)
                const next = data.data.next

                if (data.data.items[0].album_type === "album") {
                    let albumsTemp = albumsPar
                    data.data.items.forEach((item) => {

                        if (item.album_type == "album") {
                            albumsTemp = albumsTemp.concat(item)
                        }

                    })
                    if (next) {
                        getDetails(next, albumsTemp)
                    }
                    else {
                        setAlbums(albumsTemp)
                    }
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
            <div className="details-buttons">
                <Link className="button-icon" to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>Volver</Link>
                <AddFavoriteArtist artist={{id: id, name: name, images: [{url: image}]}}></AddFavoriteArtist>
            </div>
            <div className="artist-details">
                <img src={image}></img>
                <div>
                    <h1 className="title">{name}</h1>
                </div>
            </div>
            <AlbumResults albums={albums} id={id}></AlbumResults>
        </div>
    )
}