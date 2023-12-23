import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import Filter from "./Filter/Filter";
import { useRef, useState } from "react";
import { getExpensesFn } from "../../api/api";
import { useQuery } from "react-query";
import { subMonths } from "date-fns";
import ExpensesTable from "./ExpensesTable/ExpensesTable";

const Home: React.FC = () => {
  const menuRef = useRef<any>();
  const [dates, setDates] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  return (
    <>
      <IonMenu contentId="main-content" ref={menuRef}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Filter
            onSubmit={(e) => {
              console.log(e);
              menuRef.current?.close();
            }}
          />
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
          <ExpensesTable from={dates.from} to={dates.to} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
