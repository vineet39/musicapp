import { useState, useEffect } from "react";
import { instance } from "./axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
function Register() {
  const [email, setEmail] = useState("");
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerOutcome, setRegisterOutcome] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      const { data } = await instance.put("/auth/register", {
        email,
        user_name,
        password,
      });
      const {
        statusCode,
        body: { message },
      } = data;
      setRegisterOutcome(message);
      if (statusCode === 201) {
        navigate("/login");
      }
    } else {
      const { data } = await instance.put("/user", {
        email,
        user_name,
        password,
      });
      const {
        body: { message },
      } = data;
      setRegisterOutcome(message);

      let user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        user = { ...user, user_name };
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setUsername(user?.user_name);
    setEmail(user?.email);
  }, []);

  return (
    <div>
      <Menu />
      <form action="" id="register" method="post" onSubmit={handleSubmit}>
        <h1>{user != null ? "Update details" : "Register"}</h1>
        <p className="item">
          <label for="email"> Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={user != null}
          />
        </p>
        <p className="item">
          <label for="username"> Username </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            value={user_name}
            onChange={(e) => setUsername(e.target.value)}
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
            value={user != null ? "Update" : "Register"}
            disabled={
              user_name === "" || email === "" || (password === "" && !user)
            }
          />
        </p>
      </form>
      <p>{registerOutcome}</p>
    </div>
  );
}
export default Register;
