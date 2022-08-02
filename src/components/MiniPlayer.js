import Classes from "../styles/MiniPlayer.module.css";
import image from "../assets/images/3.jpg"

export default function MiniPlayer() {
    return (
        <div className={`${Classes.miniPlayer} ${Classes.floatingBtn}`}>
            <span className={`material-icons-outlined ${Classes.open}`}> play_circle_filled </span>
            <span className={`material-icons-outlined ${Classes.close}`}> close </span>
            <img src={image} alt="Alt tag"/>
            <p>#23 React Hooks Bangla - React useReducer hook Bangla</p>
        </div>
    );
}