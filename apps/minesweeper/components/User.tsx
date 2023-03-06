import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setUsername, RootState } from "../redux";

type Props = {
  setModalMessage: (param: string) => void;
};

export default function User(props: Props) {
  const dispatch = useDispatch();
  const [userMode, setUserMode] = useState<"signIn" | "welcome" | "signUp">(
    "signIn"
  );
  const { username } = useSelector((state: RootState) => state);

  useEffect(() => {
    axios
      .get("/api/user", {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setUserMode("welcome");
        dispatch(setUsername(res.data.username));
      })
      .catch((error: AxiosError) => console.error(error));
  }, [dispatch]);

  function signIn(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const inputUsername: string = (
      document.querySelector(".user__signIn__username") as HTMLInputElement
    ).value.trim();
    const inputPassword: string = (
      document.querySelector(".user__signIn__password") as HTMLInputElement
    ).value.trim();

    if (inputUsername.length !== 0 && inputPassword.length !== 0) {
      const data = {
        username: inputUsername,
        password: inputPassword,
      };

      axios
        .post(
          "/api/signIn",
          {
            data,
          },
          { withCredentials: true }
        )
        .then((res: AxiosResponse): void => {
          dispatch(setUsername(res.data.username));
          setUserMode("welcome");
        })
        .catch((error: AxiosError): void =>
          props.setModalMessage(error.message)
        );
    } else props.setModalMessage("please fill all fields");
  }

  function signUp(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const inputUsername: string = (
      document.querySelector(".user__signUp__username") as HTMLInputElement
    ).value.trim();
    const inputPassword: string = (
      document.querySelector(".user__signUp__password") as HTMLInputElement
    ).value.trim();
    const inputPasswordRepeat = (
      document.querySelector(
        ".user__signUp__passwordRepeat"
      ) as HTMLInputElement
    ).value.trim();

    if (
      inputPassword === inputPasswordRepeat &&
      inputPassword.length !== 0 &&
      inputPasswordRepeat.length !== 0 &&
      inputUsername.length !== 0
    ) {
      const data = {
        username: inputUsername,
        password: inputPassword,
      };

      axios
        .post("/api/signUp", { data }, { withCredentials: true })
        .then((res: AxiosResponse): void => {
          dispatch(setUsername(res.data.username));
          setUserMode("welcome");
          props.setModalMessage(res.data.message);
        })
        .catch((error: AxiosError): void =>
          props.setModalMessage(error.message)
        );
    } else if (
      inputPassword !== inputPasswordRepeat &&
      inputPassword.length !== 0 &&
      inputPasswordRepeat.length !== 0 &&
      inputUsername.length !== 0
    )
      props.setModalMessage("passwords do not match");
    else if (
      inputPassword.length === 0 ||
      inputPasswordRepeat.length === 0 ||
      inputUsername.length === 0
    )
      props.setModalMessage("please fill all fields");
  }

  function logOut(): void {
    axios
      .get("/api/logOut", {
        withCredentials: true,
      })
      .then((): void => {
        dispatch(setUsername(undefined));
        setUserMode("signIn");
      });
  }

  return (
    <div className={`user user--${userMode}`}>
      {(userMode === "signIn" || userMode === "signUp") && (
        <div className="user__buttons">
          <button
            onClick={() => setUserMode("signIn")}
            className={`user__buttons__button ${
              userMode === "signIn" ? "user__buttons__button--active" : ""
            }`}
          >
            SIGN IN
          </button>

          <button
            onClick={() => setUserMode("signUp")}
            className={`user__buttons__button ${
              userMode === "signUp" ? "user__buttons__button--active" : ""
            }`}
          >
            SIGN UP
          </button>
        </div>
      )}

      {userMode === "signIn" && (
        <form className="user__signIn" onSubmit={signIn}>
          <input
            className="user__signIn__username"
            type="text"
            name="name"
            placeholder="USERNAME"
            required
          />
          <input
            className="user__signIn__password"
            type="password"
            name="password"
            placeholder="PASSWORD"
            required
          />

          <button className="user__signIn__submit">SUBMIT</button>
        </form>
      )}

      {userMode === "signUp" && (
        <form className="user__signUp" onSubmit={signUp}>
          <input
            className="user__signUp__username"
            type="text"
            name="name"
            placeholder="USERNAME"
            required
          />
          <input
            className="user__signUp__password"
            type="password"
            name="password"
            placeholder="PASSWORD"
            required
          />
          <input
            className="user__signUp__passwordRepeat"
            type="password"
            name="password"
            placeholder="CONFIRM PASSWORD"
            required
          />

          <button className="user__signUp__submit">SUBMIT</button>
        </form>
      )}

      {userMode === "welcome" && (
        <div className="user__welcome">
          <p className="user__welcome__username">{username}</p>
          <button className="user__welcome__logOut" onClick={logOut}>
            LOG OUT
          </button>
        </div>
      )}
    </div>
  );
}
