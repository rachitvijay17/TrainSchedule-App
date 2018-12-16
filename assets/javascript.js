var config = {
    apiKey: "AIzaSyDP9XEdRGvDybNHbXcHZEHHxF_DXiFye78",
    authDomain: "trainschedule-7e662.firebaseapp.com",
    databaseURL: "https://trainschedule-7e662.firebaseio.com",
    projectId: "trainschedule-7e662",
    storageBucket: "trainschedule-7e662.appspot.com",
    messagingSenderId: "428087824462"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var traindestination = $("#destination-input").val().trim();
    var firsttime = $("#time-input").val().trim();
    var trainfrequency = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newtrain = {
      name: trainName,
      destination: traindestination,
      time: firsttime,
      frequency: trainfrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newtrain);
  
    // Logs everything to console
    console.log(newtrain.name);
    console.log(newtrain.destination);
    console.log(newtrain.time);
    console.log(newtrain.frequency);
  
    //alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
  });


  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var TName = childSnapshot.val().name;
    var Tdestination = childSnapshot.val().destination;
    var Ttime = childSnapshot.val().time;
    var Tfrequency = childSnapshot.val().frequency;
     
  
    // Employee Info
    console.log(TName);
    console.log(Tdestination);
    console.log(Ttime);
    console.log(Tfrequency);
  
    // Prettify the employee start

    var firsttraintime = moment(Ttime, "HH:mm").subtract(1, "years");
    console.log(firsttraintime);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firsttraintime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % Tfrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = Tfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(TName),
      $("<td>").text(Tdestination),
      $("<td>").text(Tfrequency),
      $("<td>").text(moment(nextTrain).format("hh:mm")),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });