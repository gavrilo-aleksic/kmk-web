import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipsisHorizontal, square, home, logIn } from "ionicons/icons";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Extra from "./pages/Extra/Extra";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

setupIonicReact();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

const App: React.FC = () => (
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterWrapper />
      </AuthProvider>
    </QueryClientProvider>
  </IonApp>
);

const RouterWrapper = () => {
  const { isLoggedIn, userLoading } = useContext(AuthContext);
  if (userLoading) return <></>;
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route path="/extra">
            <Extra />
          </Route>
          <Route exact path="/">
            <Redirect to={isLoggedIn ? "/home" : "/login"} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="login" href="/login" disabled={isLoggedIn}>
            <IonIcon aria-hidden="true" icon={logIn} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="home" href="/home" disabled={!isLoggedIn}>
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="extra" href="/extra" disabled>
            <IonIcon aria-hidden="true" icon={ellipsisHorizontal} />
            <IonLabel>Extra</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
export default App;
