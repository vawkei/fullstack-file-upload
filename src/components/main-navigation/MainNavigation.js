import classes from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store";
import { useEffect, useState } from "react";


const MainNavigation = () => {
  
  const [displayName,setDisplayName] = useState("");
  
  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  const dispatch = useDispatch();
  const token = useSelector((state)=>state.token.token)
  const user =useSelector((state)=>state.token.user)
  // console.log(user);
  
  useEffect(()=>{
    setDisplayName(user)
  },[token])
  

const logOutHandler = ()=>{
  dispatch(tokenActions.CLEARACTIVETOKEN())
}  

  return (
    <div className={classes.header}>
      <Link to={"/"}>
        <h1>File uPload</h1>
      </Link>
      <h3 style={{color:"white"}}>{displayName}</h3>
      <ul>
        {!token &&<NavLink to={"/auth"} className={navDataHandler}>
          <li>login</li>
        </NavLink>}
       {token && <NavLink to={"/file-upload"} className={navDataHandler}>
          <li>file upload</li>
        </NavLink> }

       {token && <NavLink to={"/content"} className={navDataHandler}>
          <li>Content</li>
        </NavLink>}
       {token && <NavLink onClick={logOutHandler} >
          <li>logout</li>
        </NavLink>}
      </ul>
    </div>
  );
};

export default MainNavigation;
