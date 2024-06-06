export function checkIfEmailIsValid(mail: string): boolean {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(mail);
}
export function checkIfPasswordIsStrongEnough(password: string): boolean {
  const reg =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  return reg.test(password);
}
export const formatPhoneNumber = (phoneNumber: string | null = null): string | null => {
  if (!phoneNumber) {
    return null;
  }
  let newPhoneNumber = phoneNumber;
  newPhoneNumber = newPhoneNumber
    .trim()
    .replace(/\s+/g, '') // remove spaces
    .replace(/\D/g, ''); // remove non digits
  if (newPhoneNumber.startsWith('330')) {
    newPhoneNumber = newPhoneNumber.substring(2);
  }
  if (newPhoneNumber.startsWith('06') || newPhoneNumber.startsWith('07')) {
    newPhoneNumber = `+33${newPhoneNumber.slice(1)}`;
  } else if (
    newPhoneNumber.startsWith('336') ||
    newPhoneNumber.startsWith('337')
  ) {
    newPhoneNumber = `+${newPhoneNumber}`;
  } else {
    newPhoneNumber = null;
  }
  return newPhoneNumber;
};
export enum FirebaseErrorCode {
  UserNotFound = 'auth/user-not-found',
  InvalidVerificationCode = 'auth/invalid-verification-code',
  ProviderAlreadyLinked = 'auth/provider-already-linked',
  InvalidCredential = 'auth/invalid-credential',
  CredentialAlreadyInUse = 'auth/credential-already-in-use',
  OperationNotAllowed = 'auth/operation-not-allowed',
  InvalidEmail = 'auth/invalid-email',
  WrongPassword = 'auth/wrong-password',
  InvalidVerificationId = 'auth/invalid-verification-id',
  InvalidPhoneNumber = 'auth/invalid-phone-number',
  TooManyRequests = 'auth/too-many-requests',
  EmailAlreadyInUse = 'auth/email-already-in-use'
}
export function handleFirebaseError(code: FirebaseErrorCode): string {
  switch (code) {
    case FirebaseErrorCode.UserNotFound:
      return "Ce compte n'existe pas.";
    case FirebaseErrorCode.InvalidVerificationCode:
      return 'Votre code de validation est incorrect.';
    case FirebaseErrorCode.ProviderAlreadyLinked:
      return 'Ce compte est déjà lié à un utilisateur.';
    case FirebaseErrorCode.InvalidCredential:
      return 'Identifiants incorrects.';
    case FirebaseErrorCode.CredentialAlreadyInUse:
      return 'Ce compte existe déjà ou est déjà lié.';
    case FirebaseErrorCode.OperationNotAllowed:
      return "Le provider n'est pas activé.";
    case FirebaseErrorCode.InvalidEmail:
      return 'Email invalide.';
    case FirebaseErrorCode.WrongPassword:
      return 'Mot de passe incorrect.';
    case FirebaseErrorCode.InvalidVerificationId:
      return 'Impossible de vous authentifié, réessayez dans quelques secondes.';
    case FirebaseErrorCode.InvalidPhoneNumber:
      return 'Numéro de téléphone incorrect.';
    case FirebaseErrorCode.TooManyRequests:
      return 'Nous avons détecté une activité inhabituelle et avons bloqué momentanément votre requête, réessayez dans quelques minutes.';
    case FirebaseErrorCode.EmailAlreadyInUse:
      return 'Il y a déjà un compte avec cette adresse mail.';
    default:
      return code;
  }
}