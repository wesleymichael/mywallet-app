import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/Home/HomePage"
import SignInPage from "./pages/SignIn/SignInPage"
import SignUpPage from "./pages/SignUp/SignUpPage"
import TransactionsPage from "./pages/Transaction/TransactionPage"
import { AuthProvider } from "./context/AuthContext"

export default function App() {
  return (
    <PagesContainer>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 0 25px;
`
