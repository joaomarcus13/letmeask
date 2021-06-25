import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import "../styles/room.scss";
import { RoomCode } from "../components/RoomCode";
import { useHistory, useParams } from "react-router-dom";

import Question from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export default function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  // const { user } = useContext(AuthContext);
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("deseja excluir?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let Me Ask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutLined>
              encerrar sessao
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        {questions.map((q) => (
          <Question key={q.id} author={q.author} content={q.content}>
            <button type="button" onClick={() => handleDeleteQuestion(q.id)}>
              <img src={deleteImg} alt="" />
            </button>
          </Question>
        ))}
      </main>
    </div>
  );
}
