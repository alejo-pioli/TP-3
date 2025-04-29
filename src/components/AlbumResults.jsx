import AlbumResultItem from "./AlbumResultItem"


export default function AlbumResults({ albums }) {
    return (
        <div>
            {albums ?
                albums.length === 0 ?
                    <div>No results found</div> :
                    <ul>
                        {albums.map((album) => {
                            return <AlbumResultItem album={album} key={album.id}></AlbumResultItem>
                        })}
                    </ul>
                : <></>
            }
        </div>
    )
}