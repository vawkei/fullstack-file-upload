import { useState } from "react";
import Card from "../ui/card/Card";
import classes from "./ListofGames.module.css";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListofGames = (props) => {
  const [hiddenGame, setHiddenGame] = useState([]);

  const token = useSelector((state) => state.token.token);

  const deleteGameHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setHiddenGame([...hiddenGame, id]);
      console.log("Game deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const list = (
    <ul className={classes.list}>
      {props.receivedData.map((game) => {
        return (
          <div key={game._id}>
            {!hiddenGame.includes(game._id) ? (
              <Card>
                <li>
                  <h1>{game.title}</h1>
                  <div>
                    <img src={game.image} width={"200px"} />
                  </div>
                  <p>{game.consoles}</p>
                  <div className={classes.div}>
                    <Link to={`/content/${game._id}`}>
                      <AiFillEdit />
                    </Link>

                    <BsTrash onClick={() => deleteGameHandler(game._id)} />
                  </div>
                </li>
              </Card>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </ul>
  );

  return <div>{list}</div>;
};

export default ListofGames;
