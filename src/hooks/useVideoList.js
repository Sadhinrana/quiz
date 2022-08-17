import {useEffect, useState} from "react";
import {
    getDatabase,
    ref,
    query,
    get,
    orderByKey,
    startAt,
    limitToFirst
} from "firebase/database";

export default function useVideoList(page) {
    const [loading, setLoading] = useState();
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            const db = getDatabase();
            const videosRef = ref(db, "videos");
            const videosQuery = query(
                videosRef,
                orderByKey(),
                startAt('' + page),
                limitToFirst(8)
            );

            try {
                setLoading(true);
                setError("");
                const snapshot = await get(videosQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setVideos(prevVideos => [...prevVideos, ...Object.values(snapshot.val())]);
                } else {
                    setHasMore(false);
                }
            } catch (e) {
                setLoading(false);
                setError("Data could not be fetched!");
                console.log(e);
            }
        }

        fetchVideos();
    }, [page]);

    return {
        loading,
        error,
        videos,
        hasMore,
    };
}