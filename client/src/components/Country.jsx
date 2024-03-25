import { useState } from "react"
import { codes } from '../utils/countryCodes.js'

export const Country = ({country, d}) => {
    const [hovering, setHovering] = useState(false)

    const handleClick = event => {
        const country = event.properties.name.toLowerCase()
        fetch(`http://localhost:3001/news/?country=${codes[country]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log('news fetching failed'))
        console.log(event)
    }

    return (
        <path 
        style={{'fill': hovering ? 'red' : 'orange', 'stroke': 'black', 'strokeWidth': 0.2}} 
        d={d}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => handleClick(country)}
        >
        </path>
    )
}