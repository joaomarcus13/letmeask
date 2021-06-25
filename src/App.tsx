import "./App.css";
import "./services/firebase";
import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";
import AdminRoom from "./pages/AdminRoom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import AuthContextProvider from "./contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" exact component={Room} />
          <Route path="/admin/rooms/:id" exact component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
