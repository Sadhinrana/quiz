import Classes from "../styles/Button.module.css";

export default function Button({ClassName, children}) {
    return (
        <button className={`${Classes.button} ${ClassName}`}>
            {children}
        </button>
    );
}