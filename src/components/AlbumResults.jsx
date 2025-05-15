import AlbumResultItem from "./AlbumResultItem"


export default function AlbumResults({ albums, id }) {
    return (
        <div>
            {albums ?
                albums.length === 0 ?
                    <div className="loader-container"><span className="loader"></span></div> :
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