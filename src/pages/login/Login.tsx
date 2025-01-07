import { useNavigate, useSearchParams } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { H1 } from "~/components";
import googleLogo from "../../assets/images/googleLogo.svg";
import { auth } from "../../lib/firebase";
import { LoginForm } from "~/components/login-form";
import { ROUTES } from "../../constants/routes";

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") ?? ROUTES.HOME;

  const handleClick = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());

      navigate(from, { replace: true });
    } catch {
      console.error("Something went wrong");
    }
  };

  // temporarily change the google blue colour to pass axe tests
  return (
    <div className="container">
      <H1>Login</H1>
      <div className="grid place-items-center gap-y-4">
        <button
          className="inline-flex border border-blue-800 text-white shadow-[0_2px_4px_0_rgba(0,0,0,.25)] transition-shadow duration-300 hover:shadow-[0_0_3px_3px_rgba(66,133,244,.3)]"
          // className="inline-flex border border-[#4285f4] text-white shadow-[0_2px_4px_0_rgba(0,0,0,.25)] transition-shadow duration-300 hover:shadow-[0_0_3px_3px_rgba(66,133,244,.3)]"
          onClick={handleClick}
        >
          <span className="p-4">
            <img src={googleLogo} className="size-6" alt="Google icon" />
          </span>

          <span className="bg-blue-800 p-4">Sign in with Google</span>
          {/* <span className="bg-[#4285f4] p-4">Sign in with Google</span> */}
        </button>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
