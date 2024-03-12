import { createContext } from 'react';

const defaultLocale = 'id';

const LocaleContext = createContext(defaultLocale);

export default LocaleContext;