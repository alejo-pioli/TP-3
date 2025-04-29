import { Link } from 'react-router-dom';
import notFound from "../assets/notfound.png"

export default function SearchResultItem({ artist }) {
    let url = notFound
    try {
        url = artist.images[0].url
    }
    catch (error) {
        //console.log(error)
    }

    return (
        <Link to={`/details/${artist.id}`}>
            <li key={artist.id}>
                <img width="100px" height="100px" src={url}></img>
                {artist.name}
            </li>
        </Link>
    )
}