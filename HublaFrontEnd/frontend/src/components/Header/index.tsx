import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import "./index.css";
import { Container } from "@mui/material";
import { AiFillInsurance } from "react-icons/ai";

export default function Header() {
  return (
    <Container disableGutters={true} maxWidth={false}>
      <Box className="header__container">
        <Box className="header__logo">
          <AiFillInsurance />
        </Box>
        <Box className="header__menu">Menu</Box>
        <Box className="header__user">User</Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
}
