
export interface User {
    id:number;
    name:string | null;
    email:string;
    role:string;
    createdAt:string;
    updateAt:string;
}

export interface AuthState {
    user:User | null;
    isAuthenticated:boolean;
    isLoading:boolean;
    error:string | null;
}
