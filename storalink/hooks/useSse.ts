import { useEffect } from "react";
import EventSource from "react-native-sse";

const useSse = (url: string, start: boolean, jwt: string) => {
  useEffect(() => {
    if(start === false ||  !jwt || jwt.length == 0) return;
    const es = new EventSource(`${url}?token=${jwt}`);

    es.addEventListener("open", (event) => {
      console.log("Open SSE connection.");
    });

    es.addEventListener("message", (event) => {
      console.log("New message event:", event.data);
    });

    es.addEventListener("error", (event) => {
      if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error in sse:", event.message, event.error);
      }
    });

    es.addEventListener("close", (event) => {
      console.log("Close SSE connection.");
    });

    return () => {
      es.close();
    };
  }, [start]);
};

export default useSse;
