import { createContext, useContext } from 'react';

export interface FormContextType {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
