import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function LoginForm({ login, password }) {
  const [isCorrect, setIsCorrect] = useState(true);
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login,
      password,
    },
  });

  function onSubmit(data) {
    if (data.login === login && data.password === password) {
      setIsLogged(true);
      navigate("/");
    } else {
      setIsCorrect(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <label htmlFor="login">Login</label>
      <input
        type="text"
        id="login"
        {...register("login", {
          required: true,
          minLength: 10,
          maxLength: 20,
        })}
      />
      {errors.login && <p>Write a login (10-20 chars).</p>}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        {...register("password", {
          required: true,
          pattern:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-={}\[\]|\\:;"'<>,.?/])(?=.*[^\s]).{8,}$/,
          minLength: 10,
          maxLength: 20,
        })}
      />
      {errors.password && (
        <p>
          Write a password (contains at least: 8 characters, 1 lowercase, 1
          uppercase letter, 1 number, 1 special character, no spaces).
        </p>
      )}
      {isCorrect ? <p></p> : <p>Wrong login/password</p>}
      {!errors.login && !errors.password && (
        <input type="submit" value="Submit" className="button" />
      )}
    </form>
  );
}
