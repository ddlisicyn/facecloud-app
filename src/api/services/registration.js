import { apiClient } from "../ApiClient";

export async function registration(credentials) {
    return apiClient.post('users', credentials);
}