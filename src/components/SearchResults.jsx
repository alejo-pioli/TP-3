import SearchResultItem from "./SearchResultItem"


export default function SearchResults({ artists, isVisible }) {
    return (
        <div className="search-results">
            {artists ?
                artists.length === 0 ?
                    isVisible && <div className="loader-container"><span className="loader"></span></div> :
                    <ul id="artists-container">
                        {artists.map((artist) => {
                            return <SearchResultItem artist={artist} key={artist.id}></SearchResultItem>
                        })}
                    </ul>
                : <></>
            }
        </div>
    )
}