import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";

export default function TransactionsPage() {
  const [form, setForm] = useState({ description: "", value: "" });
  const [disableForm, setDisableForm] = useState(false);
  const { auth } = useContext(AuthContext);
  const { tipo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.token) {
      navigate("/");
    }
  }, []);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value.replace("-", "") });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisableForm(true);
    const type = (tipo === "entrada") ? "income" : "expense";
    const body = { ...form, type }

    const promise = api.sendTransaction(auth.token, body);
    promise.then((response) => {
      navigate("/home");
    })
    promise.catch((error) => {
      setDisableForm(false);
      alert("Erro ao enviar novo item!");
    });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="value"
          placeholder="Valor"
          type="number"
          value={form.value}
          onChange={handleForm}
          disabled={disableForm}
          required
        />
        <input
          name="description"
          placeholder="Descrição"
          type="text"
          value={form.description}
          onChange={handleForm}
          disabled={disableForm}
          required
        />
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin: 30px 0 40px 0;
    font-weight: 700;
    font-size: 26px;
  }
`
