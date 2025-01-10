import React, {ChangeEvent, Dispatch, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store.tsx";
import {fetchNewsMetrics} from "./newsController.tsx";
import {newsStyle} from "./newsStyle.tsx";
import {setError} from "./newsSlider.tsx";
import {IoSearch} from 'react-icons/io5';
import {accessJwtString} from "../../access/accessManager.tsx";
import {setAccessJwt} from "../../access/setAccessJwt.tsx";
import {ErrorMode} from "../../error/errorMode.tsx";

const LoaderForAnalyzerButton: React.FC = () => {
    return (
        <div className={newsStyle.loaderDiv}>
            <div className={newsStyle.loader}></div>
            Analyzing...
        </div>
    )
}

export const NewsSearcher: React.FC = () => {
    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const [url, setUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const accessJwt: string = accessJwtString();

    useEffect(() => {
        if (accessJwt) {
            setAccessJwt(accessJwt);
        } else {
            setError('Authentication required');
        }
    }, [accessJwt]);

    const pushSearchButton = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!accessJwt) {
            setError('Please login first');
            return;
        }

        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        try {
            new URL(url.trim());
        } catch (e) {
            setError('Please enter a valid URL');
            return;
        }

        setIsSubmitting(true);
        try {
            await dispatch(fetchNewsMetrics(url.trim())).unwrap();
        } catch (error: any) {
            setError(error.message || ErrorMode.ANALYZER_FAILED);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={pushSearchButton} className={newsStyle.searchBase}>
            <div className={newsStyle.searchDiv}>
                <IoSearch className={newsStyle.searchIcon}/>
            </div>

            <input id="default-search"
                   type="url"
                   value={url}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                   disabled={isSubmitting}
                   className={newsStyle.searchInput}
                   placeholder="Enter Article URL..." required/>

            <button type="submit"
                    disabled={isSubmitting}
                    className={newsStyle.searchBtn}>
                {isSubmitting ? ( <LoaderForAnalyzerButton/>) : ('Search')}
            </button>
        </form>
    )
}