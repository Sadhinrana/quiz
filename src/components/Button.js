import Classes from "../styles/Button.module.css";

export default function Button({ClassName, children, ...rest}) {
    return (
        <button className={`${Classes.button} ${ClassName}`} {...rest}>
            {children}
        </button>
    );
}