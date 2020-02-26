import { useState, useEffect } from "react";

const useFetch = () => {
  const [requestObject, request] = useState(null);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Wrap async call in useEffect
  // this effect runs anytime the requestObject changes, because of dependancy array parameter at the end
  //  ... i.e. when the component calls request() with an object, this kicks off
  useEffect(() => {
    //create an async function to fetch data
    const fetchData = async () => {
      //if request object doesn't contain values/exists, immeditately return
      if (!requestObject) {
        return;
      }
      setIsLoading(true); //set loading to true (if you want to show a loading gif)
      try {
        //set header
        requestObject.options.headers = { "Content-Type": "application/json" };
        //assign res with the results of the fetch to url with request options passed in
        const res = await fetch(requestObject.url, requestObject.options);
        const json = await res.json();
        setResponse(json); //setResponse updates the response state, which is then exposed in the hook when the consuming component uses it
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [requestObject]); //dependancy array parameter. Everytime requestObject changes, useEffect will be fired

  // request - function that sets the request object, hence it is the one being exposed to the consuming component
  // response - the resonse (this is stored in state, updated after the fetchdata function runs)
  // error - the resonse (this is stored in state, updated after the fetchdata function runs)
  // isLoading - boolean to toggle load state, changed during operation of the fetchData function
  return { request, response, error, isLoading };
};

export default useFetch;
