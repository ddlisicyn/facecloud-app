import { apiClient } from "../ApiClient";
import { getAuth } from "./helper";

const payload = {
    data: {
        some_data: []
    }
}

export async function getLists() {
    return apiClient.get('databases', getAuth());
}

export async function createDB() {
    return apiClient.post('databases', payload, getAuth());
}

export async function getPersons(databaseId) {
    return apiClient.get(`databases/${databaseId}/persons`, getAuth())
}