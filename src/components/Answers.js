import Classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
import {Fragment} from "react";

export default function Answers({options = [], handleChange, input}) {
    return (
        <div className={Classes.answers}>
            {
                options.map((option, index) => (
                    <Fragment key={index}>
                        {input ? (
                            <Checkbox className={Classes.answer}
                                      key={index}
                                      text={option.title}
                                      value={index}
                                      checked={option.checked}
                                      onChange={(e) => handleChange(e, index)}
                            />
                        ) : (
                            <Checkbox className={`${Classes.answer} ${
                                option.correct 
                                    ? Classes.correct 
                                    : option.checked 
                                        ? Classes.wrong 
                                        : null   
                            }`}
                                      key={index}
                                      text={option.title}
                                      defaultChecked={option.checked}
                                      disabled
                            />
                        )}
                    </Fragment>
                ))
            }
        </div>
    );
}