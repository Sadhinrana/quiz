import Classes from "../styles/Video.module.css";
import {Link} from "react-router-dom";

export default function Video({title, id, noq}) {
    return (
        noq ?
            <Link to="/quiz"
            >
                <div className={Classes.video}>
                    <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title}/>
                    <p>{title}</p>
                    <div className={Classes.qmeta}>
                        <p>{noq} Questions</p>
                        <p>Score : {noq * 5}</p>
                    </div>
                </div>
            </Link>
            :
            <div className={Classes.video}>
                <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title}/>
                <p>{title}</p>
                <div className={Classes.qmeta}>
                    <p>{noq} Questions</p>
                    <p>Score : {noq * 5}</p>
                </div>
            </div>
    );
}