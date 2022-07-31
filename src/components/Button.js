import Classes from "../styles/Button.module.css";

export default function Button({children}) {
    return (
        <div className={Classes.button}>
            <span>{children}</span>
        </div>
    );
}