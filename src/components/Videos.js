import Video from "./Video";
import useVideoList from "../hooks/useVideoList";
import {useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videos() {
    const [page, setPage] = useState(0);
    const {error, videos, hasMore} = useVideoList(page);

    return (
        <>
            <InfiniteScroll next={() => setPage(page + 8)} hasMore={hasMore} loader={<div>Loading...</div>} dataLength={videos.length}>
                {
                    videos.length
                        ? videos.map((video, index) => <Video key={index} title={video.title} id={video.youtubeID} noq={video.noq} />)
                        : <div>No data found!</div>
                }
            </InfiniteScroll>
            {error && <div>{error}</div>}
        </>
    );
}