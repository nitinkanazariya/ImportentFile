import React, { useState } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";

const GooglePlacesInput = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        // fetchDetails={true}
        placeholder="Search"
        styles={{
          textInputContainer: {
            backgroundColor: "grey",
          },
          textInput: {
            height: 38,
            color: "#5d5d5d",
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyCFQeClO7pJfRCROSvAP55S97EIVxOx5Wo",
          language: "en",
        }}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 22.1723,
          longitude: 71.6636,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        <Marker coordinate={{ latitude: 22.1723, longitude: 71.6636 }} />
      </MapView>
    </View>
  );
};

export default GooglePlacesInput;
