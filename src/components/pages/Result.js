import Summary from "../Summary";
import Analysis from "../Analysis";
import {useLocation, useParams} from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import _ from "lodash";

export default function Result() {
    const {id} = useParams();
    const {loading, error, answers} = useAnswers(id);
    const location = useLocation();
    const qna = location.state;
    
    const calculateScore = () => {
        let score = 0;

        answers.forEach((question, qesIndex) => {
            let correctIndexes = [],
                checkedIndexes = [];

            question.options.forEach((option, optIndex) => {
                if (option.correct) correctIndexes.push(optIndex);
                if (qna[qesIndex].options[optIndex].checked) {
                    checkedIndexes.push(optIndex);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score += 5;
            }
        });

        return score;
    }

    return (
        <>
            {loading && <div>Loading ...</div>}
            {error && <div>{error}</div>}
            {
                !loading && !error && qna && qna.length && (
                    <>
                        <Summary score={calculateScore()} noq={answers.length} />
                        <Analysis answers={answers} />
                    </>
                )
            }
        </>
    );
}