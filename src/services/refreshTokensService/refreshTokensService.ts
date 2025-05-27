import axios from "../../api/axios";


export const RefreshTokensService = {
    async refreshTokens(fingerprint: string): Promise<string> {
        try {
            const response = await axios.post(
                `/auth/refresh-tokens`,
                { fingerprint: fingerprint }
            );
            return response.data.newAccessToken
        }
        catch (err) {
            console.error('Error refreshing tokens:', err);
            throw err;
        }
    }
}