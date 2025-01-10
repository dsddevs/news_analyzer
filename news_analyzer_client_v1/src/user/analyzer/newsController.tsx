import {createAsyncThunk} from "@reduxjs/toolkit";
import {api, RouteServer} from "../../routers/routeServer.tsx";
import {ErrorMode} from "../../error/errorMode.tsx";

interface NewsAnalyzerData {
    totalWordCount: number;
    totalDuplicatedWordCount: number;
    sentenceCount: number;
    duplicatedWords: Record<string, number>;
    siteName: string;
    articleTopic: string;
    published: string;
}

export interface NewsServerData {
    success: boolean;
    data: NewsAnalyzerData;
    errorMessage?: string;
}

export const newsAnalyzerController = async (url: string): Promise<NewsServerData> => {
    try {
        const response = await api.post<NewsServerData>(RouteServer.API_NEWS_ANALYZER, {url: url.trim()});
        return response.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 403) {
                throw new Error(ErrorMode.ACCESS_DENIED)
            }
            throw new Error(error.response.data?.message || ErrorMode.SERVER_ERROR);
        }
        throw new Error(ErrorMode.NETWORK_CONNECTION);
    }
};

export const fetchNewsMetrics = createAsyncThunk(
    "news/fetchNewsMetrics",
    async (url: string, {rejectWithValue}) => {
        try {
            const response: NewsServerData = await newsAnalyzerController(url);
            if (!response.success) {
                return rejectWithValue(response.errorMessage || ErrorMode.UNKNOWN);
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || ErrorMode.NEWS_METRICS);
        }
    }
);