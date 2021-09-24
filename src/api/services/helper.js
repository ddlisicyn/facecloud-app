import { getItem } from "./localStorage";

export const getAuth = () => ({
    headers: {
        Authorization: `Bearer ${getItem()}`
    }
})