import { defineStore } from "pinia";
import FirebaseSevice from '~/services/firebaseService'


type sessionType = {
  user: Record<string, any> | null;
  token: string | null;
  status: string;
};

export const auth = defineStore("auth", function () {
  const session: sessionType = reactive({
    user: null,
    token: null,
    status: 'loading'
  });

  function createSession(status: string, token: string, user: Record<string, any>, persistance: boolean) {
    session.status = "authenticated";
    session.token = token;
    session.user = user;
    document.cookie = `auth-token=${token}; max-age=${persistance ? 2592000000 : ''}` // set cookie.
  }

  function destroySession() {
    session.status = "unauthenticated";
    session.token = null;
    session.user = null;
    document.cookie = "auth-token=; max-age=-1" // delete cookie
  }

  async function init() {

    const firebaseSession = await FirebaseSevice.authenticated();

    console.log("===>", firebaseSession);


    if (firebaseSession) {

      const user = await FirebaseSevice.getData('users', firebaseSession.uid)
      session.status = "authenticated";
      session.token = await firebaseSession.getIdToken();
      session.user = user;

    } else {
      document.cookie = "auth-token=; max-age=-1" // delete cookie
      session.status = "unauthenticated";

    }

    watch(session, ({ status }) => {
      if (status === 'authenticated') navigateTo('/')
      else if (status === 'unauthenticated') navigateTo('/signin')
    })

    console.info("session initialized");
  }

  function isAuthenticated() {
    return session.status === 'authenticated'
  }

  function userRole() {
    return session.user?.role;
  }

  async function login(email: string, password: string, remember: boolean) {

    const response: any = { error: null }

    try {
      const user = await FirebaseSevice.login(email, password, remember)
      const data = await FirebaseSevice.getData('users', user.uid)
      createSession('authenticated', await user.getIdToken(), Object(data), remember)

    } catch (e: any) {

      switch (e.code) {
        case 'auth/invalid-email':
          response.error = 'Invalid email'
          break;
        case 'auth/invalid-credential':
          response.error = 'Invalid credentials'
          break;
        case 'auth/too-many-requests':
          response.error = 'Too many attempts account temporary blocked'
          break;
      }

    }

    return response
  }

  async function logout() {
    await FirebaseSevice.logout()
    destroySession()
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
