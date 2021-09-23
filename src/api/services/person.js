import { apiClient } from "../ApiClient";
import { getItem } from "./localStorage";

const token = getItem();
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}

export async function createPers(personData) {
    return apiClient.post('persons', personData, config);
}