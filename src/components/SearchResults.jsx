import SearchResultItem from "./SearchResultItem"


export default function SearchResults({ artists }) {
    return (
        <div className="searchresults">
            {artists ?
                artists.length === 0 ?
                    <div>No results found</div> :
                    <ul>
                        {artists.map((artist, index) => {
                            let url = "src/assets/notfound.png"
                            try {
                              url = artist.images[0].url
                            }
                            catch (error) {
                              console.log(error)
                            }

                            return <SearchResultItem url={url} artist={artist} index={index}></SearchResultItem>
                        })}
                    </ul>
                : <></>
            }
        </div>
    )
}