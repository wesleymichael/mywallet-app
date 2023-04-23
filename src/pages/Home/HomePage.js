import { ButtonsContainer, Header, HomeContainer, ListItemContainer, TransactionsContainer, Value } from "./styled"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import api from "../../services/api"

export default function HomePage() {
  const { auth, login } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  function loadTransation(){
    const promise = api.getTransaction(auth.token);
    promise.then((response) => {
      setTransactions(response.data);
      balanceCalculation(response.data);
    })
    promise.catch((error) => {
      alert(error.response.data);
    })
  }

  function deleteItem(id) {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      const promise = api.deleteById(id, auth.token);
      promise.then((response) => {
        loadTransation();
      })
      promise.catch((error) => {
        alert(error.response.data);
      })
    }
  }

  function balanceCalculation(transactions) {
    let sum = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        sum += transaction.value;
      } else {
        sum -= transaction.value;
      }
    });
    setTotal(sum.toFixed(2));
  }

  function logout() {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("auth");
      login("");
      navigate("/");
    }
  }

  useEffect(() => {
    if (!auth?.token) {
      navigate("/");
      return;
    }
    loadTransation();
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {auth?.name}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        <div>
          <ul>
            {transactions.map((transaction) => (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{dayjs(transaction.date).format("DD/MM")}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <div>
                  <Value color={transaction.type}>{transaction.value.toFixed(2)}</Value>
                  <span onClick={() => deleteItem(transaction._id)}><AiFillDelete /></span>
                </div>
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
