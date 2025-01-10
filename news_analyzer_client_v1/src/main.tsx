import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import {Provider} from "react-redux";
import store from "./store.tsx";

const container: HTMLInputElement = document.getElementById('root');
if (container) {
    createRoot(container).render(
            <Provider store={store}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Provider>
    );
} else {
    console.error("Root element not found. Make sure you have a div with id='root' in your HTML.");
}
