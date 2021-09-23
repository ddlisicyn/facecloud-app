import { apiClient } from "../ApiClient";
import { getItem } from "./localStorage";

const token = getItem();
const header = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
const payload = {
    data: {
        some_data: []
    }
}

export async function getLists() {
    return apiClient.get('databases', header);
}

export async function createDB() {
    return apiClient.post('databases', payload, header);
}