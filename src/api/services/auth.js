import { apiClient } from "../ApiClient";

export async function login(credentials) {
    return apiClient.post('login', credentials);
}