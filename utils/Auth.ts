export default class AuthUtil {
    // Lazy load the store in each method to avoid `getActivePinia() was called but there was no active Pinia`

    static authenticated() {
        return useAuth().isAuthenticated();
    }

    static get user() {
        const { session } = useAuth();
        return session.user;
    }
}
