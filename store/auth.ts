import { defineStore } from "pinia";

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
    status: 'loading',
  });

  function createSession(sessionObject: any) {
    session.status = "authenticated";
    session.token = sessionObject.token;
    session.user = sessionObject.user;
  }

  function destroySession() {
    session.status = "unauthenticated";
    session.token = null;
    session.user = null;

    localStorage.removeItem("auth-session");
  }

  function initializeSession() {
    
    const json      = localStorage.getItem("auth-session");
    
    if (json) {
      const { token, user } = JSON.parse(json);
      session.status = "authenticated";
      session.token = token;
      session.user = user;
    } else {
      session.status = "unauthenticated";
    }

    console.info("session initialized");
  }

  function isAuthenticated() {
    return session.status == "authenticated"
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
