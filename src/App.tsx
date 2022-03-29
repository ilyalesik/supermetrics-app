import React from "react";
import { LoginPage } from "./pages/LoginPage";
import LoginForm from "./components/LoginForm";
import { useStore } from "effector-react";
import { $isAuthorized } from "./stores/auth";
import { Redirect, Switch, Route } from "wouter";
import PostsListConnected from "./components/PostsList";
import DashboardPageConnected from "./pages/DashboardPage";
import SendersListConnected from "./components/SendersList";
import PostsNavigationConnected from "./components/PostsNavigation";

function App() {
  const isAuthorized = useStore($isAuthorized);

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

      <Redirect to="/dashboard" />
    </Switch>
  );
}

export default App;
