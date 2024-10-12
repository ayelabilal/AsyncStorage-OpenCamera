import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { launchCamera } from 'react-native-image-picker'

const App = () => {
  let obj = {
    name: "ayela",
    friend: "umaima"
  }

  const handleStore = async () => {
    await AsyncStorage.setItem("userObj", JSON.stringify(obj));
  }

  const handleGet = async () => {
    const getData = await AsyncStorage.getItem("userObj")
    console.log('getdata===', getData)
  }

  const handleGetAll = async () => {
    const getAllData = await AsyncStorage.getAllKeys()
    console.log(getAllData)
  }

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    console.log(result)
    if (result && result.assets) {
      const imgsrc = result.assets[0].uri;
      setCaptures([...captures, imgsrc]);  
    }
  }

  const [captures, setCaptures] = useState([])  

  return (
    <View>
      <Text style={{ fontSize: 40, textAlign: "center", marginBottom: 40 }}>Async Storage</Text>

      <TouchableOpacity onPress={handleStore}><Text style={{ fontSize: 40 }}>Click to store data</Text></TouchableOpacity>
      <TouchableOpacity onPress={handleGet}><Text style={{ fontSize: 40 }}>Click to get data</Text></TouchableOpacity>
      <TouchableOpacity onPress={handleGetAll}><Text style={{ fontSize: 40 }}>Click to get all data</Text></TouchableOpacity>

      <TouchableOpacity onPress={openCamera}><Text style={{ fontSize: 40, marginTop: 30 }}>Open Camera</Text></TouchableOpacity>
      
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            captures.length > 0 && captures.map((capture, index) => (
              <Image
                key={index}
                source={{ uri: capture }}
                style={{ width: 100, height: 100, margin: 5 }}
                resizeMode='cover'
              />
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default App;
