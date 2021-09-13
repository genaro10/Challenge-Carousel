import React, { useMemo } from 'react'
import { Animated, AppState, AsyncStorage, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import ErrorInternet from '../../Components/ErrorInternet/ErrorInternet'
import ItemCarrousel from '../../Components/ItemCarrousel/ItemCarrousel'
import ApiConnect from '../../NetworkManager/ApiConnect/ApiConnect'
import ItemModel from '../../NetworkManager/Models/ItemModel'
import { ListCarrouselStyle } from './ListCarrouselStyle'

const ListCarrousel = () => {
    const [data,setData] = React.useState<ItemModel[] | null>([]) 
    const width = Dimensions.get("screen").width
    const [xPosition,setX] = React.useState(0)
    let xRef = React.useRef(0)
    const [showBack,setShowBack] = React.useState(true)
    const [showNext,setShowNext] = React.useState(true)
    const scrollX = React.useRef(new Animated.Value(0)).current
    const refScrolling = React.useRef<any>(null)

    const onScrollFlatList = (event : any) =>{
        const x = event.nativeEvent.contentOffset.x
        setX(x)
        x<200 ? setShowBack(false) : setShowBack(true)
        if(data!==null){
            x>((width * 0.8) * (data.length -3)) - 200 ? setShowNext(false) : setShowNext(true)
        }
        Animated.timing(scrollX,{
            toValue:x,
            duration:0,
            useNativeDriver : true
        }).start()
    }

    const onScrollAnimationEnd = async(event : any) =>{
        const x = event.nativeEvent.contentOffset.x
        AsyncStorage.setItem("x",x.toString())
    }

    React.useEffect(()=>{
        getDatCountries()
        .then(()=>{
            getInitialPosition() 
        })
    },[])

    const getInitialPosition =async()=>{
        try {
            let position = await AsyncStorage.getItem("x")
            refScrolling.current.scrollToOffset({animated:false,offset:position,behavior: "smooth"})
            parseInt(position!!)<100 ? setShowBack(false) : setShowBack(true)
            parseInt(position!!)>((width * 0.8) * (data!!.length -3)) - 100 ? setShowNext(true) : setShowNext(false)
        } catch (error) {
            console.log("No ha cargado los datos por error de conexion")
        }
    }

    const getDatCountries = async() =>{
        let data = await ApiConnect.getDataCountries()
        if(data.status === 401){
            setData(null)
        }else{
            let result = [{title:"",url:""}]
            let Spacer = [{title:"",url:""}]
            result = Spacer.concat(data)
            result = result.concat(Spacer)
            setData(result)
            setShowBack(false)
        }
    }

    const nextPicture = () => {
        refScrolling.current.scrollToOffset({animated:true,offset:xPosition+Dimensions.get("screen").width*0.8})
    }

    const beforePicture = () => {
        refScrolling.current.scrollToOffset({animated:true,offset:xPosition-Dimensions.get("screen").width*0.8})
    }

    if(data === null){
        return(
            <ErrorInternet reload={getDatCountries}/>
        )
    }else{
        return(
            <>
                <Animated.FlatList
                ref = {refScrolling}
                data={data}
                onMomentumScrollEnd ={onScrollAnimationEnd}
                renderItem={({item,index})=>{
                if(data!==null){
                    if(index <= 0 || index+1>=data.length){
                        return(
                            <View style={{width:width*0.1}}/>
                        )
                    }
                }
                return(
                    <ItemCarrousel 
                    index={index} 
                    item={item}
                    scrollX = {scrollX}/>
                )
                }}
                keyExtractor={(item,index)=>index.toString()}
                horizontal
                decelerationRate="fast"
                onScroll={onScrollFlatList}
                scrollEventThrottle={16}
                snapToInterval={width*0.8}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={ListCarrouselStyle.container}
                />
                {showBack ? 
                <TouchableOpacity onPress={beforePicture} style={ListCarrouselStyle.backButton}>
                    <Image source={require("../../../assets/back.png")}
                    style={ListCarrouselStyle.icon}/>
                </TouchableOpacity>
                :
                null
                }
                {showNext ? 
                <TouchableOpacity onPress={nextPicture} style={ListCarrouselStyle.nextButton}>
                <Image source={require("../../../assets/back.png")}
                    style={ListCarrouselStyle.icon}/>
                </TouchableOpacity>
                :
                null
                }
            </>
        )
    }
}

export default ListCarrousel