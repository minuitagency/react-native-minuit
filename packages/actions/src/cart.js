import ReactN from 'reactn';
import { Alert } from 'react-native';
import { equalsIgnoreOrder } from '@react-native-minuit/utils';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

function cartAlreadyExistsPrompt() {
  return new Promise((resolve) => {
    Alert.alert(
      'Passer une nouvelle commande ?',
      'Votre ancien panier va être vidé',
      [
        {
          text: 'Annuler',
          onPress: () => {
            resolve(false);
          },
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: () => {
            resolve(true);
          },
        },
      ],
      { cancelable: false }
    );
  });
}

export function addToCart(seller, itemToAdd, nb) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const cart = Object.assign({}, ReactN.getGlobal().cart);
    if (cart.seller && cart.seller.id !== seller.id) {
      if (await cartAlreadyExistsPrompt()) {
        cart.products = [];
      } else {
        return;
      }
    }
    cart.seller = seller;

    const actualIndex = cart.products.findIndex((product) => {
      return (
        product.id === itemToAdd.id &&
        equalsIgnoreOrder(product.options, itemToAdd.options)
      );
    });

    const itemAlreadyInCart = actualIndex !== -1;

    if (itemAlreadyInCart) {
      const productInCart = cart.products[actualIndex];

      if (productInCart.quantity + nb > 0) {
        productInCart.quantity = productInCart.quantity += nb;
      } else {
        cart.products = cart.products.filter(
          (product) =>
            product.id !== productInCart.id &&
            equalsIgnoreOrder(product.options, productInCart.options)
        );
      }
    } else {
      cart.products.push({ ...itemToAdd, quantity: nb });
    }
    await ReactN.setGlobal({ cart });
    ReactNativeHapticFeedback.trigger('impactLight');
    resolve();
  });
}
