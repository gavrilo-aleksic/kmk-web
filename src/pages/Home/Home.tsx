import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { useRef, useState } from "react";
import { ExpenseQueryModel } from "../../api/types";
import Expenses from "./Expenses/Expenses";
import UsagesWorker from "./UsagesWorker/UsagesWorker";
import ExpenseUsage from "./ExpenseUsage/ExpenseUsage";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const menuRef = useRef<any>();
  const { push } = useHistory();
  const [selectedExpense, setSelectedExpense] = useState<ExpenseQueryModel>();

  return (
    <>
      <IonMenu contentId="main-content" ref={menuRef}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton
            onClick={() => {
              localStorage.clear();
              push("/login");
            }}
          >
            Odjavi se
          </IonButton>
        </IonContent>
      </IonMenu>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Rashodi unos, Pregled</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent id="main-content" fullscreen>
          <Expenses onSelectChange={setSelectedExpense} />
          <UsagesWorker utrosakId={selectedExpense?.id_rashoda} />
          <ExpenseUsage utrosakId={selectedExpense?.id_rashoda} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
