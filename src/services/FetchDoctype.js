// use-fetch-data.js
import { useEffect, useState } from "react";
import axios from "axios";

const FetchDocType = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(process.env.REACT_APP_API_ENDPOINT_GET_CONFIGURATION_DOCTYPE)
          .then((response) => {
            console.log("res:", response.data);
            setData(response.data);
            return response.data;
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log("collector: ", data);
  }, []);

  // return data;
};

export default FetchDocType;
