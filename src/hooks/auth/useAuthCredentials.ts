import { useEffect, useState } from "react"
import { AuthCredentials } from "../../types/authCredentials"
import { AuthService } from "../../services/authService/authService";


export const useAuthCredentials = (userAgent: string) => {
    const [authCredentials, setAuthCredentials] = useState<AuthCredentials>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchCredentials = async () => {
          setLoading(true);
          try {
            const data = await AuthService.getAuthCredentials(userAgent);
            setAuthCredentials(data);
          } catch (err) {
            setError('Failed to fetch organizations');
          } finally {
            setLoading(false);
          }
        };
        fetchCredentials();
      }, [userAgent]);
    
      return { authCredentials, loading, error };
}