export const setItem = (token) => localStorage.setItem('Token', token);

export const removeItem = () => localStorage.removeItem('Token');

export const getItem = () => localStorage.getItem('Token');
