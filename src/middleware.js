import store from '@/store';

export default function isAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated) {
    next(); // l'utilisateur est authentifié, continuez à la page demandée
  } else {
    next('/authentification'); // l'utilisateur n'est pas authentifié, redirigez vers la page de connexion
  }
}
