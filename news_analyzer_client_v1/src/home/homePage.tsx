import analysisImg from "../assets/analysis.png"
import newsImg from "../assets/news.png"
import dbImg from "../assets/db.png"
import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {RouteClient} from "../routers/routeClient.tsx";
import {homeStyle} from "./homeStyle.tsx";

export const HomePage = () => {

    const accessJwt = useSelector((state: RootState) => state.login.accessJwt);
    const navigate: NavigateFunction = useNavigate();

    const clickStart = () => {
        accessJwt ? navigate(RouteClient.NEWS_ANALYZER) : navigate(RouteClient.LOGIN);
    }

    return (
        <div id={`home-page`} className={homeStyle.page}>
            <div className={homeStyle.div}>
                <div className={`${homeStyle.body}`}>

                    <div className={homeStyle.descriptionDiv}>
                        <p className={homeStyle.description}>
                           Please try to push the button "START"!
                        </p>
                        <p className={homeStyle.description}>
                            to enter the page - "News analyzer"
                        </p>
                    </div>

                    <button className={homeStyle.button} onClick={clickStart}>
                        START
                    </button>

                    <img src={analysisImg} alt={`analyzer_icon`} className={homeStyle.analyzerImg}/>
                    <img src={newsImg} alt={`news_icon`} className={homeStyle.newsImg}/>
                    <img src={dbImg} alt={`db_icon`} className={homeStyle.dbImg}/>
                </div>

            </div>
        </div>
    )
}
