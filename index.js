import React, { Component } from "react";
import { createRoot } from "react-dom";
import "./style.css";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
  SuspenseWithPerf
} from "reactfire";

// this is my config. Fork this StackBlitz workspace
// and add your own Firebase config to watch the
// burrito status update in real time
const firebaseConfig = {
  apiKey: "AIzaSyBg3u1sJlyJwQCE95oSDH_mtLABS-is8ZM",
  authDomain: "rxfire-525a3.firebaseapp.com",
  databaseURL: "https://rxfire-525a3.firebaseio.com",
  projectId: "rxfire-525a3",
  storageBucket: "rxfire-525a3.appspot.com",
  messagingSenderId: "844180061847",
  appId: "1:844180061847:web:12bb3f40c4174fb7"
};

function Burrito() {
  // lazy load the Firestore SDK
  // and create a ref
  const burritoRef = useFirestore()
    .collection("tryreactfire")
    .doc("burrito");

  // subscribe to the doc. just one line!
  // throws a Promise for Suspense to catch,
  // and then streams live updates
  const burrito = useFirestoreDocData(burritoRef);

  return <p>The burrito is {burrito.yummy ? "good" : "bad"}!</p>;
}

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <h1>🌯</h1>
      <SuspenseWithPerf
        fallback={<p>loading burrito status...</p>}
        traceId={"load-burrito-status"}
      >
        <Burrito />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
}

// Enable Concurrent Mode
// https://reactjs.org/docs/concurrent-mode-adoption.html#enabling-concurrent-mode
createRoot(document.getElementById("root")).render(<App />);
