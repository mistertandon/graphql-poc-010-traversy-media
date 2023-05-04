import "./Header.scss";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header>
            <h1>Project Management</h1>
            <nav>
                <ul>
                    <li><Link to={'client'}>Client</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;