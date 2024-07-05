"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfEmailIsValid = checkIfEmailIsValid;
exports.checkIfPasswordIsStrongEnough = checkIfPasswordIsStrongEnough;
exports.formatPhoneNumber = void 0;
exports.handleFirebaseError = handleFirebaseError;

type FirebaseErrorCode = 
  | 'auth/user-not-found'
  | 'auth/invalid-verification-code'
  | 'auth/provider-already-linked'
  | 'auth/invalid-credential'
  | 'auth/credential-already-in-use'
  | 'auth/operation-not-allowed'
  | 'auth/invalid-email'
  | 'auth/wrong-password'
  | 'auth/invalid-verification-id'
  | 'auth/invalid-phone-number'
  | 'auth/too-many-requests'
  | 'auth/email-already-in-use';

function checkIfEmailIsValid(mail: string): boolean {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(mail);
}

function checkIfPasswordIsStrongEnough(password: string): boolean {
  const reg = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  return reg.test(password);
}

const formatPhoneNumber = function (phoneNumber: string | null = null): string | null {
  if (!phoneNumber) {
    return null;
  }

  let newPhoneNumber = phoneNumber;
  newPhoneNumber = newPhoneNumber.trim().replace(/\s+/g, '') // remove spaces
  .replace(/\D/g, ''); // remove non digits

  if (newPhoneNumber.startsWith('330')) {
    newPhoneNumber = newPhoneNumber.substring(2);
  }

  if (newPhoneNumber.startsWith('06') || newPhoneNumber.startsWith('07')) {
    newPhoneNumber = `+33${newPhoneNumber.slice(1)}`;
  } else if (newPhoneNumber.startsWith('336') || newPhoneNumber.startsWith('337')) {
    newPhoneNumber = `+${newPhoneNumber}`;
  } else {
    newPhoneNumber = null;
  }

  return newPhoneNumber;
};

exports.formatPhoneNumber = formatPhoneNumber;

function handleFirebaseError(code: FirebaseErrorCode): string {
  switch (code) {
    case 'auth/user-not-found':
      return "Ce compte n'existe pas.";

    case 'auth/invalid-verification-code':
      return 'Votre code de validation est incorrect.';

    case 'auth/provider-already-linked':
      return 'Ce compte est déjà lié à un utilisateur.';

    case 'auth/invalid-credential':
      return 'Identifiants incorrects.';

    case 'auth/credential-already-in-use':
      return 'Ce compte existe déjà ou est déjà lié.';

    case 'auth/operation-not-allowed':
      return "Le provider n'est pas activé.";

    case 'auth/invalid-email':
      return 'Email invalide.';

    case 'auth/wrong-password':
      return 'Mot de passe incorrect. Celui-ci doit contenir plus de 6 caractères.';

    case 'auth/invalid-verification-id':
      return 'Impossible de vous authentifié, réessayez dans quelques secondes.';

    case 'auth/invalid-phone-number':
      return 'Numéro de téléphone incorrect.';

    case 'auth/too-many-requests':
      return 'Nous avons détecté une activité inhabituelle et avons bloqué momentanément votre requête, réessayez dans quelques minutes.';

    case 'auth/email-already-in-use':
      return 'Il y a déjà un compte avec cette adresse mail.';

    default:
      return code;
  }
}
//# sourceMappingURL=signupActions.js.map
