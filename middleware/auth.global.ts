import type { RouteLocationNormalized } from "vue-router";

const authRoutes = ["/signin", "/signup"];
const publicRoutes = [
  ...authRoutes,
  /*Add more routes here*/
];

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  const { session } = useAuth();

  watch(session, async ({ status }) => {

    if (status === 'unauthenticated' && !publicRoutes.includes(to.path)) {
      return navigateTo('/signin'); // Redirect to login page
    }

    if (status === 'authenticated' && authRoutes.includes(to.path)) {
      return navigateTo('/dashboard'); // Redirect authenticated users away from auth pages
    }

  })

});

