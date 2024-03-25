import '../styles/Navbar.css'

export const Navbar = () => {
    return (
        <>
            <div id='navbar'>
                <p id='title'>TELLURIAN</p>
                <div>
                    search
                    <img src='../assets/glass.png'/>
                    <input placeholder='country...'/>
                </div>
                <p id='team-link'>Meet the team</p>
            </div>
        </>
    )
}