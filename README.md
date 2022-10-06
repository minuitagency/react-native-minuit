# react-native-minuit

Install react-native-minuit

```jsx
yarn add react-native-minuit
```

Add the provider

```jsx
import {MinuitProvider} from 'react-native-minuit';

... 

return (
    <MinuitProvider projectID="ID_DU_PROJET">
      ...
    </MinuitProvider>
);
```

# useDataFromRef
# Basic use

```jsx
import {useDataFromRef} from 'react-native-minuit/src/hooks';

... 

const {data} = useDataFromRef({
    ref: firestore()
      .collection('users')
      .doc(USERID), // ici la "ref" firestore
    documentID: 'userID', // la clé a utiliser pour l'ID du document
		simpleRef: true, // si c'est un document alors simpleRef = true, si c'est une query complexe alors false
		listener: true, // si on souhaite que data se mette à jour en temps réel avec la base
		refreshArray: [], 
	});
```

# How to paginate

```jsx
  const {data, loadMore} = useDataFromRef({
    ref: ...,
		documentID: 'eventID',
    usePagination: true,
    batchSize: 4, // le nombre renvoyé à chaque pagination
		...    
  });

...

<FlatList
	...
  onEndReachedThreshold={0.5}
  onEndReached={loadMore} // en arrivant en bas de la flatlist, on charge à nouveau
	...
/>
```
