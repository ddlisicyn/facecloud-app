import { apiClient } from "../ApiClient";
import { getItem } from "./localStorage";

export async function login(credentials) {
    return apiClient.post('login', credentials);
}

export const isLoggedIn = getItem();
