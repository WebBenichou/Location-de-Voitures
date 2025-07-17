import { NavLink } from "react-router-dom";

const navItemStyle = { listStyle: "none", margin: "0 10px" };
const navLinkStyle = { textDecoration: "none", color: "#fff" };
const activeLinkStyle = { color: "#d4af37", fontWeight: "bold" };

function NavBar() {
    return (
        <nav style={{ backgroundColor: "#333", padding: "10px" }}>
            <ul style={{ display: "flex", margin: 0, padding: 0 }}>
                <li style={navItemStyle}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => isActive ? activeLinkStyle : navLinkStyle}
                    >
                        Accueil
                    </NavLink>
                </li>
                <li style={navItemStyle}>
                    <NavLink
                        to="/voitures"
                        style={({ isActive }) => isActive ? activeLinkStyle : navLinkStyle}
                    >
                        Voitures
                    </NavLink>
                </li>
                <li style={navItemStyle}>
                    <NavLink
                        to="/ajouter"
                        style={({ isActive }) => isActive ? activeLinkStyle : navLinkStyle}
                    >
                        Ajouter
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
