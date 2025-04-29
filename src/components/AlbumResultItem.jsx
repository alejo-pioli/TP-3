import { Link } from 'react-router-dom';

export default function AlbumResultItem({ album }) {
    let url = "src/assets/notfound.png"
    try {
        url = album.images[0].url
    }
    catch (error) {
        //console.log(error)
    }

    return (
        //<Link to={`/details/${artist.id}`}>
            <li key={album.id}>
                <img width="100px" height="100px" src={url}></img>
                {album.name}, {album.release_date.slice(0,4)}
            </li>
        //</Link>
    )
}