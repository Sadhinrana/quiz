import Classes from "../styles/Summary.module.css";
import defaultImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import {useMemo} from "react";

export default function Summary({score, noq}) {
    const getKeyword = useMemo(() => {
        const scorePercentage = score / (noq * 5) * 100;

        if (scorePercentage < 50) {
            return 'failed';
        } else if (scorePercentage < 75) {
            return 'good';
        } else if (scorePercentage < 100) {
            return 'very good';
        } else {
            return 'excellent';
        }
    }, [noq, score]);

    const {loading, error, result} = useFetch(
        `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`,
        'GET',
        {
            Authorization: process.env.REACT_APP_PEXELS_API_KEY
        }
    );

    const image = result ? result?.photos[0].src.medium : defaultImage;

    return (
        <div className={Classes.summary}>
            <div className={Classes.point}>
                <p className={Classes.score}>
                    Your score is <br/>
                    {score} out of {5 * noq}
                </p>
            </div>

            {loading && <div className={Classes.badge}>Loading ...</div>}
            {error && <div className={Classes.badge}>{error}</div>}

            {
                !loading && !error && (
                    <div className={Classes.badge}>
                        <img src={image} alt="Success"/>
                    </div>
                )
            }
        </div>
    );
}