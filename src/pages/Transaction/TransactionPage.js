import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "../../context/AuthContext";

export default function TransactionsPage() {
  const [form, setForm] = useState({description: "", value: ""});
  const [disableForm, setDisableForm] = useState(false);
  const { auth } = useContext(AuthContext);
  const {tipo} = useParams();
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect( () => {
    if(!auth || !auth.token){
      navigate("/");
    }
  }, []);

  function handleForm(e){
    setForm({ ...form, [e.target.name]: e.target.value.replace("-", "") });
  }

  function sendTransaction(e){
    e.preventDefault();
    setDisableForm(true);
    const type = (tipo === "entrada") ? "income" : "expense";
    const body = { ...form, type}

    const config = { headers: { Authorization: `Bearer ${auth.token}` } };

    axios.post(`${BASE_URL}/nova-transacao/${tipo}`, body, config)
      .then( (response) => {
        navigate("/home");
      })
      .catch( (error) => {
        setDisableForm(false);
        console.log(error);
      });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={sendTransaction}>
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
  }
`
