import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import Button from "../components/Button";
import { auth, database, firebase } from "../services/firebase";
import "../styles/auth.scss";
import { FormEvent, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useState } from "react";
// import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext);
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("room does not exists");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("sala foi encerrada");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
