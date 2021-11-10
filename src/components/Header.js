import { Link } from "react-router-dom";

function Header(){
    return ( 
        <h1 className="title"><Link to="/">Where in the world?</Link></h1>
    )
}

export default Header