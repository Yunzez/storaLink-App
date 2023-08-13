import { Text } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'
import HeaderWithBackButton from '../../components/HeaderWithBackBtn'

const Appearance = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
      <HeaderWithBackButton title="Appearance" navigateToScreen="Settings" navigateToParams={'setting_main'}/>
    </SafeAreaView>
  )
}

export default Appearance