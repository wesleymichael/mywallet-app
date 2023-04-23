import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../../components/MyWalletLogo"
import { useState } from "react"
import axios from 'axios'

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register(e) {
    e.preventDefault();
    setDisableForm(true);

    if (form.password !== form.confirmPassword) {
      alert('Confirmação de senha não confere');
      return;
    }
    const body = { name: form.name, email: form.email, password: form.password };
    
    axios.post(`${BASE_URL}/cadastro`, body)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        console.log(error)
        alert(error.response.data);
        setDisableForm(false);
      });
  }

  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />
        <input
          id="name"
          type="text"
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleForm}
          disabled={disableForm}
          required
        />
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
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
          disabled={disableForm}
          autoComplete="new-password"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
