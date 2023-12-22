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
import { QueryClient, QueryClientProvider } from "react-query";

setupIonicReact();

const queryClient = new QueryClient();

const App: React.FC = () => (
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/extra">
              <Extra />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="login" href="/login">
              <IonIcon aria-hidden="true" icon={logIn} />
              <IonLabel>Login</IonLabel>
            </IonTabButton>
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="extra" href="/extra">
              <IonIcon aria-hidden="true" icon={ellipsisHorizontal} />
              <IonLabel>Extra</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </QueryClientProvider>
  </IonApp>
);

export default App;
