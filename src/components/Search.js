import React from 'react'

const Search = (props) => {
    return (
        <div className="Search">
            <input type="text" onChange={(event)=>props.updateSearchWord(event.target.value )} placeholder="search"/>
        </div>
    )
}

export default Search