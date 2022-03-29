import React from "react";
import { LoginPage } from "./pages/LoginPage";
import LoginForm from "./components/LoginForm";
import { useStore } from "effector-react";
import { $isAuthorized } from "./stores/auth";
import { Redirect, Switch, Route, useLocation } from "wouter";
import PostsListConnected from "./components/PostsList";
import DashboardPageConnected from "./pages/DashboardPage";
import SendersListConnected from "./components/SendersList";
import PostsNavigationConnected from "./components/PostsNavigation";

function App() {
  const [, setLocation] = useLocation();
  const isAuthorized = useStore($isAuthorized);

  React.useEffect(() => {
    if (isAuthorized) {
      setLocation("/");
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage>
            <LoginForm />
          </LoginPage>
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/">
        <Redirect to="/dashboard" />
      </Route>

      <Route path="/dashboard">
        <DashboardPageConnected
          senders={<SendersListConnected />}
          posts={<PostsListConnected />}
          navigation={<PostsNavigationConnected />}
        />
      </Route>

      <Route path="/dashboard/:from_id">
        {(params) => (
          <DashboardPageConnected
            from_id={params.from_id}
            senders={<SendersListConnected />}
            posts={<PostsListConnected />}
            navigation={<PostsNavigationConnected />}
          />
        )}
      </Route>
    </Switch>
  );
}

export default App;
