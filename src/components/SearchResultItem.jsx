import { Link } from 'react-router-dom';

export default function SearchResultItem({ artist, url, index }) {
    return (
       // <Link to={""}>
            <li key={index}>
                <img width="100px" height="100px" src={url}></img>
                {artist.name}
            </li>
       // </Link>
    )
}