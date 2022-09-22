import Classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
import {useRef, useState} from "react";

export default function ProgressBar({prev, next, progress, submit}) {
    const [tooltip, setTooltip] = useState(false);
    const tooltipRef = useRef();
    
    const toogleTooltip = () => {
        if (tooltip) {
            setTooltip(false);
            tooltipRef.current.style.display = "none";
        } else {
            setTooltip(true);
            tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
            tooltipRef.current.style.display = "block";
        }
    }

    return (
        <div className={Classes.progressBar}>
            <div className={Classes.backButton} onClick={prev}>
                <span className="material-icons-outlined"> arrow_back </span>
            </div>
            <div className={Classes.rangeArea}>
                <div className={Classes.tooltip} ref={tooltipRef}>{progress}% Complete!</div>
                <div className={Classes.rangeBody}>
                    <div className={Classes.progress}
                         style={{width: `${progress}%`}}
                         onMouseOver={toogleTooltip}
                         onMouseLeave={toogleTooltip}
                    >
                    </div>
                </div>
            </div>
            <Button ClassName={Classes.next} onClick={progress === 100 ? submit : next}>
                <span>{progress === 100 ? 'Submit Question' : 'Next Question'}</span>
                <span className="material-icons-outlined"> arrow_forward </span>
            </Button>
        </div>
    );
}