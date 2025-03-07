import React, {PropsWithChildren, useState} from 'react';
import {APIError, APIErrorsSource} from "../types";



const ErrorsContext = React.createContext<{
  errors: APIError[],
  addError: (error: APIError) => void,
  getError: (source: APIErrorsSource) => APIError | null,
  deleteError: (source: APIErrorsSource) => void
}>({
  errors: [],
  addError: (error: APIError) => {},
  getError: (source: APIErrorsSource) => null,
  deleteError: (source: APIErrorsSource) => {}
});

const ErrorsProvider = ({children}: PropsWithChildren<{}>) => {
  const [errors, setErrors] = useState<APIError[]>([]);

  const addError = (error: APIError) => {
    setErrors([...errors, error]);
  }

  const getError = (source: APIErrorsSource) => {
    return errors.find((error) => error.source === source) || null;
  }

  const deleteError = (source: APIErrorsSource) => {
    setErrors(errors.filter((error) => error.source !== source));
  }

  return (
    <ErrorsContext.Provider value={{errors, addError, getError, deleteError}}>{children}</ErrorsContext.Provider>
  );
};

export {ErrorsContext, ErrorsProvider};