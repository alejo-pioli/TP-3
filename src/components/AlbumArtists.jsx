import AlbumArtistItem from "./AlbumArtistItem"


export default function AlbumArtists({ artists }) {
    return (
        <>
            {artists ?
                artists.length === 0 ?
                    <div>No results found</div> :
                    <h2 id="album-artists">
                        {artists.map((artist, index) => {
                            if (index !== artists.length - 1) {
                                return <><AlbumArtistItem artist={artist}></AlbumArtistItem>, </>
                            }
                            else {
                                return <AlbumArtistItem artist={artist}></AlbumArtistItem>
                            }
                        })}
                    </h2>
                : <></>
            }
        </>
    )
}