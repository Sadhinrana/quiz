import {useEffect, useState} from "react";
import {
    getDatabase,
    ref,
    query,
    get,
    orderByKey
} from "firebase/database";

export default function useAnswers(videoId) {
    const [loading, setLoading] = useState();
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchAnswers() {
            const db = getDatabase();
            const answerRef = ref(db, `answers/${videoId}/questions`);
            const answerQuery = query(
                answerRef,
                orderByKey()
            );

            try {
                setLoading(true);
                setError("");
                const snapshot = await get(answerQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setAnswers(prevQuestions => [...prevQuestions, ...Object.values(snapshot.val())]);
                }
            } catch (e) {
                setLoading(false);
                setError("Data could not be fetched!");
                console.log(e);
            }
        }

        fetchAnswers();
    }, [videoId]);

    return {
        loading,
        error,
        answers
    };
}