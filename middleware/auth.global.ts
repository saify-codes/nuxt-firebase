import type { RouteLocationNormalized } from "vue-router";
import { authRoutes, publicRoutes } from "~/routes";

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {

  const token = useCookie('auth-token').value

  if (!token && !publicRoutes.includes(to.path)) {
    return navigateTo('/signin'); // Redirect to login page
  } else if (token && authRoutes.includes(to.path)) {
    return navigateTo('/dashboard'); // Redirect authenticated users away from auth pages
  }
  
});

