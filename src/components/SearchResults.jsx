import SearchResultItem from "./SearchResultItem"


export default function SearchResults({ artists }) {
    return (
        <div className="searchresults">
            {artists ?
                artists.length === 0 ?
                    <div>No results found</div> :
                    <ul>
                        {artists.map((artist) => {
                            return <SearchResultItem artist={artist} key={artist.id}></SearchResultItem>
                        })}
                    </ul>
                : <></>
            }
        </div>
    )
}