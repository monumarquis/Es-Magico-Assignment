import { Button, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "../Redux/auth/auth.actions";
export default function Navbar() {
    const { role, isAuth } = useSelector((state) => state.auth)
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        toast({
            description: "You logged out from application",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
        dispatch(LogOut())
        navigate('/login')
    }
    return (
        <>
            <div className="navabar">
                {!isAuth && <NavLink to="/" style={{ textDecoration: "none" }}>
                    <p>Signup</p>
                </NavLink>}
                {!isAuth && <NavLink to="/login" style={{ textDecoration: "none" }}>
                    <p>Login</p>
                </NavLink>}
                <NavLink to="/user" style={{ textDecoration: "none" }}>
                    <p>User Dashboard</p>
                </NavLink>
                {role === "admin" && <NavLink to="/admin" style={{ textDecoration: "none" }}>
                    <p>Admin Dashboard</p>
                </NavLink>}
                {isAuth && <Button colorScheme="green" onClick={handleLogout}>Logout</Button>}
            </div>
        </>
    );
}
