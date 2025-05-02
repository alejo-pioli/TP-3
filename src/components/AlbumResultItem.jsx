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
            <li key={album.id} className="album">
                <img src={url}></img>
                {album.name} 
                <h3>{album.release_date.slice(0,4)}</h3>
            </li>
        </Link>
    )
}