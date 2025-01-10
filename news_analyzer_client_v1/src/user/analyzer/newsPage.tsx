import {NewsSearcher} from "./newsSearcher.tsx";
import {NewsCounts} from "./newsCounts.tsx";
import {NewsTopics} from "./newsTopics.tsx";
import {newsStyle} from "./newsStyle.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.tsx";
import {clearData, clearError} from "./newsSlider.tsx";
import React, {Dispatch, useEffect} from "react";

export const NewsPage = () => {
    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const {data, loading, error} = useSelector((state: RootState) => state.news);

    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearData());
        };
    }, [dispatch]);

    return (
        <div id={`news-analyzer-page`} className={newsStyle.pageBase}>
            <div className={newsStyle.pageDiv}>
                <NewsSearcher/>
                {error && (
                    <div className="text-red-500 text-center mt-4">{error}</div>
                )}
                <div className={newsStyle.page}>
                    <div className={newsStyle.topicDiv}>
                        <NewsTopics name={`SOURCE`}>
                            {data.siteName || 'N/A'}
                        </NewsTopics>
                        <NewsTopics name={`ARTICLE'S TOPIC`}>
                            {data.articleTopic || 'N/A'}
                        </NewsTopics>
                        <NewsTopics name={`PUBLISHED`}>
                            {data.published || 'N/A'}
                        </NewsTopics>
                    </div>
                    <div className={newsStyle.countDiv}>
                        <NewsCounts name={`Total Words Count`}>
                            {loading ? '...' : data.totalWordCount}
                        </NewsCounts>
                        <NewsCounts name={`Top Words Count`}>
                            {loading ? '...' : data.totalDuplicatedWordCount}
                        </NewsCounts>
                        <NewsCounts name={`Sentences Count`}>
                            {loading ? '...' : data.sentenceCount}
                        </NewsCounts>
                    </div>
                    <div className={newsStyle.duplicatedWordsDiv}>
                        <h2 className={newsStyle.sectionTitle}>TOP WORDS</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {Object.entries(data.duplicatedWords)
                                .sort(([, a], [, b]) => b - a)
                                .map(([word, count]) => (
                                    <div key={word} className={newsStyle.wordCard}>
                                        <span className="font-medium text-white/90">{word}</span>
                                        <span className="text-white/70 ml-2">{count}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
