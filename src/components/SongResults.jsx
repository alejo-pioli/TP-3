import SongResultItem from "./SongResultItem"


export default function SongResults({ songs }) {
    return (
        <div>
            {songs ?
                songs.length === 0 ?
                    <div>No results found</div> :
                    <ol>
                        {songs.map((song, index) => {
                            return <SongResultItem song={song} key={song.id} index={index}></SongResultItem>
                        })}
                    </ol>
                : <></>
            }
        </div>
    )
}