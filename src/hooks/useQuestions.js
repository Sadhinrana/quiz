import {useEffect, useState} from "react";
import {
    getDatabase,
    ref,
    query,
    get,
    orderByKey
} from "firebase/database";

export default function useQuestions(videoId) {
    const [loading, setLoading] = useState();
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchQuestions() {
            const db = getDatabase();
            const quizRef = ref(db, `quiz/${videoId}/questions`);
            const quizQuery = query(
                quizRef,
                orderByKey()
            );

            try {
                setLoading(true);
                setError("");
                const snapshot = await get(quizQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setQuestions(prevQuestions => [...prevQuestions, ...Object.values(snapshot.val())]);
                }
            } catch (e) {
                setLoading(false);
                setError("Data could not be fetched!");
                console.log(e);
            }
        }

        fetchQuestions();
    }, [videoId]);

    return {
        loading,
        error,
        questions
    };
}