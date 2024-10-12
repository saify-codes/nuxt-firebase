export default class AuthUtil {
    // Lazy load the store in each method to avoid `getActivePinia() was called but there was no active Pinia`

    static authenticated() {
        const session = useAuth();
        return session.isAuthenticated();
    }

    static user() {
        const session = useAuth();
        return session.session.user;
    }
}
