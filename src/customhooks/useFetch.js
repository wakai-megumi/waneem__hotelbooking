import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);



    useEffect(() => {
        const FetchData = async () => {

            setIsPending(true);

            try {

                const response = await axios.get(url);



                setData(response.data);


            } catch (err) {
                console.log(err)

                setError(err);
            }
            setIsPending(false);

        }
        FetchData()
    }, [url]);


    const refetch = async () => {

        setIsPending(true);

        try {
            const resposnse = await axios.get(url);
            if (!resposnse.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            setData(resposnse.data);


        } catch (err) {

            setError(err);
        }
        setIsPending(false);
    }

    return { data, isPending, error, refetch }
}
export default useFetch