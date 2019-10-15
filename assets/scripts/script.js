var firebaseConfig = {
    apiKey: "AIzaSyDM4aPQfqRlWWAb8eSPqyTYG0An_tu2584",
    authDomain: "sama-d512d.firebaseapp.com",
    databaseURL: "https://sama-d512d.firebaseio.com",
    projectId: "sama-d512d",
    storageBucket: "sama-d512d.appspot.com",
    messagingSenderId: "831635016605",
    appId: "1:831635016605:web:04510bad75f4ebc5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

  const docRef = firestore.doc("Samples/userInput");

//console.log(this.Object(docRef));

    const header = document.querySelector('h1');
    const userInput = document.querySelector('#userInput');
    const send = document.querySelector('#send');
    const load = document.querySelector('#call');
    const body = document.querySelector('#second');
          body.style.display = 'none';

    send.addEventListener('click',function(){
        const textToSave = userInput.value;

// Sending the data to firebase
        docRef.set({
            userInput: textToSave
        }).then(function(event){
            console.log(`Status Saved!`);
        }).catch(function(error){
            console.log(`Got an error ${error}`);
        });
   });
// Loading the data saved on firebase 
   load.addEventListener('click',function(){
       console.log('reacting to click event');
       docRef.get().then(function(doc){
           
           if(doc && doc.exists){
                  
               const myData = doc.data();
                 console.log(myData);
             header.innerHTML = "i've just received: "+ myData.userInput;
           }
       }).catch(function(event){
        console.log('error : '+ event);
       });
   });
    
   // enabliing Live loading of data
       const getRealtimeUpdates = function(){
           console.log('it shoud be running now');
           docRef.onSnapshot(function(doc){
               if(doc && doc.exists){
                   const myData = doc.data();
                   header.innerHTML = "Recieved:"+ myData.userInput;
               }
           });
       }

    getRealtimeUpdates();
