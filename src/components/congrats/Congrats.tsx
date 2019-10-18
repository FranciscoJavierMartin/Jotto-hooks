import React from 'react';

export interface ICongratsProps {
    success?: boolean;
}

/**
 * Functional react component for congratulary message
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if `success` props is)
 */
export default (props: ICongratsProps) => {
    let res = !!props.success ? (
        <div data-test="component-congrats" className="alert alert-success">
            <span data-test="congrats-message">
                Congratulations! You guessed the word!
            </span>
        </div>
    ) : (
        <div data-test="component-congrats" />
    );

    return res;
}