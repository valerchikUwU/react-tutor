import { useEffect } from "react"
import { useRefreshToken } from "./refreshTokens/useRefreshTokens"
import { axiosSecure } from "../api/axios"

export const useAxiosSecure = () => {
  const accessToken = localStorage.getItem('accessToken')
  const refresh = useRefreshToken(localStorage.getItem('fingerprint'))

  useEffect(() => {
    const requestIntercept = axiosSecure.interceptors.request.use(
      (config) => {
        if (!config.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (err) => Promise.reject(err)
    )
    const responseIntercept = axiosSecure.interceptors.response.use(
      (response) => response,
      async (err) => {
        const sentRequest = err?.config;
        if (err?.response?.status === 401 && !sentRequest?.sent) {
          sentRequest.sent = true
          const newAccessToken = await refresh.refresh();
          sentRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosSecure(sentRequest)
        }
        return Promise.reject(err)
      }
    )

    return () => {
      axiosSecure.interceptors.response.eject(responseIntercept)
      axiosSecure.interceptors.request.eject(requestIntercept)
    }
  }, [accessToken, refresh])
  return axiosSecure
}

