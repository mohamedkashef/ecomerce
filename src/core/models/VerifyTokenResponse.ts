export interface VerifyTokenResponse {
    message: string,
    decoded:{
      id: string,
      name: string,
      role: string,
      iat: number,
      exp: number
    }


}
