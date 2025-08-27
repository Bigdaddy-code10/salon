// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import { toast } from "react-toastify";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); // ✅ use context

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form);
//       login(res.data.token, res.data.user); // context login
//       toast.success("Login successful");
//       navigate("/salons");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white dark:bg-gray-900">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
//         Login
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [rememberMe, setRememberMe] = useState(false); // ✅ new state

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form);
//       const { token, user } = res.data;

//       // ✅ store token based on rememberMe
//       if (rememberMe) {
//         localStorage.setItem("token", token);
//       } else {
//         sessionStorage.setItem("token", token);
//       }

//       login(token, user); // update context
//       toast.success("Login successful");
//       navigate("/salons");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white dark:bg-gray-900">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
//         Login
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="remember"
//             checked={rememberMe}
//             onChange={() => setRememberMe(!rememberMe)}
//             className="mr-2"
//           />
//           <label htmlFor="remember">Remember Me</label>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ from AuthContext

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user, rememberMe); // ✅ uses rememberMe
      toast.success("Login successful");
      navigate("/salons"); // ✅ route after login
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded dark:bg-gray-800"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-2 border rounded dark:bg-gray-800"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
