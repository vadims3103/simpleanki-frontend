import axios from "axios";

const API_URL = "http://localhost:5044/api";

// store JWT
export function setToken(token) {
  localStorage.setItem("token", token);
}

// get JWT
export function getToken() {
  return localStorage.getItem("token");
}

// create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach JWT to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function request(method, url, data) {
  try {
    const res = await api({ method, url, data });
    return res.data;
  } catch (err) {
    console.error(`API ${method.toUpperCase()} ${url} failed`, err);
    throw err.response?.data || err;
  }
}

// Authentication
export const registerUser = (data) => request("post", "/auth/register", data);
export const loginUser = (data) => request("post", "/auth/login", data);
export function logout() {
  localStorage.removeItem("token");
}

// Decks
export const getDecks = () => request("get", "/decks");
export const getDeck = (id) => request("get", `/decks/${id}`);
export const createDeck = (deck) => request("post", "/decks", deck);
export const updateDeck = (deck) => request("put", `/decks/${deck.id}`, deck);
export const deleteDeck = (id) => request("delete", `/decks/${id}`);

// Cards
export const getCardsByDeck = (deckId) => request("get", `/cards/by-deck/${deckId}`);
export const createCard = (card) => request("post", "/cards", card);
export const updateCard = (card) => request("put", `/cards/${card.id}`, card);
export const deleteCard = (id) => request("delete", `/cards/${id}`);