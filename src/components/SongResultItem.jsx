import { useEffect, useState } from 'react';
import AddFavoriteSong from './AddFavoriteSong';


export default function SongResultItem({ song, index }) {

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    function getTime() {
        setMinutes(Math.floor(song.duration_ms / 1000 / 60))

        const secs = (Math.floor(song.duration_ms / 1000) - (Math.floor(song.duration_ms / 1000 / 60) * 60))
        if (secs < 10) {
            setSeconds("0" + secs)
        } else {
            setSeconds(secs)
        }
    }

    useEffect(() => {
        getTime()
    }, [])

    return (
        <li key={song.id} className="song">
            <div class="left-song">
                <h3 className="position">{index + 1}</h3>
                <h2>{song.name}</h2>
            </div>
            <div class="right-song">
                <h3 className="length">{minutes}:{seconds}</h3>
                <AddFavoriteSong id={song.id}></AddFavoriteSong>
            </div>
        </li>
    )
}