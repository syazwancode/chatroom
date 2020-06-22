var nameText = document.getElementById("name")
var msgText = document.getElementById("msg")

document.addEventListener('keypress', function (e) {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
        sendMsg()
    }
})

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAK1lP1ZkjaRZ0BpjNaeL9Ua_1XChHxrAw",
    authDomain: "invoke-chatroom.firebaseapp.com",
    databaseURL: "https://invoke-chatroom.firebaseio.com",
    projectId: "invoke-chatroom",
    storageBucket: "invoke-chatroom.appspot.com",
    messagingSenderId: "358230263798",
    appId: "1:358230263798:web:c59290e0df9fed294da9d7",
    measurementId: "G-EW7BK8XV6T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Send Msg to firebase
function sendMsg() {
    console.log(nameText.value, msg.value)

    if (nameText.value !== '' && msgText.value !== '') {
        console.log('not empty')
        //upload to firebase
        firebase.database().ref().child('chatRoom').push({
            name: nameText.value,
            msg: msgText.value,
        }, function () { //callback function
            console.log("Sent.");
            nameText.value = "";
            msgText.value = "";
        })
    } else {
        console.log('empty')
        alert('input is empty')
    }
}

// Listening to Firebase database update
firebase.database().ref().child('chatRoom').on('child_added', function (snapshot) {
    var data = snapshot.val();
    console.log(data)

    //display to chatroom

    //ceate new elements
    var chat = document.createElement('div');
    var namePa = document.createElement('p');
    var msgPa = document.createElement('p');

    //add classname
    chat.className = "chatBox animasi"

    if (data.name === 'admin') {
        chat.className = "me chatBox animasi"
    }

    var nameNode = document.createTextNode(data.name);
    var msgNode = document.createTextNode(data.msg);

    //append name node and msg node to P element
    namePa.appendChild(nameNode);
    msgPa.appendChild(msgNode);

    //append name and msg P to div element
    chat.appendChild(namePa);
    chat.appendChild(msgPa);

    //append chat to chatroom div element
    document.getElementById('chat-room').appendChild(chat);

    document.getElementById('chat-room').scrollTop = document.getElementById('chat-room').scrollHeight
})