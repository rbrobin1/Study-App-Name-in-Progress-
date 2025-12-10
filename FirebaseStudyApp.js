import { child } from '@react-native-firebase/storage';
import axios from 'axios';

const AUTH_URL = "https://fantastic-study-app-default-rtdb.firebaseio.com";

const DATABASE_URL = "https://fantastic-study-app-default-rtdb.firebaseio.com/";

const API_KEY = "AIzaSyA_hEE-oFx4NTT-rqAvYP7Df7Zq3a_zn-U";

export async function storeCredentials(newCredentials){

    
}

export async function getCredentials(){

    
}

export async function storeQuestions(){
    const response = axios.post(DATABASE_URL + "/quiz.json",
        newQuiz
    );
    return response.data;

}

export async function getQuestions(){

    const response = axios.get(DATABASE_URL + "/quiz.json");
    let quizzes = [];

    for(const key in response.data){
        let quiz = {};
        quiz.id = key;
        quiz.title = response.data[key].title;
        quiz.question = response.data[key].question;
        quiz.answers = response.data[key].answers;
        quiz.correctAnswer = response.data[key].correctAnswer;
        


        quizzes.push(quiz);

    }

    return quizzes;


}

export async function updateQuestions(id, quizData){
    return axios.put(DATABASE_URL + "/quiz/" + id + ".json", quizData);
}
