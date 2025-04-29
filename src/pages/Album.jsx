import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import AlbumResults from "../components/AlbumResults"
import notFound from "../assets/notfound.png"

export default function Album() {
    //const { id } = useParams()

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
                getSongs("1UShup0VvfxhxS7j3Omxh2")
            }).catch((error) => {
                console.log(`Error: ${error}`)
                console.log(error)
            })
    }

    function getSongs(id) {
        const url = `https://api.spotify.com/v1/albums/${id}`

        axios.get(url)
            .then((data) => {
                console.log(data.data)
            })
    }

    useEffect(() => {
        requestToken()
    }, [])

    return (
        <div>
            <h1>dets</h1>
        </div>
    )
}