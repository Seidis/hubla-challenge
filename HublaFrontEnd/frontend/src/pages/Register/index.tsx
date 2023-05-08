import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorMessages } from "utils/types";

import "./index.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiFillInsurance } from "react-icons/ai";
import { auth } from "config/firebase";
import { toastError, toastSuccess } from "components/Toast";
import { ButtonGroup } from "@mui/material";
import PasswordInput from "components/PasswordInput";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      toastError("As senhas não coincidem!");
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        localStorage.setItem("email", email);
        localStorage.setItem(
          "accessToken",
          // @ts-ignore
          UserCredential._tokenResponse.idToken
        );
        localStorage.setItem(
          "refreshToken",
          // @ts-ignore
          UserCredential._tokenResponse.refreshToken
        );
        toastSuccess("Cadastro realizado com sucesso!");
        navigate("/home");
      })
      .catch((error) => {
        const errorMessages: ErrorMessages = {
          "auth/weak-password": "Senha muito fraca!",
          "auth/email-already-in-use": "Email já cadastrado!",
          "auth/invalid-email": "Email inválido!",
        };
        toastError(errorMessages[error.code] || "Erro ao realizar cadastro!");
      });
  };

  return (
    <Box className="signup">
      <Box className="signup__container">
        <Box className="signup__container__logo">
          <AiFillInsurance />
        </Box>
        <Box className="signup__container__form">
          <Box className="signup__container__form__input">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box className="signup__container__form__input">
            <PasswordInput setPassword={setPassword} />
          </Box>
          <Box className="signup__container__form__input">
            <PasswordInput setPassword={setPasswordConfirm} />
          </Box>
          <Box className="signup__container__form__button">
            <ButtonGroup variant="outlined" sx={{ mt: 5 }} fullWidth>
              <Button onClick={handleRegister}>Cadastrar</Button>
              <Button onClick={() => navigate(-1)}>Voltar</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
