import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'



function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [pan, setPan] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [PanNumber, setPanNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordss, setPasswordss] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuth = sessionStorage.getItem("auth");

    if (isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const signUp_data = {
        panNumber: pan,
        fullName: name,
        email: email,
        mobile_num: mobile,
        setPasswordss: passwordss,
      };

      const res = await axios.post("http://localhost:5000/api/signup", signUp_data);

      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        alert(res.data.message); // show alert
        navigate("/investment"); // navigate after alert
      }
      else {
        alert("User Already Exists")
      }
      console.log(res.data);
    } catch (error) {
      console.log(`There is a Frontend Error: ${error}`);
      setError("Signup failed. Try again.");
      console.log("Backend error:", error.response?.data);
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const login_data = {
        panNumber: PanNumber,
        password: password
      };

      const res = await axios.post('http://localhost:5000/api/login', login_data);

      // ✅ FIRST check response
      if (res.status === 200 && res.data.success) {

        console.log("FULL RESPONSE:", res.data); // 🔍 debug

        const user = res.data.user;
        const token = res.data.token;

        // 🚨 SAVE TOKEN (THIS WAS MISSING)
        sessionStorage.setItem("token", token);

        // Save PAN
        sessionStorage.setItem("auth", JSON.stringify(user.panNumber));

        // Navigate based on registration
        if (user.isRegistered) {
          navigate("/investment");
        } else {
          navigate("/mutual-funds/client-registration");
        }

      } else {
        alert("Login failed");
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800 p-6">
      <div className="bg-zinc-800 shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full min-h-[520px] grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-green-600 text-white">
          <h2 className="text-4xl font-extrabold mb-5">OneFinServ</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-5">
            {isSignup
              ? "Join us and start investing."
              : "Grow your wealth with smart SIPs."}
          </h3>
          <p className="text-gray-300 max-w-md">
            {isSignup
              ? "Create an account to track your portfolio."
              : "Track your portfolio and secure your future."}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10 md:p-14 flex flex-col justify-center bg-zinc-900">
          <h2 className="text-3xl font-semibold text-white mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <form className="space-y-4" onSubmit={isSignup ? handleSignup : handleLogin}>

            {/* LOGIN FIELDS */}
            {!isSignup && (
              <>
                <input
                  type="text"
                  placeholder="PAN Card"
                  name="pan"
                  value={PanNumber}
                  onChange={(e) => setPanNumber(e.target.value)}
                  className="w-full py-2 bg-transparent text-white border-b border-gray-500 focus:outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 bg-transparent text-white border-b border-gray-500 focus:outline-none"
                />
              </>
            )}

            {/* SIGNUP FIELDS (UI only for now) */}
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="PAN Number"
                  name="pan"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  className="w-full py-2 bg-transparent text-white border-b border-gray-500 focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2 bg-transparent text-white border-b border-gray-500 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 bg-transparent text-white border-b border-gray-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoComplete="off"
                  className="w-full py-2 text-white border-b border-gray-500 focus:outline-none bg-transparent appearance-none"
                />

                <input
                  type="password"
                  placeholder="Set Password"
                  value={passwordss}
                  onChange={(e) => setPasswordss(e.target.value)}
                  className="w-full py-2 bg-transparent text-white border-b border-gray-500 focus:outline-none"
                />
              </>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-md font-semibold
              transition-all duration-300 ease-in-out
            hover:bg-gray-200 hover:shadow-lg hover:-translate-y-0.5
              active:scale-95 active:shadow-sm"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>

            {/* TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="w-full bg-gray-700 text-white py-3 rounded-md"
            >
              {isSignup
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;