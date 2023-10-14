import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListofGames from "./ListofGames";

const Content = () => {
  const token = useSelector((state) => state.token.token);

  const [gameContent, setGameContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noTokenMessage, setNoTokenMessage] = useState("");

  useEffect(() => {
    const getContentToken = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/v1/games", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const receivedData = await response.json();
        console.log(receivedData);

        if (!response.ok) {
          throw new Error(receivedData.msg || "Something went wrong");
        }

        setGameContent(receivedData.games);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setNoTokenMessage("Something went wrong");
        setIsLoading(false);
      } 
    };

    const getContentNoToken = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/v1/games");
        const receivedData = await response.json();

        if (!response.ok) {
          let errorMessage = "Something went wrong";
          if (receivedData && receivedData.msg) {
            errorMessage = receivedData.msg;
          }
          throw new Error(errorMessage);
        }
        console.log(receivedData);
        setNoTokenMessage(receivedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setNoTokenMessage(error.message); // Set the error message in state
        setIsLoading(false);
      } 
    };

    if (token) {
      getContentToken();
    } else {
      getContentNoToken();
    }
  }, [token]);

  return (
    <div className="content-container">
      {isLoading && <p>Loading</p>}
      {token ? (
        <>
          <h2>This is the Content Page</h2>
          <ListofGames receivedData={gameContent} />
        </>
      ) : (
        <div>
          <h2>{noTokenMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default Content;
