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

//   // Get a reference to the storage service, which is used to create references in your storage bucket
//   var storage = firebase.storage();
//   // Create a storage reference from our storage service
//   var storageRef = storage.ref();


  const docRef = firestore.doc("Samples/userInput");
  const user = '<span style="color:green; display:block;" >Sedoid</span>';

//console.log(this.Object(docRef));
    const chats = document.querySelector('#chats');
    const header = document.querySelector('h1');
    const userInput = document.querySelector('#userInput');
    const send = document.querySelector('#send');
    const blob = document.getElementById('blob');
    const load = document.querySelector('#call');
    const body = document.querySelector('#second');
    const progress_bar = document.getElementById('progress_bar');
    const clearChat = document.querySelector('#second ul');

 
    load.addEventListener('click',function(){
 
        const children = clearChat.childNodes;
        children.forEach(child =>{
            clearChat.removeChild(child);
        })
         
    });

    blob.addEventListener('change',(event)=>{
        // Get the file
        var metadata = {
            'description': 'This is a record of what happened in event during day 24',
        }
        console.log(event.target.files.length)
        let firstBloc = event.target.files[0];
        console.log('sending the files already')
        // Create an storage ref
       
         var storageRef  = firebase.storage().ref('images/'+firstBloc.name)
         var task =   storageRef.put(firstBloc,metadata);

        // Upload a file
        task.on('state_changed',
        function progress(snapshot){
            console.log('progress is made');
            console.log(snapshot.bytesTransferred);
            var progress=(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            progress_bar.value = progress;
        },
        function error(err){
            console.log('an error occured')
            console.log(err);
        },
        function complete(){
            console.log('File transfer complete');
        }
        );

        // Update progress bar
        
    })
      
// Sending the data to firebase
    send.addEventListener('click',function(){
        const textToSave =user + userInput.value;
        userInput.value = '';

        docRef.set({
            userInput:  textToSave
        }).then(function(event){
            console.log(`Status Saved!`);
        }).catch(function(error){
            console.log(`Got an error ${error}`);
        });

   });
// Alternative Loading the data saved on firebase 
//    load.addEventListener('click',function(){
//         userInput.value = '';
//         console.log('executing');
//        docRef.get().then(function(doc){
           
//            if(doc && doc.exists){                
//                const myData = doc.data();           
           
//            }
//        }).catch(function(event){
//         console.log('error : '+ event);
//        });
      
//    });

    
   // enabliing Live loading of data
   
   
       const getRealtimeUpdates = function(){
           let timing = new Date().getTime();
           console.log("timing is "+timing);
           console.log('it shoud be running now');
          
           docRef.onSnapshot(function(doc){
               if(doc && doc.exists){
                   const myData = doc.data();
// Checking and disposing of scripted messages 
                   let message = myData.userInput,
                        tagPosition = message.indexOf('>'),
                        subMessage = message.substring(0,tagPosition+1);
                        let newstuff =[...subMessage.trim() ] ;
                        newstuff[0] = '';
                        newstuff[newstuff.length-1] = '';
                       subMessage = newstuff.join('');

                    console.log(subMessage == 'script');
                   if (subMessage == 'script')
                   {
                       let message = myData.userInput;
                       console.log('garbage collected\n'+ message.substring(0,user.length-1));
                   }else 
                  { 
                      const li = document.createElement('li');
                         console.log(myData.userInput);
                        li.innerHTML =  myData.userInput;
                        textToSave = myData.userInput;
                        chats.insertBefore(li,chats.childNodes[0]);
               
                   }
                
                
               }
           });
       }
// Sending on keyPress 
       window.onkeydown=function(event){
           if(event.keyCode==13){
               send.click();
               userInput.value = '';
               console.log('you pressed enter');
           }
       };

let arr = [];

getRealtimeUpdates();
   
function timer(){

}


