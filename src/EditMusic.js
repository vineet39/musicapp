import { useState, useEffect } from "react";
import { instance } from "./axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

function EditMusic() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [editOutcome, setEditOutcome] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (isLoggedIn === undefined || isLoggedIn === null) {
      navigate("/login");
      return;
    }
    const data = JSON.parse(localStorage.getItem("music"));
    if (data === undefined || data === null) {
      navigate("/main");
      return;
    }
    setTitle(data.title);
    setArtist(data.artist);
    setYear(data.year);
    return () => {
      localStorage.setItem("music", null);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await instance.put("/music", {
      title,
      artist,
      year,
    });
    const {
      body: { message },
    } = data;
    setEditOutcome(message);
    let music = JSON.parse(localStorage.getItem("music"));
    if (music !== null) {
      music = { ...music, artist, year };
      localStorage.setItem("music", JSON.stringify(music));
    }
  };

  return (
    <div>
      <Menu />
      <form action="" id="updateMusic" method="post" onSubmit={handleSubmit}>
        <h1>Edit Music</h1>
        <p className="item">
          <label for="title"> Title </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled
          />
        </p>
        <p className="item">
          <label for="artist"> Artist </label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="year"> Year </label>
          <input
            type="year"
            name="year"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </p>
        <p className="item">
          <input
            type="submit"
            value="Update music details"
            disabled={title === "" || artist === "" || year === ""}
          />
        </p>
      </form>
      <p>{editOutcome}</p>
    </div>
  );
}

export default EditMusic;
