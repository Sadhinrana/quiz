import {useEffect, useState} from "react";

export default function useFetch(url, method, headers) {
    const [loading, setLoading] = useState();
    const [result, setResult] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function requestFetch() {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(url, {
                    method: method || 'GET',
                    headers: headers
                });
                const data = await response.json();
                setLoading(false);
                setResult(data);
            } catch (e) {
                setLoading(false);
                setError("Data could not be fetched!");
                console.log(e);
            }
        }

        requestFetch();
    });

    return {
        loading,
        error,
        result
    };
}