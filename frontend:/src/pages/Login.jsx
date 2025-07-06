// // src/assets/pages/Login.jsx

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// // 上溯兩層到 src，再找到 firebase.js
// import { auth } from "../../firebase";
// import "./Login.css";

// function Login() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); // 如果你要登入後跳轉頁面再用，否則可以移除


//   // 監聽使用者登入／登出狀態
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Google 登入
//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       // 如果你想在登入成功後自動導向某頁，可在這裡呼叫：
//       // navigate("/");
//     } catch (error) {
//       console.error("signin error：", error.message);
//     }
//   };

//   // 登出
//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);


//       // 如果你想在登出後導向登入頁，可在這裡呼叫：
//       // navigate("/login");
//     } catch (error) {
//       console.error("signout error：", error.message);
//     }
//   };
//   return (
//     <div style={{ maxWidth: 400, margin: "0 auto", padding: "2rem" }}>
//       <h1>My Profile</h1>


//       {!user ? (
//         // 尚未登入時顯示 Google 登入按鈕
//         <div>
//           <p>Click to Log in!</p>
//           <button onClick={handleGoogleSignIn}>
//             Google Login 
//           </button>
//         </div>
//       ) : (
        
//         // 已登入時顯示用戶資訊與登出按鈕
//         <div>
//           <p>WELCOME PETPAL!{user.displayName}！</p>
//           <p>Email：{user.email}</p>
//           {user.photoURL && (
//             <img
//               src={user.photoURL}
//               alt="Avatar"
//               style={{ width: 80, height: 80, borderRadius: "50%" }}
//             />
//           )}
//           <br />
//           <button onClick={handleSignOut}>signout</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;


// src/assets/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// 從 src/ 底下的 firebase.js 匯入 auth
import { auth } from "../firebase";

// 引入同層的 CSS 檔
import "./Login.css";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // 若你要登入後跳轉頁面，再使用這個

  // 監聽使用者登入／登出狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Google 登入
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // 如果要在登入後自動導向，可以放在這裡：
      // navigate("/");
    } catch (error) {
      console.error("Google 登入錯誤：", error.message);
    }
  };

  // 登出
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // 如果要在登出後導向登入頁，可以放在這裡：
      // navigate("/login");
    } catch (error) {
      console.error("登出錯誤：", error.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">My Profile</h1>

      {!user ? (
        <div>
          <p className="login-text">Click the button to Log in ：</p>
          <button className="login-button" onClick={handleGoogleSignIn}>
            Use Google account Log in
          </button>
        </div>
      ) : (
        <div className="login-info">
          <p>歡迎，{user.displayName}！</p>
          <p>Email：{user.email}</p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="user-avatar"
            />
          )}
          <button className="logout-button" onClick={handleSignOut}>
            登出
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
