import React from 'react'

const FormField = (props) => {
    
    return (
        <div className="FormField">
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name"/>

            <label htmlFor="calories">calories</label>
            <input type="number" name="calories" id="calories"/>

            <label htmlFor="image">image</label>
            <input type="text" name="image" id="image"/>
        </div>
    )
}

export default FormField