import SearchResultItem from "./SearchResultItem"


export default function SearchResults({ artists, isVisible }) {
    return (
        <div className="search-results">
            {artists ?
                artists.length === 0 ?
                    isVisible && <h2>No results found</h2> :
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