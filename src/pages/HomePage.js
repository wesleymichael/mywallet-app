import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"

export default function HomePage() {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
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

  useEffect( () => {
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
        <h1>Olá, {auth.name}</h1>
        <BiExit />
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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Header = styled.header`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  height: calc(100vh - 300px);
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  >div {
    overflow: auto;
    padding: 0 16px;
  }
  article {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 16px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.2);
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const ButtonsContainer = styled.section`
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
  
  button {
    width: calc(50vw - 33px);
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "income" || props.total >= 0 ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
