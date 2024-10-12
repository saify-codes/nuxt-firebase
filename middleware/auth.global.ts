import type { RouteLocationNormalized } from "vue-router";

const authRoutes = ["/signin", "/signup"];
const publicRoutes = [
  ...authRoutes,
  /*Add more routes here*/
];

export default async function defineNuxtRouteMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  if (!Auth.authenticated() && !publicRoutes.includes(to.path)) {
    return navigateTo("/signin");
  } else if (Auth.authenticated() && authRoutes.includes(to.path)) {
    return navigateTo("/dashboard");
  }
}
