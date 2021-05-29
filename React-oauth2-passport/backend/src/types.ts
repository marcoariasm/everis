// export interface IUser {
//     googleId?: string;
//     githubId?: string;
//     username: string
// }

export interface IMongoDBUser {
    __v: number;
    _id: string;
    googleId?: string;
    githubId?: string;
    username: string
}