import { apiClient } from '../ApiClient';
import { getAuth } from './helper';

export async function createPhoto(photo, personId, bbox) {
    const config = getAuth();
    config.headers['Content-Type'] = 'image/jpeg';
    const {x, y, width, height} = bbox;
    const link = `photos?face=${x},${y},${width},${height}&person_id=${personId}`;
    return apiClient.upload(link, photo, config);
}

export async function getFace(photoId) {
    const config = getAuth();
    config.headers['Content-Type'] = 'image/jpeg';
    config.headers['accept'] = 'image/jpeg';
    return apiClient.get(`photos/${photoId}/image/face`, config, 'blob');
}