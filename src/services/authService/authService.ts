import axios from 'axios';
import { AuthCredentials } from '../../types/authCredentials';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const AuthService = {
    async getAuthCredentials(userAgent: string): Promise<AuthCredentials> {
        try {
            const response = await axios.get(`${API_BASE_URL}/`, {
                headers: {
                    "User-Agent": userAgent
                },
                withCredentials: true
            });
            return response.data;
        } catch (err) {
            console.error('Error getting auth:', err);
            throw err;
        }
    },

    async setCookie(accessToken: string, refreshTokenId: string): Promise<void> {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/set-cookie`, {refreshTokenId: refreshTokenId}, {
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
                withCredentials: true,
            })
            return response.data;
        }
        catch (err) {
            console.error('Error setting cookie:', err);
            throw err;
        }
    }
};
