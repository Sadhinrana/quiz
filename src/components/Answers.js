import Classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers() {
    return (
        <div className={Classes.answers}>
            <Checkbox className={Classes.answer} text="Test answer" />
        </div>
    );
}