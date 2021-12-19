import React, {useState, useEffect} from 'react';
import { View , Text ,StyleSheet,  Platform, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
function Map() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
    console.log(location);

    let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

   return (

    <View style={styles.container}>
        {
            location ?<MapView style={styles.map}
            initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              >
                       <Marker 
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                      }}
                      image={{uri:"https://icon-library.com/images/small-person-icon/small-person-icon-17.jpg"}}
                      style={{width: 23, height: 28}}


                      title={"Current Location "}
                      

                      />
                      <Marker 
                    coordinate={{
                        latitude:24.9200172,
                        longitude: 67.0612345,
                      }}
                      title={"Aliabad"}
                      />

                    <Marker 
                    coordinate={{
                        latitude:24.8732834,
                        longitude: 67.0337457,
                      }}
                      title={"Numaish chowrangi"}
                      />
                      <Marker 
                    coordinate={{
                        latitude:24.8278999,
                        longitude: 67.0688257,
                      }}
                      title={"Saylani house phase 2"}
                      />
                      <Marker 
                    coordinate={{
                        latitude:24.8073692,
                        longitude: 67.0357446,
                      }}
                      title={"Touheed commercial"}
                      />
                      <Marker 
                    coordinate={{
                        latitude:24.8073692,
                        longitude: 67.0357446,
                      }}
                      title={"Sehar Commercial"}
                      />
                     <Marker 
                    coordinate={{
                        latitude:24.8138924,
                        longitude: 67.1767206,
                      }}
                      title={"jinnah avenue"}
                      />
                    <Marker 
                    coordinate={{
                        latitude:24.9132328,
                        longitude: 67.1246195,
                      }}
                      title={"Johar chowrangi"}
                      />
                     <Marker 
                    coordinate={{
                        latitude:24.9100704,
                        longitude: 67.1208811,
                      }}
                      title={"Johar chowrangi 2"}
                      />
                    <Marker 
                    coordinate={{
                        latitude:24.8073692,
                        longitude: 67.0357446,
                      }}
                      title={"Touheed commercial"}
                      />
                       <Marker 
                    coordinate={{
                        latitude:24.8673515,
                        longitude: 67.0724497,
                      }}
                      title={"Hill park"}
                      />
                      
             </MapView>
        : null
        }
      </View>

   )
}
export default Map; 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });