import React, { useState, useRef } from 'reactn';
import { Image, StyleSheet, Modal } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import PlacesInput from 'react-native-places-input';
import MapView, { Marker, MapViewProps } from 'react-native-maps';

import { Fonts, Palette, Style } from 'styles';
import { Button, DismissKeyboard } from 'components';

import {
  formatCoordinates,
  animateToCoordinates,
} from '../../actions/locationActions';

import { apiKeyGooglePlaces } from '../config/config';

interface Coordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

interface AddressSelectionProps {
  visible?: boolean;
  setIsVisible: (visible: boolean) => void;
  coordinates?: Coordinates | null;
  setCoordinates: (coordinates: Coordinates) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({
  visible = false,
  setIsVisible = () => null,
  coordinates = null,
  setCoordinates,
}) => {
  const [newCoordinates, setNewCoordinates] = useState<Coordinates | null>(coordinates || null);

  const mapRef = useRef<MapView>(null);

  return (
    <Modal
      presentationStyle={'formSheet'}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        setIsVisible(false);
      }}
      style={{ flex: 1 }}
    >
      <DismissKeyboard>
        <MapView
          ref={mapRef}
          rotateEnabled={false}
          style={{
            flex: 1,
            ...StyleSheet.absoluteFill,
          }}
          region={{
            latitude: 44.853057263793794,
            longitude: -0.5679415038745691,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          {newCoordinates && (
            <Marker
              coordinate={{
                latitude: newCoordinates?.latitude || 0,
                longitude: newCoordinates?.longitude || 0,
              }}
            />
          )}
        </MapView>

        <PlacesInput
          stylesContainer={{
            position: 'absolute',
            top: responsiveHeight(5),
            right: 24,
            left: 24,
          }}
          stylesInput={{ borderRadius: 10 }}
          clearQueryOnSelect
          placeHolder={
            newCoordinates?.address || "Quelle est l'adresse de l'évènement?"
          }
          iconInput={
            <Image
              style={{
                height: 20,
                width: 30,
                tintColor: Palette.primary,
              }}
              resizeMode="contain"
              source={require('../assets/icons/focusLocation.png')}
            />
          }
          textInputProps={{
            returnKeyType: 'done',
            autoFocus: true,
            ...Fonts.primary.regular(14, Palette.black),
          }}
          googleApiKey={apiKeyGooglePlaces}
          queryFields={'formatted_address,geometry,name,address_components'}
          onSelect={(inputData: any) => {
            const {
              geometry: {
                location: { lat: latitude, lng: longitude },
              },
              formatted_address: address,
            } = inputData.result;

            setNewCoordinates(
              formatCoordinates({
                latitude,
                longitude,
                address,
              })
            );

            animateToCoordinates({
              coordinates: { latitude, longitude },
              mapRef,
            });
          }}
          language={'fr-FR'}
        />

        <Button
          onPress={() => {
            if (newCoordinates) {
              setCoordinates(newCoordinates);
            }

            setIsVisible(false);
          }}
          value="Valider l'adresse"
          containerStyle={[
            Style.con({ pos: 'absolute', b: 145, r: 24, l: 24, w: 'auto' }),
          ]}
        />

        <Button
          onPress={() => setIsVisible(false)}
          value="Annuler"
          containerStyle={Style.con({
            pos: 'absolute',
            b: 90,
            r: 24,
            l: 24,
            w: 'auto',
          })}
          style={{ backgroundColor: Palette.gray2 }}
          textStyle={Fonts.primary.bold(16, Palette.white)}
        />
      </DismissKeyboard>
    </Modal>
  );
}

export default AddressSelection;
