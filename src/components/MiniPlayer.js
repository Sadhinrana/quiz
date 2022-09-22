import Classes from "../styles/MiniPlayer.module.css";
import {useRef, useState} from "react";
import ReactPlayer from "react-player";

export default function MiniPlayer({videoId, title}) {
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);

    const toogleMiniPlayer = () => {
        if (!status) {
            buttonRef.current.classList.remove(Classes.floatingBtn);
            setStatus(true);
        } else {
            buttonRef.current.classList.add(Classes.floatingBtn);
            setStatus(false);
        }
    }

    return (
        <div
            className={`${Classes.miniPlayer} ${Classes.floatingBtn}`}
            ref={buttonRef}
            onClick={toogleMiniPlayer}
        >
            <span className={`material-icons-outlined ${Classes.open}`}> play_circle_filled </span>
            <span
                className={`material-icons-outlined ${Classes.close}`}
                onClick={toogleMiniPlayer}
            > close </span>
            <ReactPlayer
                className={Classes.player}
                url={`https://www.youtube.com/watch?v=${videoId}`}
                width="300px"
                height="168px"
                playing={status}
                controls
            />
            <p>{title}</p>
        </div>
    );
}