import {configureStore} from '@reduxjs/toolkit';
import registerReducer from './register/registerSlice.tsx';
import loginReducer from './login/loginSlice.tsx';
import verificationReducer from './otp/otpSlice.tsx';
import recoveryReducer from './recovery/recoverySlice.tsx'
import newsReducer from './user/analyzer/newsSlider.tsx'

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        verification: verificationReducer,
        recovery: recoveryReducer,
        news: newsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
