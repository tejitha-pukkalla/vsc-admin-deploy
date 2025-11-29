import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDashboardPath } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Attempt login
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect to role-based dashboard
      const dashboardPath = getDashboardPath(result.user.role);
      navigate(dashboardPath, { replace: true });
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏟️ Sports Stadium
          </h1>
          <p className="text-gray-600">Admin Panel Login</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back!
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@sportsstadium.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 Sports Stadium. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;

















// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { getDashboardPath } from '../../utils/auth';
// import { motion } from 'framer-motion';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields');
//       setLoading(false);
//       return;
//     }

//     const result = await login(formData.email, formData.password);

//     if (result.success) {
//       const dashboardPath = getDashboardPath(result.user.role);
//       navigate(dashboardPath, { replace: true });
//     } else {
//       setError(result.message);
//       setLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.2,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   const floatingVariants = {
//     animate: {
//       y: [-10, 10, -10],
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             x: [0, 50, 0],
//             y: [0, 30, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, -50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300 opacity-10 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.4, 1],
//             rotate: [0, 180, 360],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
//         <motion.div
//           className="max-w-md w-full"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Logo Section */}
//           <motion.div 
//             className="text-center mb-8"
//             variants={itemVariants}
//           >
//             <motion.div
//               className="inline-block"
//               variants={floatingVariants}
//               animate="animate"
//             >
//               <div className="w-20 h-20 mx-auto mb-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-2xl">
//                 <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//             </motion.div>
//             <motion.h1 
//               className="text-5xl font-bold text-white mb-2"
//               variants={itemVariants}
//             >
//               Sports Stadium
//             </motion.h1>
//             <motion.p 
//               className="text-white text-opacity-90 text-lg"
//               variants={itemVariants}
//             >
//               Admin Portal Access
//             </motion.p>
//           </motion.div>

//           {/* Login Card */}
//           <motion.div
//             className="bg-white bg-opacity-10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white border-opacity-20"
//             variants={itemVariants}
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <motion.h2 
//               className="text-3xl font-bold text-white mb-6 text-center"
//               variants={itemVariants}
//             >
//               Welcome Back! 👋
//             </motion.h2>

//             {/* Error Message */}
//             {error && (
//               <motion.div
//                 className="mb-6 p-4 bg-red-500 bg-opacity-20 backdrop-blur-lg border border-red-400 border-opacity-30 rounded-xl"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ type: "spring" }}
//               >
//                 <div className="flex items-center space-x-2">
//                   <svg className="w-5 h-5 text-red-200" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-red-100 text-sm font-medium">{error}</p>
//                 </div>
//               </motion.div>
//             )}

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <motion.div variants={itemVariants}>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-semibold text-white mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="w-5 h-5 text-white text-opacity-60 group-hover:text-opacity-80 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                     </svg>
//                   </div>
//                   <motion.input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent transition-all"
//                     placeholder="admin@sportsstadium.com"
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                 </div>
//               </motion.div>

//               {/* Password Field */}
//               <motion.div variants={itemVariants}>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-semibold text-white mb-2"
//                 >
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="w-5 h-5 text-white text-opacity-60 group-hover:text-opacity-80 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <motion.input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full pl-12 pr-12 py-3 bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent transition-all"
//                     placeholder="••••••••"
//                     required
//                     whileFocus={{ scale: 1.02 }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-white text-opacity-60 hover:text-opacity-100 transition-all"
//                   >
//                     {showPassword ? (
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     ) : (
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </motion.div>

//               {/* Submit Button */}
//               <motion.button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-2xl transition-all ${
//                   loading
//                     ? 'bg-gray-400 bg-opacity-50 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
//                 }`}
//                 variants={itemVariants}
//                 whileHover={!loading ? { scale: 1.05 } : {}}
//                 whileTap={!loading ? { scale: 0.95 } : {}}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin h-6 w-6 mr-3"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                         fill="none"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       />
//                     </svg>
//                     Logging in...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center space-x-2">
//                     <span>Sign In</span>
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                   </span>
//                 )}
//               </motion.button>
//             </form>

//             {/* Demo Credentials */}
//             <motion.div
//               className="mt-6 p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-20"
//               variants={itemVariants}
//             >
//               <div className="flex items-start space-x-2">
//                 <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                 </svg>
//                 <div className="flex-1">
//                   <p className="text-xs font-semibold text-white text-opacity-90 mb-2">
//                     Demo Credentials
//                   </p>
//                   <div className="text-xs text-white text-opacity-80 space-y-1">
//                     <p className="font-mono">
//                       <span className="font-semibold">Email:</span> admin@sportsstadium.com
//                     </p>
//                     <p className="font-mono">
//                       <span className="font-semibold">Password:</span> Admin@123
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Footer */}
//           <motion.p
//             className="text-center text-white text-opacity-80 text-sm mt-8"
//             variants={itemVariants}
//           >
//             © 2025 Sports Stadium. All rights reserved.
//           </motion.p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;