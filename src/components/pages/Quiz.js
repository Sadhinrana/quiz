import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import useQuestions from "../../hooks/useQuestions";
import _ from "lodash";
import {useAuth} from "../../contexts/AuthContext";
import {getDatabase, ref, set} from "firebase/database";

const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                });
            });
            return action.value;
        case 'answer':
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state;
    }
}

export default function Quiz() {
    const {id} = useParams();
    const {loading, error, questions} = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const {currentUser} = useAuth();
    const location = useLocation();
    const title = location.state?.title;
    const navigate = useNavigate();

    const [qna, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions,
        });
    }, [questions]);

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: "answer",
            questionId: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    }

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prevQuestion => prevQuestion - 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion <= questions.length) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
        }
    };

    const submit = async () => {
        const {uid} = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        });

        navigate(`/result/${id}`, {state: qna});
    }

    const percentage = questions.length ? ((currentQuestion + 1) / questions.length * 100) : 0;

    return (
        <>
            {loading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {
                !loading && !error && qna && qna.length && (
                    <>
                        <h1>{qna[currentQuestion].title}</h1>
                        <h4>Question can have multiple answers</h4>
                        <Answers
                            input={true}
                            options={qna[currentQuestion].options}
                            handleChange={handleAnswerChange}
                        />
                        <ProgressBar
                            prev={prevQuestion}
                            next={nextQuestion}
                            progress={percentage}
                            submit={submit}
                        />
                        <MiniPlayer videoId={id} title={title} />
                    </>
                )
            }
        </>
    );
}