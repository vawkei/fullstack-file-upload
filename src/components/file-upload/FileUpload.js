import { useState } from "react";
import Card from "../ui/card/Card";
import classes from "./FileUpload.module.css";


const FileUpload = () => {
  const [title, setTitle] = useState("");
  const [consoles, setConsoles] = useState("");
  const [image, setImage] = useState("");
  const [publicId,setPublicId] = useState("")  

  const token = localStorage.getItem("token");

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await fetch("http://localhost:5000/api/v1/games/upload", {
        method: "POST",
        body: formData,
        headers:{
          Authorization : `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const src = data.msg.src;
        const public_id = data.msg.public_id;
        console.log(src)
        console.log(public_id)
        setImage(src);
        setPublicId(public_id)
      } else {
        console.error("Failed to upload image");
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const games = { title, consoles, image, publicId };
      const response = await fetch("http://localhost:5000/api/v1/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(games),
      });

      if (response.ok) {
        setTitle("");
        setConsoles("");
        setImage(null);
        setPublicId(null)
      } else {
        console.error("Failed to add game");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <Card className={classes["upload-container"]}>
        {token ? (
          <>
            <form action="" onSubmit={handleSubmit}>
              <h1>File Upload</h1>
              <div className={classes.control}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="consoles">Console</label>
                <input
                  type="text"
                  
                  name="consoles"
                  value={consoles}
                  onChange={(e)=>setConsoles(e.target.value)}
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
          </>
        ) : (
          <div>
            <h2>You are not allowed here</h2>
          </div>
        )}
      </Card>
      
    </div>
  );
};

export default FileUpload;

