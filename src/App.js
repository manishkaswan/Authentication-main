import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import HeaderContextProvider from "./store/HeaderContextProvider";
import { useContext } from "react";
import HeaderContext from "./store/HeaderContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const ctx = useContext(HeaderContext);

  return (
    <HeaderContextProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!ctx.token ? (
            <Route path="/auth">
              <AuthPage />
            </Route>
          ) : (
            ""
          )}

          <Route path="/profile">
            {ctx.token ? <UserProfile /> : <Redirect to="/auth"></Redirect>}
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Layout>
    </HeaderContextProvider>
  );
}

export default App;
