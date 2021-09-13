import React from 'react'
import { Animated, Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import ItemModel from '../../NetworkManager/Models/ItemModel'
import { ItemCarrouselStyles } from './ItemCarrouselStyle'

const ItemCarrousel = (props : {item : ItemModel, index: number,scrollX : any}) =>{
    const itemSize = Dimensions.get("screen").width * 0.8
    const inputRange = [
        (props.index-2) * itemSize,
        (props.index-1) * itemSize,
        (props.index) * itemSize
    ]
    
    const translateY = props.scrollX.interpolate({
        inputRange:inputRange,
        outputRange: [0, -20, 0]
    })

    const opacity = props.scrollX.interpolate({
        inputRange:inputRange,
        outputRange : [0.5,1,0.5]
    })
    return(
        <Animated.View style={[ItemCarrouselStyles.containerAll,Platform.OS === "ios" ? {transform:[{translateY}],opacity:opacity} : {}] }>
            <View style={[ItemCarrouselStyles.container,{backgroundColor:props.index%2 === 0 ? "white" : "black"}]}>
                <View style={ItemCarrouselStyles.containerImage}>
                    <Image
                    source={{uri:props.item.url}}
                    style={ItemCarrouselStyles.image}
                    />
                </View>
                <View style={ItemCarrouselStyles.containerTitle}>
                    <Text style={[ItemCarrouselStyles.title,{color:props.index%2 === 0 ? "black" : "white"}]}>{props.item.title}</Text>
                </View>
            </View>
        </Animated.View>
    )
}

export default ItemCarrousel