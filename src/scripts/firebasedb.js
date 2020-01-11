import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyAGetA6clpEpTwNteoE_jof2bC_GxI7rzI',
    authDomain: "last-man-typing.firebaseapp.com",
    projectId: 'last-man-typing'
});



const db = firebase.firestore();
var scores = [];
export function getScores(){
    return db.collection('highscores')
        .orderBy('score', 'desc')
        .limit(10)
        .get()
        // .then(snapshot => {
        // snapshot.docs.forEach( entry => {
        //     scores.push(entry.data().score)
        // })

    // })

}

export function checkScore(score){
    return scores.some(() => score);
}

export function addScore(name, score, wpm){
    db.collection('highscores').add({
        name: name,
        score: score,
        wpm: wpm
    })
    .then( () => true)
    .catch( () => false)
}

// module.exports = { addScore, checkScore, getScores};
