import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  };

  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log({ user });
  };

  return (
    <div>
      <h1>SingIn Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <button onClick={logGoogleRedirectUser}>
        Sign in with google redirect
      </button>
      <SignUpForm />
    </div>
  );
};
export default SignIn;
