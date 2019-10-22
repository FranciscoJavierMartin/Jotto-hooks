import React from 'react';

const successContext = React.createContext(false);

/**
 * @function useSuccess
 * @returns {array} successContext value, which is a state of [value, setter]
 */
function useSuccess(){
  const context = React.useContext(successContext);

  if(!context){
    throw new Error('useSuccess must be used within a SuccessProvider');
  }

  return context;
}

interface ISuccessProviderProps {

}

/**
 * @function SuccessProvider
 * @param {ISuccessProviderProps} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function SuccessProvider(props: ISuccessProviderProps){
  const [success, setSuccess] = React.useState(false);

  const value: boolean = React.useMemo(() => [success, setSuccess], [success]) as any;

  return <successContext.Provider value={value} {...props}/>
}

export default { SuccessProvider, useSuccess }