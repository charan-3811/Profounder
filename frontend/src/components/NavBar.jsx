import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout() {
        setUser("None");
        sessionStorage.removeItem("user");
        navigate("/");
    }

    return (
        <div style={navBarStyle}>
            <div style={brandStyle}>Funder Pro</div>
            <div style={linkContainerStyle}>
                <Link style={linkStyle} to="/">
                    Leaderboard
                </Link>
                <Link style={linkStyle} to="/competitions">
                    Competitions
                </Link>
                {user === "None" ? (
                    <Link style={linkStyle} to="/login">
                        Login
                    </Link>
                ) : (
                    <button style={buttonStyle} onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}

const navBarStyle = {
    width: "100vw",
    padding: "10px 20px",
    backgroundColor: "#dcf2ea",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
};

const brandStyle = {
    fontWeight: "bold",
    fontSize: "20px",
    color: "black",
};

const linkContainerStyle = {
    display: "flex",
    gap: "20px", // Adds spacing between links
    alignItems: "center",
};

const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "16px",
};

const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: "#f26a4b",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
};

export default NavBar;
