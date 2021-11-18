import { useGlobal } from 'reactn';

export function isFavorite(sellerId, itemId) {
  const [favorites] = useGlobal('favorites');

  const sellerIndex = favorites.findIndex((seller) => seller.id === sellerId);
  const sellerAlreadyInFavorites = sellerIndex !== -1;

  if (sellerAlreadyInFavorites) {
    const itemIndex = favorites[sellerIndex].products.findIndex(
      (productId) => itemId === productId
    );
    const itemAlreadyInFavorites = itemIndex !== -1;
    if (itemAlreadyInFavorites) {
      return true;
    }
  }
  return false;
}
