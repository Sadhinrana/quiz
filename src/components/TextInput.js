import Classes from "../styles/TextInput.module.css";

export default function Form({icon, ...rest}) {
    return (
        <div className={Classes.textInput}>
            <input {...rest}/>
            <span className="material-icons-outlined"> {icon} </span>
        </div>
    );
}