import { createContext, useEffect } from 'react';

export const UserContext = createContext({ user: null, username: null, loading: true });