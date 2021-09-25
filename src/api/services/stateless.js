import { apiClient } from '../ApiClient';
import { getAuth } from './helper';

export async function detect(data) {
    const config = getAuth();
    config.headers['Content-Type'] = 'image/jpeg';

    return apiClient.upload(
        'detect?demographics=true', 
        data, 
        config
    );
}