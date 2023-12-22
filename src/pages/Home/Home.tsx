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
import { subDays, subMonths } from "date-fns";

const Home: React.FC = () => {
  const menuRef = useRef<any>();
  const [dates, setDates] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  const { data, isLoading, error } = useQuery(
    ["EXPENSES", dates.from, dates.to],
    () => getExpensesFn(dates.from, dates.to)
  );

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
          {isLoading && (
            <IonSpinner name="circles" className="spinner-page-center" />
          )}
          <IonToast
            color="danger"
            message="Doslo je do greske"
            duration={3000}
            isOpen={!!error}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
