import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "./index.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import { Button, Divider } from "@mui/material";
import Logo from "assets/hubla_logo.png";
import MenuTooltip from "components/MenuTooltip";

export default function Header() {
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigateTo("/home");
    }
  }, [location, navigateTo]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Grid container spacing={2} className="header__container">
        <Grid item xs={2} className="header__logo">
          <Box className="header__logo__img">
            <img src={Logo} alt="logo" />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={2}
          >
            <Button
              variant="outlined"
              color="success"
              onClick={() => navigateTo("/upload")}
            >
              Upload
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => navigateTo("/transactions")}
            >
              Transações
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => navigateTo("/about")}
            >
              Sobre o Projeto
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            sx={{ marginRight: "20%" }}
          >
            <Chip
              icon={<FaceIcon />}
              label="Meu Perfil"
              onClick={handleClick}
            />
          </Stack>
        </Grid>
      </Grid>
      <MenuTooltip
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
      />
      <Divider sx={{ margin: "0 5%" }} />
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
}
