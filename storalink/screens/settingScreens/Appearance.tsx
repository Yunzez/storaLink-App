import { Text, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'
import HeaderWithBackButton from '../../components/HeaderWithBackBtn'

const Appearance = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
      <View width={"80%"}>
      <HeaderWithBackButton title="Appearance" navigateToScreen="Settings" navigateToParams={'setting_main'}/>
      <View height={'100%'} justifyContent={'center'}>
      <Text style={{fontSize: 20, fontWeight: '500'}}>Themes are coming soon, stay tuned!</Text>
      </View>
     
      </View>
    </SafeAreaView>
  )
}

export default Appearance