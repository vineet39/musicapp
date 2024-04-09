import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { instance } from "./axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const { data } = await instance.post("/auth/login", {
      email,
      password,
    });
    const {
      statusCode,
      body: { message, user },
    } = data;

    if (statusCode === 200) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/main");
    } else {
      setResult(message);
    }
  };

  return (
    <div>
      <Menu />
      <form action="" id="login" method="post" onSubmit={login}>
        <h2>Login Form</h2>
        <p className="item">
          <label for="email"> Email </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="password"> Password </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p className="item">
          <input
            type="submit"
            value="Login"
            disabled={email === "" || password === ""}
          />
        </p>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default LoginForm;
