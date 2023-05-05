import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "config/firebase";
import { toastError, toastSuccess } from "components/Toast";
import { ErrorMessages } from "utils/types";

import "./index.css";
import { AiFillInsurance } from "react-icons/ai";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PasswordInput from "components/PasswordInput";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toastSuccess("Login realizado com sucesso!");
      navigate("/home");
    } catch (error: any) {
      const errorMessages: ErrorMessages = {
        "auth/wrong-password": "Senha incorreta!",
        "auth/user-not-found": "Usuário não encontrado!",
        "auth/invalid-email": "Email inválido!",
      };
      toastError(errorMessages[error.code] || "Erro ao realizar login!");
    }
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
