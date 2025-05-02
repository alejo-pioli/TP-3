import { Link } from 'react-router-dom';

export default function AlbumArtistItem({ artist }) {

    return (
        <Link to={`/details/${artist.id}`}>
            {artist.name}
        </Link>
    )
}