import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SongResultItem({ song, index }) {

    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    function getTime(){
        setMinutes(Math.floor(song.duration_ms / 1000 / 60))

        const secs = (Math.floor(song.duration_ms / 1000) - (Math.floor(song.duration_ms / 1000 / 60)*60))
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
            <li key={song.id}>
                {index + 1}. {song.name}, {minutes}:{seconds}
            </li>
    )
}