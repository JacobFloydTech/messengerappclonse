export type JWTUser = { 
    id: number,
    email: string,
    name: string,
    password: string,
    iat: number,
    exp: number
}