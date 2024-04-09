import { useEffect, useState } from "react";
import { instance } from "./axios";

function Test() {
    const [cleanup, setCleanUp] = useState("In progress..."); //var cleanup = "Inprogess";

    useEffect(() => {
        (async () => {
          try {
            let { data } = await instance.get("/cleanup");
            setCleanUp(data.message); // cleanup = data.message;
          } catch (err) {}
        })();
    
        return () => {};
      }, []); // [] on load

  
  return <div>Cleanup: {cleanup}</div>; //console.log(user);
}

export default Test;
