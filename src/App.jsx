import { Routes, Route } from "react-router-dom";
import Decks from "./pages/Decks";
import DeckDetails from "./pages/DeckDetails";
import StudyDeck from "./pages/StudyDeck";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Decks />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck/:id"
          element={
            <PrivateRoute>
              <DeckDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck/:id/study"
          element={
            <PrivateRoute>
              <StudyDeck />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
