//Initialize Firebase//
var Config = {
  apiKey: "AIzaSyBLScQk0EKnTmzuHWf-njvC3SqVHfaM2Qw",
  authDomain: "trainscheduler-39d08.firebaseapp.com",
  databaseURL: "https://trainscheduler-39d08.firebaseio.com",
  projectId: "trainscheduler-39d08",
  storageBucket: "trainscheduler-39d08.appspot.com",
  messagingSenderId: "176885172437",
  appId: "1:176885172437:web:a0b23cc815293dd7"
};

firebase.initializeApp(Config);

const database = firebase.database();

let trainName = " ";
let destination = " ";
let trainTime = " ";
let frequency = " ";

$("#addTrain").on("click", function (event) {

  event.preventDefault();

  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  trainTime = $("#trainTimeInput").val().trim();
  frequency = $("#frequencyInput").val().trim();

  database.ref().set({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  });

  database.ref().on("value", function (snapshot) {

    console.log(snapshot.val());

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().frequency);

    $("#trainName").text(snapshot.val().trainName);
    $("#destination").text(snapshot.val().destination);
    $("#trainTime").text(snapshot.val().trainTime);
    $("#frequency").text(snapshot.val().frequency);
    
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");

});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  const trainName = childSnapshot.val().trainName;
  const destination = childSnapshot.val().destination;
  const trainTime = childSnapshot.val().trainTime;
  const frequency = childSNapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  // moment.js stuff 
})
