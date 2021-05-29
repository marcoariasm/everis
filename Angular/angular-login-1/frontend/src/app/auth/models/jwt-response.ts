export interface IJwtResponse {
    dataUser: {
        id: number,
        name: string,
        email: string,
        accessToken: string, // sera guardado en el LS
        expiresIn: string
    }
}
