import React, { useState ,useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from "@expo/vector-icons";

import api from '../services/api'; // Começar a puxar as informações do Back, parte funcional
import {connect, disconnect, subscribeToNewDevs} from '../services/socket';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, SetCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() =>{
        async function loadInitalPosition() {
            const {granted} = await requestForegroundPermissionsAsync();

            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                SetCurrentRegion({ // Pegando a latitude e longitude do usuario
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitalPosition();
    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev])) // copia todas as informações que ja tem e adiciona o novo dev
    }, [devs]) // Toda vez que devs mudar chamar a função subscribeToNewDevs

    function setupWebSocket() {
        disconnect(); // Para que ele não fique com conexões sobrando 

        const { latitude, longitude } = currentRegion;
        // Podemos enviar parametros na conexão como latitude, etc
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(response.data.devs);
        
        // No load Devs é onde o socket vai ficar escutando para atualizar quando houver novos cadastros
        setupWebSocket();
    }

    function handleRegionChanged(region){ // Quando o usuario mexe no mapa é preciso atualziar a posição recebida em loadInitalPosition 
        SetCurrentRegion(region); // Dentro dessa função handleRegionChanged ja tem a region ai é so setar
    }

    if(!currentRegion){ // Se não tiver posição ele so vai mostrar o mapa normal
        return null;
    }
    // Quando se tem dois elementos, como abaixo MapView e uma View 
    // temos que por o container <> </> em volta, assim é melhor que por uma Div
    return (
    <> 
      <MapView 
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion} 
        style={ styles.map }
      >
       {devs.map(dev => ( 
            <Marker
                key={dev._id} 
                coordinate={{
                    latitude: dev.location.coordinates[1], 
                    longitude: dev.location.coordinates[0],
                }}
            >
                <Image 
                    style={styles.avatar} 
                    source={{ uri: dev.avatar_url }} 
                />
                <Callout onPress={() => {
                    navigation.navigate('Perfil no GitHub', 
                    { github_username: dev.github_username});
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>))}
      </MapView>
      <View styles = {styles.searchForm}>
            <TextInput 
                styles= {styles.searchInput}
                placeholder = "Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize='words'
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
      </View>
      <TouchableOpacity onPress={loadDevs} style={styles.loadButton}> 
            <MaterialIcons name="my-location" size={20} color="#fff" />
      </TouchableOpacity>
    </>
    );
  }

  const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },

    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        }, 
        elevation: 3,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#f4511e',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
  })


export default Main;