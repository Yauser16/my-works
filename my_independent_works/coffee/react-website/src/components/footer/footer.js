
import './footer.css';
import logo1 from '../images/Logo-1.svg';
import { NavLink,  NavText } from '../Navbar/NavbarElements';

const Footer = () => {
    return (
        <nav className="footer">
            <NavLink className="menu" to="/" activestyle="true">
                <img src={logo1} alt="logotip"/></NavLink> 
            <NavLink className="menu" to="/goods" activestyle="true">
                <NavText footer>Our coffee</NavText></NavLink>
            <NavLink className="menu" to="/coffee" activestyle="true">
                <NavText footer>For your pleasure</NavText></NavLink>                 
    </nav>    
    );
}
export default Footer;