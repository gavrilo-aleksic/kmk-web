import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./Login.css";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import { useHistory } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
  });
  const { push } = useHistory();
  const { login, error, loginResponse, loginLoading, isLoggedIn, isLoading } =
    useContext(AuthContext);

  const loginUser = (data: any) => {
    login(data);
  };

  if (isLoggedIn && !error && !isLoading) push("home");
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
            <Input
              control={control}
              name="username"
              required
              label="Korisnicko ime"
            />
            <Input
              control={control}
              label="lozinka"
              name="password"
              type="password"
              required
            />
            <Input
              control={control}
              name="rememberMe"
              inputType="checkbox"
              label="Zapamti me"
            />
            <IonButton
              className="ion-margin-top"
              type="submit"
              expand="block"
              disabled={loginLoading}
            >
              Prijavi se
            </IonButton>
          </form>
        </IonCard>
        <IonToast
          color="danger"
          message="Greska prilikom prijave"
          duration={5000}
          isOpen={!!error}
        />
        <IonToast
          color="success"
          message="Uspesna prijava"
          duration={5000}
          isOpen={!!loginResponse}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
