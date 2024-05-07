import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {I18nextProvider} from 'react-i18next';
import i18n from 'i18next';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

/*
 * Template to copy in case you want to add a translation (Read the README file)
 */
import translationEL from './locales/el/translation.json';
import questionsEl from './locales/el/questions.json';
import questionnaireEl from './locales/el/questionnaire.json';


translationEL["quiz"] = questionsEl;
translationEL["jtci-questions"] = questionnaireEl;

i18n.init({
    interpolation: {escapeValue: false}, // React already does escaping
    lng: 'el', // Default language
    resources: {
        el: {
            common: translationEL,
        }
    },
}).then(r => {
    console.log("i18n initialized");
});

/*
 * End of template.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>
            </DevSupport>
        </I18nextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
