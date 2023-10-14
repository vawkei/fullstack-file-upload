import classes from "./UpdateGame.module.css";
import { useEffect, useState } from "react";
import Card from "../ui/card/Card";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateGame = () => {
  const { id } = useParams();
  //console.log(id);

  const [title, setTitle] = useState("");
  const [consoles, setConsoles] = useState("");
  const [image, setImage] = useState("");
  const [publicId, setPublicId] = useState("");

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    getGameContent();
  }, []);

  const getGameContent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong");
      }
      console.log(data);
      setTitle(data.title);
      setConsoles(data.consoles);
      setImage(data.image);
      setPublicId(data.msg.public_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e) => {
    const imgFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imgFile);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/games/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setImage(data.msg.src);
      setPublicId(data.msg.public_id);
      console.log(data.msg.src);
      console.log(data.msg.public_id);
      if (!response.ok) {
        throw new Error("Failed to upload");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/v1/games/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          _id:id,
          title: title,
          consoles: consoles,
          image: image,
          publicId:publicId
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setTitle(" ");
      setConsoles(" ");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes["upload-container"]}>
      <h1>Babe</h1>
      <form action="" onSubmit={handleSubmit}>
        <h1>Update Game</h1>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="consoles">Console</label>
          <input
            type="text"
            name="consoles"
            value={consoles}
            onChange={(e) => setConsoles(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="enteredImage">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className={classes.action}>
          <button>Upload Image</button>
        </div>
      </form>
    </Card>
  );
};

export default UpdateGame;
