import ReactN from 'reactn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function addToFavorites(seller, itemToAdd) {
  const favorites = Array.from(ReactN.getGlobal().favorites);

  const sellerIndex = favorites.findIndex(favorite => {
    return favorite.id === seller.id;
  });
  const sellerAlreadyInFavorites = sellerIndex !== -1;

  const favoriteRef = firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('favorites')
    .doc(seller.id);

  if (sellerAlreadyInFavorites) {
    const itemIndex = favorites[sellerIndex].products.findIndex(itemId => {
      return itemId === itemToAdd.id;
    });
    const itemAlreadyInFavorites = itemIndex !== -1;

    if (itemAlreadyInFavorites) {
      if (favorites[sellerIndex].products.length <= 1) {
        favoriteRef.delete();
      } else {
        favoriteRef.update({
          products: firestore.FieldValue.arrayRemove(itemToAdd.id),
        });
      }
    } else {
      favoriteRef.update({
        products: firestore.FieldValue.arrayUnion(itemToAdd.id),
      });
    }
  } else {
    favoriteRef.set({
      name: seller.name,
      products: firestore.FieldValue.arrayUnion(itemToAdd.id),
    });
  }
}
