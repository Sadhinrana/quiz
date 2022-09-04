import Classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({prev, next, progress, submit}) {
    return (
        <div className={Classes.progressBar}>
            <div className={Classes.backButton} onClick={prev}>
                <span className="material-icons-outlined"> arrow_back </span>
            </div>
            <div className={Classes.rangeArea}>
                <div className={Classes.tooltip}>{progress}% Complete!</div>
                <div className={Classes.rangeBody}>
                    <div className={Classes.progress}
                         style={{width: `${progress}%`}}
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