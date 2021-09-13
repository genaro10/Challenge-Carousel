import { Dimensions, Platform, StyleSheet } from "react-native";

export const ListCarrouselStyle = StyleSheet.create({
    container:{
        marginBottom:Platform.OS === "ios" ? 20 : 0,
        alignSelf:"center",
        marginTop:100,
        paddingBottom:Platform.OS === "ios" ? 0 : 10
    },
    backButton:{
        position:"absolute",
        marginTop:100,top:"40%",
        left:10
    },
    nextButton:{
        position:"absolute",
        marginTop:100,
        top:"40%",
        right:10,
        transform:[{
            rotate:"180deg"
        }]
    },
    icon:{
        height:50,
        width:50
    }
})