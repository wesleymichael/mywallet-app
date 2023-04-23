import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token){
    return { headers: { Authorization: `Bearer ${token}` } };
}

function signIn(body) {
    const promise = axios.post(`${BASE_URL}/login`, body);
    return promise;
}

function register(body) {
    const promise = axios.post(`${BASE_URL}/cadastro`, body);
    return promise;
}

function sendTransaction(tipo, token, body){
    const config = createConfig(token);
    const promise = axios.post(`${BASE_URL}/nova-transacao/${tipo}`, body, config);
    return promise;
}

function getTransaction(token){
    const config = createConfig(token);
    const promise = axios.get(`${BASE_URL}/transacoes`, config);
    return promise;
}

function deleteById(id, token){
    const config = createConfig(token);
    const promise = axios.delete(`${BASE_URL}/deletar/${id}`, config);
    return promise;
}

const api = {
    signIn,
    register,
    sendTransaction,
    getTransaction,
    deleteById,
}

export default api;