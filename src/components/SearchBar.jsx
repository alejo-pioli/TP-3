import {useState} from "react";

export default function SearchBar({searchArtist, isLoading}) {
    const [searchTerm, setSearchTerm] = useState("");

    return(
        <form onSubmit={(e) => {e.preventDefault(); searchArtist(searchTerm);}}>
            <input autoFocus onChange={(e) => setSearchTerm(e.target.value)}/>
            <button disabled={searchTerm.length < 3 || isLoading}>Buscar</button>
        </form>
    )
}