import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import stringsModule from '../../helpers/strings';

/*export interface ICongratsProps {
    success?: boolean;
}*/

/**
 * Functional react component for congratulary message
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` props is)
 */
export default () => {
    const [success] = SuccessContext.useSuccess();
    const language = React.useContext(LanguageContext);

    let res = !!success ? (
        <div data-test="component-congrats" className="alert alert-success">
            <span data-test="congrats-message">
                {stringsModule.getStringByLanguage(language, 'congrats')}
            </span>
        </div>
    ) : (
        <div data-test="component-congrats" />
    );

    return res;
}