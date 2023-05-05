import "./Header.scss";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header>
            <h1>Project Management</h1>
            <nav>
                <ul>
                    <li><Link to={'clients'}>Client</Link></li>
                    <li><Link to={'project'}>Project</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;