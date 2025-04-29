import { Link } from 'react-router-dom';

export default function SearchResultItem({ artist }) {
    let url = "src/assets/notfound.png"
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