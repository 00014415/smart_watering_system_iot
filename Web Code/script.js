// for importing necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration keys here
const firebaseConfig = {
  apiKey: "AIzaSyBSgIE4CKVtoMErYamOPdFqZa0OBQYgcYI",
  authDomain: "smart-watering-system-3b10c.firebaseapp.com",
  databaseURL: "https://smart-watering-system-3b10c-default-rtdb.firebaseio.com",
  projectId: "smart-watering-system-3b10c",
  storageBucket: "smart-watering-system-3b10c.firebasestorage.app",
  messagingSenderId: "146724619687",
  appId: "1:146724619687:web:c4db781f6ca3a6afffe282",
  measurementId: "G-PEV87DJR5Z"
};

// Here is Initializing firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// it is for references to the moisture and pump state in firebase named
const moistureRef = ref(database, 'moistureVal');
const pumpRef = ref(database, 'pumpActive');

// it is for listening and checking for moisture value changes
onValue(moistureRef, (snapshot) => {
  const soilMoisture = snapshot.val();
  document.getElementById('Soil').innerHTML = "Soil Moisture Level: " + soilMoisture + "%";
});

// Button logic to managing the pump state
document.getElementById('pumpControl').addEventListener('click', function() {
  get(pumpRef).then((snapshot) => {
    const currentState = snapshot.val();
    if (currentState === 1) {
        document.getElementById('pumpControl').innerHTML = "Turn OFF Pump";
        set(pumpRef, 0); // Turn off the pump
    } else {
        document.getElementById('pumpControl').innerHTML = "Turn ON Pump";
        set(pumpRef, 1); // Turn on the pump
    }
  });
});
