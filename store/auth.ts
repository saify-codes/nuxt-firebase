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

  function createSession(sessionObject: any, expiry: number | null = null) {
    session.status = "authenticated";
    session.token = sessionObject.token;
    session.user = sessionObject.user;
    document.cookie = `auth-token=${sessionObject.token}; max-age=${expiry ?? ''}` // set cookie
  }

  function destroySession() {
    session.status = "unauthenticated";
    session.token = null;
    session.user = null;
    document.cookie = "auth-token=; max-age=-1" // delete cookie
  }

  function init() {

    const token = useCookie('auth-token').value

    if (token) {
      try {
        const data = jwtDecode(token);
        session.status = "authenticated";
        session.token = token;
        session.user = data;

      } catch {
        document.cookie = "auth-token=; max-age=-1" // delete cookie
        session.status = "unauthenticated";
        navigateTo('/signin')
      }
    } else {
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

  function login(email: string, pass: string, remember?: number) {

    const x = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTIzNDU2Nzg5MCIsImVtYWlsIjoiSm9obiBEb2UiLCJhdmF0YXIiOjE1MTYyMzkwMjJ9.XJhBR9EzNLg23fn5OrX7J30BJeDKNdKUnbke72eAPpk',
      user: {
        name: 'anas',
        email: 'anas@gmail.com',
        avatar: 'avatar.png'
      }
    }

    createSession(x, remember)
    navigateTo('/')

    

  }

  function logout() {
    destroySession()
    navigateTo('/signin')
  }

  return {
    session,
    userRole,
    isAuthenticated,
    init,
    login,
    logout
  };


});
