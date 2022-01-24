import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import React, { createContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { useGlobal } from 'reactn';
import * as geofirex from 'geofirex';
import firebase from '@react-native-firebase/app';
import RNLocation from 'react-native-location';

const geo = geofirex.init(firebase);

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [, setInitializing] = useGlobal('initializing');
  const [userData, setUserData] = useGlobal('user');
  const [categories, setCategories] = useGlobal('categories');
  const [, setCurrentLocation] = useGlobal('currentLocation');

  // Init Auth
  useEffect(() => {
    initNotifications();
    const authSub = auth().onAuthStateChanged(init);
    return () => authSub();
  }, []);

  useEffect(() => {
    let locSub = null;
    if (userData) {
      initLocation(userData.uid).then((sub) => {
        locSub = sub;
      });
      return () => {
        if (locSub) {
          locSub();
        }
      };
    }
  }, [userData?.uid]);

  async function init(currentUser) {
    await setInitializing(true);
    if (currentUser) {
      await initUser(currentUser.uid);
      await checkNotificationsPermissions(currentUser.uid);
    } else if (userData) {
      await setUserData(null);
    }
    await setInitializing(false);
  }

  async function setData(userSnap) {
    if (userSnap?.exists) {
      await setUserData(userSnap.data());
    } else {
      await setUserData(null);
    }
  }

  async function initUser(uid) {
    // User data
    const userRef = firestore().collection('users').doc(uid);
    await userRef.set({ uid }, { merge: true });
    const userSnap = await userRef.get();
    await setData(userSnap);
    userRef.onSnapshot(setData);

    // Categories
    const categoriesRef = firestore().collection('settings').doc('categories');
    const categories = (await categoriesRef.get()).data();
    await setCategories(categories);
  }

  async function initLocation(uid) {
    return await getLocation((location) => {
      console.log('[LOCATION]', location);
      setCurrentLocation(location);
      firestore()
        .collection('users')
        .doc(uid)
        .update({
          location: geo.point(location.latitude, location.longitude),
        });
    });
  }

  const getLocation = async (setLocation) => {
    console.log('[LOCATION] Initialize');
    await RNLocation.configure({
      distanceFilter: 500, // Meters
      desiredAccuracy: {
        ios: 'hundredMeters',
        android: 'balancedPowerAccuracy',
      },
      interval: 2000,
      maxWaitTime: 2000,
    });
    const granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Permission de géolocalisation',
          message:
            'Blackbird a besoin de votre géolocalisation pour trouver les commerçants proche de vous',
          buttonPositive: 'Accepter',
          buttonNegative: 'Refuser',
        },
      },
    });
    console.log('[LOCATION] Granted:', granted);

    if (granted) {
      return RNLocation.subscribeToLocationUpdates((locations) => {
        setLocation({
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
        });
      });
    } else {
      return null;
    }
  };

  async function initNotifications() {
    Notifications.ios.setBadgeCount(0);
    Notifications.registerRemoteNotifications();
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        completion();
      }
    );
    Notifications.events().registerNotificationOpened(
      async (notification, completion) => {
        Notifications.ios.setBadgeCount(0);
        completion();
      }
    );
    Notifications.getInitialNotification()
      .then((notification) => {
        if (notification) {
        }
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));
  }

  const checkNotificationsPermissions = async (uid) => {
    let hasPermission = false;
    try {
      hasPermission = await messaging().hasPermission();
      if (hasPermission) {
        await updateUserToken(uid);
      } else {
        hasPermission = await messaging().requestPermission();
        if (hasPermission) {
          await updateUserToken(uid);
        }
      }
    } catch (e) {
      Alert.alert(
        'Activez les notifications pour être informé des dernières informations de Blackbird.'
      );
    }
  };

  const updateUserToken = async (uid) => {
    try {
      const fcm = await messaging().getToken();

      if (fcm && uid) {
        await firestore().doc(`users/${uid}`).update({ fcm });
      } else {
        console.log('No token');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
