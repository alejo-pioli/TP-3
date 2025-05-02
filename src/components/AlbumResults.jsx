import AlbumResultItem from "./AlbumResultItem"


export default function AlbumResults({ albums, id }) {
    return (
        <div>
            {albums ?
                albums.length === 0 ?
                    <div>No results found</div> :
                    <ul id="albums-container">
                        {albums.map((album) => {
                            return <AlbumResultItem album={album} key={album.id} id={id}></AlbumResultItem>
                        })}
                    </ul>
                : <></>
            }
        </div>
    )
}