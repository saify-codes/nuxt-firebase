import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

type User = {
  [key: string]: any;
};

type sessionType = {
  user: User | null;
  token: string | null;
  status: string;
};

export const auth = defineStore("auth", function () {
  const session: sessionType = reactive({
    user: null,
    token: null,
    status: 'loading'
  });

  function createSession(sessionObject: any) {
    session.status = "authenticated";
    session.token = sessionObject.token;
    session.user = sessionObject.user;
    document.cookie = `auth-token=${sessionObject.token}; max-age=${sessionObject.expiry ?? ''}` // set cookie
  }

  function destroySession() {
    session.status = "unauthenticated";
    session.token = null;
    session.user = null;
    document.cookie = "auth-token=; max-age=-1" // delete cookie
  }

  function initializeSession() {

    const token = useCookie('auth-token').value

    if (token) {
      try {
        const data = jwtDecode(token);
        session.status = "authenticated";
        session.token = token;
        session.user = data;

      } catch {
        document.cookie = "auth-token=; max-age=-1" // delete cookie
        session.status  = "unauthenticated";
        navigateTo('/signin')
      }
    }else{
      session.status = "unauthenticated";
    }

    console.info("session initialized", session);
  }

  function isAuthenticated() {
    return session.status === 'authenticated'
  }

  function userRole() {
    return session.user?.role;
  }

  return {
    session,
    userRole,
    isAuthenticated,
    createSession,
    destroySession,
    initializeSession,
  };


});
