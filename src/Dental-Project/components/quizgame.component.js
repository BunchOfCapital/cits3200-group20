import react, { useState } from "react";
import { Button, Layout } from "@ui-kitten/components";
import { ImageBackground,StatusBar,Text, StyleSheet } from "react-native";
import quizData from "../Data/quizData";
import wallpaper from "../assets/7284061(1).png"

export const QuizGame = () =>{

    const allQuestions = quizData;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


    const renderQuestion = () =>{
        return(
             <Layout>
            <Layout style={{flexDirection:"row",alignItems:"flex-end"}}>
                <Text style={{fontSize:20,color:"#fff",marginRight:2,opacity:0.6}}> {currentQuestionIndex + 1}</Text>
                <Text style={{fontSize:18,color:"#fff",opacity:0.6}}>{allQuestions.length}</Text>
            </Layout>
        </Layout>
        )
       

    }

    return(
        <Layout style={{ flex: 1, backgroundColor: "#FFFFF5" }}>
            <ImageBackground source={wallpaper} resizeMode="cover" style ={{position:"absolute", bottom:0, top:0, left:0, right:0}}> 
                <StatusBar barStyle="light-content" backgroundColor={"#800080"}/>
                <Layout style={{ flex: 1, backgroundColor: "#FFFFF5", position:"relative"}}>
                </Layout>
            </ImageBackground>
        </Layout>
    )
}

const styles = StyleSheet.create({
    quizheader:{
        fontSize:20,
        color:"#fff",
        marginRight:2
    }

})