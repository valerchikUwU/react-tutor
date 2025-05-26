import axios from "../../api/axios";


export const RefreshTokensService = {
    async refreshTokens(fingerprint: string): Promise<string> {
        try {
            console.log(axios)
            const response = await axios.post(
                `/auth/refresh-tokens`,
                { fingerprint: fingerprint }
            );
            return response.data
        }
        catch (err) {
            console.error('Error refreshing tokens:', err);
            throw err;
        }
    }
}