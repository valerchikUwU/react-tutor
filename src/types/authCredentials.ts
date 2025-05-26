export type AuthCredentials = {
    user_agent: string;
  
    tokenForTG: string;
  
    codeVerifier: string;
  
    code_challenge: string;
  
    state: string;
  
    isLogged: boolean;
  
    userId: string;
  
}