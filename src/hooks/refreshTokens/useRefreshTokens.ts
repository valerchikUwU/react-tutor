import { useState } from 'react'
import { RefreshTokensService } from '../../services/refreshTokensService/refreshTokensService'

export const useRefreshToken = (fingerprint: string | null) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {
        setLoading(true);
        try {
            if (fingerprint == null) {
                window.location.href = '/'
                throw Error('No fingerprint in storage')
            }
            const data = await RefreshTokensService.refreshTokens(fingerprint);
            localStorage.setItem('accessToken', data)
            return data
        }
        catch (err) {
            console.log(err)
            setError('Failed to refresh tokens');
            window.location.href = '/'
        }
        finally {
            setLoading(false);
        }

    }
    return {refresh, loading, error}
}

