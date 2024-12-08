import React from 'react';
import { FiltersProvider } from './filtersProvider';
import FormProvider from './formProvider'; 
import { AuthProvider } from './AuthProvider';

const CombinedProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
    <FiltersProvider>
      <FormProvider>
        {children}
      </FormProvider>
    </FiltersProvider>
    </AuthProvider>
  );
};

export default CombinedProvider;
