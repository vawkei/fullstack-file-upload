import classes from "./NotFound.module.css"

const NotFound = () => {
    return ( 
        <div className={classes["notFound-container"]}>
            <h1>Sorry you are not allowed to view this page</h1>
        </div>
     );
}
 
export default NotFound;