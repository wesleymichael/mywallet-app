import { ButtonsContainer, Header, HomeContainer, ListItemContainer, TransactionsContainer, Value } from "./styled"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"

export default function HomePage() {
  const { auth, login } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;  

  function balanceCalculation(transactions){
    let sum = 0;
    transactions.forEach( transaction => {
        if(transaction.type === 'income'){
            sum += transaction.value;
        } else {
            sum -= transaction.value;
        }
    });
    setTotal(sum.toFixed(2));
  }

  function logout(){
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("auth");
      login("");
      navigate("/");
    }
  }

  useEffect( () => {
    if(!auth?.token){
      navigate("/");
      return;
    }
    const config = { headers: { Authorization: `Bearer ${auth.token}` } };
    axios.get(`${BASE_URL}/transacoes`, config)
      .then( (response) => {
        setTransactions(response.data);
        balanceCalculation(response.data);
      })
      .catch ( (error) => {
        alert(error.response.data);
      })
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {auth?.name}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <div>
          <ul>
            {transactions.map( (transaction) => (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{dayjs(transaction.date).format("DD/MM")}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value color={transaction.type}>{transaction.value.toFixed(2)}</Value>
            </ListItemContainer>
            ))}
          </ul>
        </div>
        <article>
          <strong>Saldo</strong>
          <Value total={total}>{total}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <Link to="/nova-transacao/entrada">
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to="/nova-transacao/saída">
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  )
}
