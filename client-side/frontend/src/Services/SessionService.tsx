import React from 'react';

class SessionService{
    loginAndCreatSession(id: number, role: string, token: string): void{
        sessionStorage.setItem("ID", id.toString());
        sessionStorage.setItem("ROLE", role);
        sessionStorage.setItem("AUTH_TOKEN", token);
        
    }

    logoutAndDestroySession(): void{
        sessionStorage.removeItem("ID")
        sessionStorage.removeItem("ROLE");
        sessionStorage.removeItem("AUTH_TOKEN");
        sessionStorage.clear();
    
    }

    isUserLoggedIn(): boolean{
        return !(sessionStorage.getItem("ID") == null && sessionStorage.getItem("ROLE") == null && sessionStorage.getItem("AUTH_TOKEN") == null);
    }

    getLoggedInUserId(): number{
        return parseInt(sessionStorage.getItem("ID") as string);
    }

    getLoggedInUserRole(): string{
        return (sessionStorage.getItem("ROLE") as string);
    }

    getLoggedInUserToken(): string{
        return (sessionStorage.getItem("AUTH_TOKEN") as string);
    }
}

export default SessionService;
