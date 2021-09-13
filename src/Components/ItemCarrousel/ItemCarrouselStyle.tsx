import { Dimensions, StyleSheet } from "react-native";

export const ItemCarrouselStyles = StyleSheet.create({
    containerAll:{
        width:Dimensions.get("screen").width*0.8,
        alignSelf:"center"
    },
    container:{
        width:Dimensions.get("screen").width*0.75,
        alignSelf:"center",
        backgroundColor:"white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:20
    },
    containerImage:{
        borderTopEndRadius:20,
        borderTopStartRadius:20
    },
    image:{
        height:250,
        width:"100%",
        resizeMode:"cover",
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    containerTitle:{
        margin:20
    },
    title:{
        fontSize:16,
        fontWeight:"bold",

    }
})
