import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { auth, login } = useContext(AuthContext);
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_URL;

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Verificar se o localstorage está populado
  useEffect( () => {
    if(auth && auth.token){
      navigate("/home");
    }
  }, []);

  function signIn(e) {
    e.preventDefault();
    setDisableForm(true);
    const body = { ...form }
    axios.post(`${BASE_URL}login`, body)
      .then((response) => {
        login(response.data);
        navigate("/home");
      })
      .catch((error) => {
        setDisableForm(false);
        alert(error.response.data);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input
          id="email"
          type="email"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
          disabled={disableForm}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
          disabled={disableForm}
          autoComplete="new-password"
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
