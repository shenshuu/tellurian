import { useState } from "react"

export const Country = ({country, d}) => {
    const [hovering, setHovering] = useState(false)

    const handleClick = event => {
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