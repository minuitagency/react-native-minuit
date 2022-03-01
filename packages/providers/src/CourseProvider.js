import { useEffect, useMemo } from 'react';
import { useGlobal } from 'reactn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import * as geofirex from 'geofirex';
import firebase from '@react-native-firebase/app';

const geo = geofirex.init(firebase);

export default function CourseProvider({ children, MAX_DISTANCE = 5 }) {
  const [currentLocation] = useGlobal('currentLocation');
  const [user] = useGlobal('user');
  const [, setAvailableCourse] = useGlobal('availableCourse');
  const [currentCourse, setCurrentCourse] = useGlobal('currentCourse');
  const [refusedCourses] = useGlobal('refusedCourses');
  const preCondition = useMemo(
    () => user && currentLocation,
    [user, currentLocation]
  );

  function getCurrentCourse() {
    return firestore()
      .collectionGroup('orders')
      .where('attributedTo', '==', auth().currentUser.uid)
      .where('status', 'in', ['READY_TO_PICKUP', 'DELIVERY_IN_PROGRESS'])
      .onSnapshot(
        ({ docs: currentCourseDocs = [] }) => {
          if (currentCourseDocs?.length > 0) {
            setCurrentCourse({
              ...currentCourseDocs[0].data(),
              id: currentCourseDocs[0].id,
            });
          } else if (currentCourse) {
            setCurrentCourse(null);
          }
        },
        (e) => console.log(e)
      );
  }

  function getAvailableCourse() {
    const fbquery = firestore()
      .collectionGroup('orders')
      .where('status', '==', 'READY_TO_PICKUP')
      .where('attributedTo', '==', `PENDING_${auth().currentUser.uid}`);
    return fbquery.onSnapshot(async (requests) => {
      requests = requests?.docs
        ?.map((r) => ({ ...r.data(), id: r.id }))
        .filter((r) => !refusedCourses.includes(r.id));
      if (requests.length > 0) {
        await setAvailableCourse(requests[0]);
      } else {
        await setAvailableCourse(null);
      }
    });
  }

  useEffect(() => {
    // Si course en cours on la reprend
    if (preCondition) {
      const sub = getCurrentCourse();
      return () => sub();
    }
  }, [preCondition]);

  useEffect(() => {
    // Si aucune course en cours on en cherche une
    if (preCondition) {
      const sub = getAvailableCourse();
      return () => {
        if (sub) {
          sub();
        }
      };
    }
  }, [preCondition, refusedCourses, currentCourse]);

  return children;
}
