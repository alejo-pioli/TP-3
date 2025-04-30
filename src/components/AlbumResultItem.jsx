import { Link } from 'react-router-dom';
import notFound from "../assets/notfound.png"

export default function AlbumResultItem({ album, id }) {
    let url = notFound
    try {
        url = album.images[0].url
    }
    catch (error) {
        //console.log(error)
    }

    return (
        <Link to={`/details/${id}/${album.id}`}>
            <li key={album.id}>
                <img width="100px" height="100px" src={url}></img>
                {album.name}, {album.release_date.slice(0,4)}
            </li>
        </Link>
    )
}