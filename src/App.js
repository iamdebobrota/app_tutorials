import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/Todo";
import ChatApp from "./components/ChatApp";
import LobbyScreen from "./screen/Lobby";
import RoomPage from "./screen/Room";
import { Route, Routes } from "react-router-dom";
import TodoApp from "./Pages/TodoApp";
import Tour from "./reactTour/Tour";
import { Suspense } from "react";

function App() {
  return (
    <div className="App">
      {/* <ChatApp /> */}
      {/* <Todo /> */}
      {/* <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes> */}
<Suspense>
      <Tour>
        <TodoApp />
      </Tour>
</Suspense>
    </div>
  );
}

export default App;
