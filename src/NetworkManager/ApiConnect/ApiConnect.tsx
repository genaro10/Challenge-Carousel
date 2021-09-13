import { Component } from "react"
import { Platform } from "react-native"

const url = Platform.OS ==="android" ? "http://10.0.2.2:3000/Country" : "http://localhost:3000/Country"

const config = {
    method : "GET",
}

class ApiConnect {
    getDataCountries = async() => {
        try {
            let response = await fetch(url,config)
            return response.json()
        } catch (error) {
            return {status:401}
        } 
    }
}

export default new ApiConnect()