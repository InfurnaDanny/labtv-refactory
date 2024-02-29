export interface Login {
    accessToken: string,
    user: {
        username: string,
        id: string,
        email:string
    }
}