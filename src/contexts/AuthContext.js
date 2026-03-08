import { createContext, useContext } from 'react';

/** Global auth context (no UI here) */
export const AuthContext = createContext(null);

/** Convenience hook */
export const useAuth = () => useContext(AuthContext);
