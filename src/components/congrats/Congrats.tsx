import React from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import stringsModule from '../../helpers/strings';

export interface ICongratsProps {
    success?: boolean;
}

/**
 * Functional react component for congratulary message
 * @function
 * @param {ICongratsProps} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` props is)
 */
export default (props: ICongratsProps) => {
    const language = React.useContext(LanguageContext);

    let res = !!props.success ? (
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