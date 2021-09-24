import { apiClient } from "../ApiClient";
import { getAuth } from "./helper";

export async function createPers(personData) {
    return apiClient.post('persons', personData, getAuth());
}

export async function updatePers(personId, personData) {
    return apiClient.post(`persons/${personId}`, personData, getAuth());
}

export async function deletePers(personId) {
    return apiClient.delete(`persons/${personId}`, getAuth());
}

export async function getPhotos(personId) {
    return apiClient.get(`persons/${personId}/photos`, getAuth());
}