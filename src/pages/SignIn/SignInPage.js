import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { auth, login } = useContext(AuthContext);
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (auth && auth.token) {
      navigate("/home");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setDisableForm(true);

    const promise = api.signIn({ ...form })
    promise.then((response) => {
      login(response.data);
      navigate("/home");
    })
    promise.catch((error) => {
      setDisableForm(false);
      alert(error.response.data);
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
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
    a{
      padding-top: 30px;
      font-size: 15px;
      color: white;
      font-family: 'Raleway';
    }
`
