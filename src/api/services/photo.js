import { apiClient } from "../ApiClient";
import { getItem } from "./localStorage";

const token = getItem();
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'image/jpeg'
    }
}

export async function createPhoto(photo, personId, bbox) {
    const {x, y, width, height} = bbox;
    const link = `photos?face=${x},${y},${width},${height}&person_id=${personId}`;
    return apiClient.upload(link, photo, config);
}