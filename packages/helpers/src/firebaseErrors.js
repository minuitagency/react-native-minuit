export default function firebaseErrors(code) {
  switch (code) {
    case 'auth/provider-already-linked':
      return 'Ce compte est déjà lié à cet utilisateur.';
    case 'auth/invalid-credential':
      return 'Identifiants incorrects.';
    case 'auth/credential-already-in-use':
      return 'Ce compte existe déjà ou est déjà lié.';
    case 'auth/email-already-in-use':
      return 'Ce compte existe déjà.';
    case 'auth/operation-not-allowed':
      return "Le provider n'est pas activé.";
    case 'auth/invalid-email':
      return 'Email invalide.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/invalid-verification-code':
      return 'Code de vérification incorrect.';
    case 'auth/invalid-verification-id':
      return 'Impossible de vous authentifié, réessayez dans quelques secondes.';
    case 'auth/invalid-phone-number':
      return 'Numéro de téléphone incorrect.';
    case 'auth/too-many-requests':
      return 'Nous avons détecté une activité inhabituelle et avons bloqué momentanément votre requête, réessayez dans quelques minutes.';
    default:
      return 'Erreur inconnue';
  }
}
