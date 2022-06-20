import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getMeteoByDay, getOpacity, getDays } from './src/tools/helper';
//import convert from 'color-convert'
//import axios from 'axios';


export default function App() {

  const keyAPI = '997b0ec795d3c25449cdbb6fb2bfd7d0'

  const [city, setCity] = useState('Harfleur')
  const [infoCity, setInfoCity] = useState({})
  const [forecast, setForecast] = useState([])
  const [isValid, setIsValid] = useState(false)
  const [opacity, setOpacity] = useState(1.00)
  const [showForecastByDay, setShowForecastByDay] = useState([])
  
  const days = getDays()

  const [activeShow, setActiveShow] = useState(days[0])

  useEffect(() => {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyAPI}&units=metric&lang=fr`)

    .then(res => res.json())
    .then(response => {

      if(response.cod === "200"){

        setInfoCity(response.city)
        setOpacity(getOpacity(response.city))
        setForecast(getMeteoByDay(response.list))
        setShowForecastByDay(getMeteoByDay(response.list)[0])
        setActiveShow(days[0])
        setIsValid(true)
      }
    })
    .catch(error => {
      setIsValid(false)
    })

  }, [city])


  return (

    <View style={styles.container}>

      <ImageBackground source={require('./assets/images/bg.jpg')} resizeMode='cover' style={[styles.background]} >

      <ImageBackground source={require('./assets/splash.png')} resizeMode='center' style={styles.background} imageStyle={{opacity : parseFloat(opacity)}} >

        <View style={{ flex : 1, padding : 15 }}>


                <TextInput
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        placeholder="Enter a city"
                        style={styles.input}
                />


                {isValid &&
                <>

                  <View style={{ flexDirection : 'row', marginTop : 20 }}>

                    {days.map((day, index) => {

                      return (
                        <View key={index} style={{ flex : 1, borderTopLeftRadius : 10, borderTopRightRadius : 10 }}>
                          <TouchableOpacity onPress={() => {
                            setShowForecastByDay(forecast[index])
                            setActiveShow(day)
                          }} style={[{borderTopLeftRadius : 10, borderTopRightRadius : 10, opacity : 0.7 } , activeShow === day ? { backgroundColor : 'white',} : { backgroundColor : 'transparent'}]}>

                            <Text style={[{ textAlign  : 'center', padding : 10, fontSize : 8 }, activeShow === day ? { color : 'black'} : { color : 'white', fontWeight : 'bold'}]}>{index == 0 ? "Ce jour" : index == 1 ? "Demain" : day }</Text>

                          </TouchableOpacity>
                        </View>
                      )
                      
                    })}
                  </View>


                  <View style={{ height : 120, width : '100%', marginTop : 20 }}>

                    <FlatList
                      style={{ flex : 1 }}
                      data={showForecastByDay}
                      horizontal={true}
                      renderItem={({ item }) => (
                        <View style={{ width : 120,  backgroundColor : 'rgba(255,255,255,.5)', marginRight : 10, borderRadius : 10, alignItems : 'center' }}>
                          <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}} style={{ height : 80, width : 80, alignItems : 'center', opacity : 1 }} />
                          <Text>{item.main.temp.toFixed(1)} °C</Text>
                          <Text>{new Date(item.dt_txt).getHours()}h</Text>
                        </View>
                      )}
                      keyExtractor={(item, index) => index}
                    />


                  </View>

                </>

                }

                

                {!isValid &&
                <>
                  <Text>Invalide</Text>
                </>
                }



        </View>

        </ImageBackground>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor : 'white',
    padding: 10,
    margin: 0,
    width: '100%',
  },
  background : {
    flex: 1,
    justifyContent: "center",
  }
})
