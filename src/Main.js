import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { instance } from "./axios";
import Menu from "./Menu";
function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [musicSubscriptionData, setMusicSubscriptionData] = useState([]);
  const [musicSubscriptionStatus, _] = useState("No subscriptions.");
  const [musicQueryData, setMusicQueryData] = useState();
  const [musicQueryStatus, setMusicQueryStatus] = useState("No results.");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryArtist, setQueryArtist] = useState("");
  const [queryYear, setQueryYear] = useState("");
  const onRemove = async (music) => {
    try {
      const payload = {
        email: email,
        title: music.title,
      };
      const data = await instance.delete("/subscription", { data: payload });
      const { message } = JSON.parse(data.data.body);
      alert(message);
      getSubscriptions();
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  const onSubscribe = async (music) => {
    try {
      const payload = {
        email: email,
        title: music.title,
      };
      const data = await instance.put("/subscription", payload);
      const {
        body: { message },
      } = data.data;
      alert(message);
      getSubscriptions();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
  const onEdit = async (data) => {
    localStorage.setItem("music", JSON.stringify(data));
    navigate("/editMusic");
  };
  const handleQuery = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post("/music/retrieveFiltered", {
        title: queryTitle,
        artist: queryArtist,
        year: queryYear,
      });
      const {
        body: { message, music },
      } = data;
      setMusicQueryStatus(message);
      if (music) {
        setMusicQueryData(music);
      } else {
        setMusicQueryData([]);
      }
    } catch (err) {}
  };

  const getSubscriptions = async () => {
    try {
      const { data } = await instance.get(`/subscription?email=${email}`);
      const { music } = data;
      if (music) {
        setMusicSubscriptionData(music);
      } else {
        setMusicSubscriptionData([]);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
        if (data === undefined || data === null) {
          navigate("/login");
        }
        console.log(data);
        setUser(data.user_name);
        setEmail(data.email);
      } catch (err) {}
    })();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        if (user) await getSubscriptions();
      } catch (err) {}
    })();
  }, [user]);

  return (
    <div>
      <Menu />
      <h2>query area</h2>
      <form action="" id="query" method="post" onSubmit={handleQuery}>
        <p className="item">
          <label for="queryTitle"> Title </label>
          <input
            type="text"
            name="queryTitle"
            id="queryTitle"
            value={queryTitle}
            onChange={(e) => setQueryTitle(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="queryArtist"> Artist </label>
          <input
            type="text"
            name="queryArtist"
            id="queryArtist"
            value={queryArtist}
            onChange={(e) => setQueryArtist(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="queryYear"> Year </label>
          <input
            type="text"
            name="queryYear"
            id="queryYear"
            value={queryYear}
            onChange={(e) => setQueryYear(e.target.value)}
          />
        </p>
        <p className="item">
          <input type="submit" value="Query" />
        </p>
      </form>
      {musicQueryData && musicQueryData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>year</th>
              <th>title</th>
              <th>artist</th>
              <th>image</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {musicQueryData.map((data) => {
              return (
                <>
                  <tr key={data.title}>
                    <td>{data.year}</td>
                    <td>{data.title}</td>
                    <td>{data.artist}</td>
                    <td>
                      <img
                        src={data.img_url}
                        alt={data.artist}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>
                      <button onClick={() => onSubscribe(data)}>
                        subscribe
                      </button>
                    </td>
                    <td>
                      <button onClick={() => onEdit(data)}>edit</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>{musicQueryStatus}</p>
      )}
      <h2>subscription area</h2>
      {musicSubscriptionData && musicSubscriptionData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>year</th>
              <th>title</th>
              <th>artist</th>
              <th>image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {musicSubscriptionData.map((data) => {
              return (
                <>
                  <tr key={data.title}>
                    <td>{data.year}</td>
                    <td>{data.title}</td>
                    <td>{data.artist}</td>
                    <td>
                      <img
                        src={data.img_url}
                        alt={data.artist}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>
                      <button onClick={() => onRemove(data)}>remove</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>{musicSubscriptionStatus}</p>
      )}
    </div>
  );
}

export default Main;
