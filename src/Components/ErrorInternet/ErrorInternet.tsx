import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { ErrorInternetStyles } from './ErrorInternetStyles'

const ErrorInternet = ( props: any) => {
    return (
        <View style={ErrorInternetStyles.container}>
            <Text style={ErrorInternetStyles.text}>Connection failed.</Text>
            <TouchableOpacity style={ErrorInternetStyles.touchable} onPress={props.reload}>
                <Image
                source={require("../../../assets/reload.png")}
                style={ErrorInternetStyles.image}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ErrorInternet
