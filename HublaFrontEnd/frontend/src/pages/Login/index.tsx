import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "config/firebase";
import { toastError, toastSuccess } from "components/Toast";

import "./index.css";
import { AiFillInsurance } from "react-icons/ai";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PasswordInput from "components/PasswordInput";
import { setTokens } from "config/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let message = "";
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const accessToken = await userCredential.user.getIdToken();
        const refreshToken = userCredential.user.refreshToken;
        setTokens({ data: { accessToken, refreshToken } });

        toastSuccess("Login realizado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        message =
          error.code === "auth/wrong-password"
            ? "Senha incorreta!"
            : "Erro ao realizar login!";
        message =
          error.code === "auth/user-not-found"
            ? "Usuário não encontrado!"
            : message;
        message =
          error.code === "auth/invalid-email" ? "Email inválido!" : message;

        toastError(message);
      });
  };

  return (
    <Box className="login">
      <Box className="login__container">
        <Box className="login__container__logo">
          <AiFillInsurance />
        </Box>
        <Box className="login__container__form">
          <Box className="login__container__form__input">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box className="login__container__form__input">
            <PasswordInput setPassword={setPassword} />
          </Box>
          <Box className="login__container__form__button">
            <ButtonGroup
              variant="text"
              aria-label="outlined button group"
              sx={{ mt: 5 }}
              fullWidth
            >
              <Button onClick={handleLogin}>Login</Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
