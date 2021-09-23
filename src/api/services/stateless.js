import { apiClient } from "../ApiClient";
import { getItem } from "./localStorage";

const token = getItem();
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'image/jpeg'
    }
}

export async function detect(data) {
    return apiClient.upload('detect?demographics=true', data, config);
}