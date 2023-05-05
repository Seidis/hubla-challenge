import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    let message = "";
    if (password !== passwordConfirm) {
      message = "As senhas não coincidem!";
      toastError(message);
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toastSuccess("Cadastro realizado com sucesso!");
        navigate("/login");
      })
      .catch((error) => {
        message =
          error.code === "auth/weak-password"
            ? "Senha muito fraca!"
            : "Erro ao realizar cadastro!";
        message =
          error.code === "auth/email-already-in-use"
            ? "Email já cadastrado!"
            : message;
        message =
          error.code === "auth/invalid-email" ? "Email inválido!" : message;
        toastError(message);
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
