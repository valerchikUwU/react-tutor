// hooks/auth/useAuthCookie.ts
import { useCallback } from "react";
import { AuthService } from "../../services/authService/authService";

export const useSetCookie = () => {
  const setCookie = useCallback(
    async (accessToken: string, refreshTokenId: string) => {
      try {
        await AuthService.setCookie(accessToken, refreshTokenId);
        return true;
      } catch (err) {
        console.error("Ошибка установки куки:", err);
        return false;
      }
    },
    []
  );

  return setCookie; // Возвращаем функцию, а не результат её вызова
};