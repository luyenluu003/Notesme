import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNdPoTt4zUoyIvyG_AE6VMemlOfVuOX9g",
  authDomain: "notes-9c328.firebaseapp.com",
  projectId: "notes-9c328",
  storageBucket: "notes-9c328.appspot.com",
  messagingSenderId: "198913540106",
  appId: "1:198913540106:web:ec7c97bf1c48a9291f1ff3",
  measurementId: "G-ZXC50FC342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const App = () => {

  return <>
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/signup" exact element={<SignUp />}/>
    </Routes>
  </>
};

export default App;
