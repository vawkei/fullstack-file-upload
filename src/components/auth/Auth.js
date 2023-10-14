import classes from "./Auth.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/card/Card";
import { useDispatch } from "react-redux";
import { tokenActions } from "../../store";

const Auth = () => {
  const [register, setIsRegister] = useState(false);
  const [inputError,setInputError] = useState("");

  const toggleRegisterState = () => {
    return setIsRegister((currentState) => !currentState);
  };


  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // http://localhost:5000/api/v1/games

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;

    const registerUrl = "http://localhost:5000/api/v1/auth/register";
    const loginUrl = "http://localhost:5000/api/v1/auth/login";

    if(register){
      url=registerUrl
    }else{
      url=loginUrl
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);

      if(data.msg){
        setInputError(data.msg)
        return
      }

      dispatch(tokenActions.SETACTIVETOKEN(data))
      if (!response.ok) {
        throw new Error(setInputError(data.msg) || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    
    }
    //e.target.reset();
    navigate("/content");
  };

  return (
    <Card className={classes["form-container"]}>
      <form onSubmit={submitHandler}>
        <h1>{register ? "Register" : "Login"}</h1>
        <div className={classes.control}>
          <label htmlFor="name">name</label>
          <input type="text" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">email</label>
          <input type="text" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">password</label>
          <input type="text" ref={passwordInputRef} />
        </div>
        <div className={classes.action}>
          <button>Submit</button>
        </div>
        <p onClick={toggleRegisterState}>
          {register ? "Click here to login" : "Create an account"}
        </p>
        <p>{inputError}</p>
      </form>
    </Card>
  );
};

export default Auth;
