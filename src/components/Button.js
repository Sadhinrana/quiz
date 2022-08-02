import Classes from "../styles/Button.module.css";

export default function Button({ClassName, children}) {
    return (
        <div className={`${Classes.button} ${ClassName}`}>
            {children}
        </div>
    );
}