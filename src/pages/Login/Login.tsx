import {
  IonButton,
  IonCard,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Login.css";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/form/Input";

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
  });

  const loginUser = (data: any) => {
    console.log("creating a new user account with: ", data);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prijava</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <form onSubmit={handleSubmit(loginUser)}>
            <IonItem>
              <IonLabel position="floating">Korisnicko Ime</IonLabel>
              <Input control={control} name="username" />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Lozinka</IonLabel>
              <Input control={control} name="password" type="password" />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Zapamti me</IonLabel>
              <Input control={control} name="rememberMe" inputType="checkbox" />
            </IonItem>
            <IonButton className="ion-margin-top" type="submit" expand="block">
              Prijavi se
            </IonButton>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
