import {
    ActionCreatorWithPreparedPayload,
    ActionReducerMapBuilder,
    createSlice,
    Draft,
    PayloadAction
} from "@reduxjs/toolkit";
import {fetchNewsMetrics, NewsServerData} from "./newsController.tsx";

interface NewsState {
    loading: boolean;
    data: NewsServerData["data"] | null;
    error: string | null;
}

const initialState: NewsState = {
    loading: false,
    data: {
        totalWordCount: 0,
        totalDuplicatedWordCount: 0,
        sentenceCount: 0,
        duplicatedWords: {},
        siteName: '',
        articleTopic: '',
        published: ''
    },
    error: null,
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearData: (state) => {
            state.data = {
                totalWordCount: 0,
                totalDuplicatedWordCount: 0,
                sentenceCount: 0,
                duplicatedWords: {},
                siteName: '',
                articleTopic: '',
                published: ''
            };
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<NewsState>) => {
        builder
            .addCase(fetchNewsMetrics.pending, (state: Draft<NewsState>) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsMetrics.fulfilled, (
                state: Draft<NewsState>,
                action: ReturnType<ActionCreatorWithPreparedPayload<any, any>>
            ) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNewsMetrics.rejected, (state: Draft<NewsState>, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setError,
    clearError,
    clearData
} = newsSlice.actions;
export default newsSlice.reducer;