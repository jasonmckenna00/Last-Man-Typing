import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyAGetA6clpEpTwNteoE_jof2bC_GxI7rzI',
    authDomain: "last-man-typing.firebaseapp.com",
    projectId: 'last-man-typing'
});



const db = firebase.firestore();
const fetchedScores = db.collection('highscores')
                        .orderBy('score', 'desc')
                        .limit(10)
                        .get()
// const scoresArray = fetchedScores.then(snapshot => {
//     return snapshot.docs.map(entry => {
//         return entry.data().score
//     })
// })

var scoresArray = []
export function getScores(){
    fetchedScores.then(snapshot => {
        snapshot.docs.forEach( entry => {
           scoresArray.push( entry.data().score)
        })
        
    })
    return fetchedScores
}

export function checkScore(score){

    let outcome = false;
    scoresArray.forEach(highScore => {
        if (score > highScore) outcome = true
    })

    return outcome
}

export function addScore(name, score, wpm){
    return db.collection('highscores').add({
        name: name,
        score: score,
        wpm: wpm
    })
}

// module.exports = { addScore, checkScore, getScores};
