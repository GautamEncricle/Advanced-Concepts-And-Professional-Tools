export const fakeAuth = {
    isAuthorized: false,
    login(cb) {
        this.isAuthorized = true;
        setTimeout(cb, 100); // fake async
    },
    logout(cb) {
        this.isAuthorized = false;
        setTimeout(cb, 100);
    }
}