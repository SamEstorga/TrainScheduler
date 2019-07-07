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

// global variables
$("#currentTime").append(moment().format("hh:mm A"));
let trainName = "";
let destination = "";
let trainTime = "";
let frequency = "";

// on click function that adds trains
$("#addTrain").on("click", function (event) {

  event.preventDefault();

  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  trainTime = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  frequency = $("#frequencyInput").val().trim();

  let newTrain = {
    name: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  }

  database.ref().push(newTrain);

  return false;

});

database.ref().on("value", function (snapshot) {

  $("#trainName").text(snapshot.val().trainName);
  $("#destination").text(snapshot.val().destination);
  $("#trainTime").text(snapshot.val().trainTime);
  $("#frequency").text(snapshot.val().frequency);

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);

  // empties the inputs after sumbit
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");

});

database.ref().on("child_added", function(childSnapshot) {

  let data = childSnapshot.val();
  let trainNames = data.name;
  let trainDestin = data.destination;
  let trainFrequency = data.frequency;
  let theTrainTime = data.trainTime;

  let tRemainder = moment().diff(moment.unix(theTrainTime), "minutes") % trainFrequency;
  let tMinutes = trainFrequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  let tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");
});