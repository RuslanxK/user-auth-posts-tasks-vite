import React, { useState } from 'react';
import { FormContext, FormContextType } from './formContext';

const FormProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const contextValue: FormContextType = {
    title,
    setTitle,
    description,
    setDescription,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
