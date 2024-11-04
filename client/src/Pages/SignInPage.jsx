import React from 'react'
import {motion} from 'framer-motion'
import { ArrowRight, Loader, Lock, LogIn,Mail } from 'lucide-react'
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const loading = !true;
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-8 sm:px-6 lg:px-8">
      {/* Motion for header start here */}
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-4xl text-center mt-5 font-bold font-mono text-emerald-500">
          Log In 
        </h2>
      </motion.div>
      {/* Motion for header end here */}
      {/* Motion for form start here */}
      <motion.div
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 border border-emerald-700 shadow-md px-4 py-8 rounded sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            
            <div>
              <label
                htmlFor="email"
                className="block  font-medium text-emerald-500 text-sm"
              >
                Email:
              </label>
              <div className="relative rounded-md shadow-sm mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email..."
                  className="block bg-gray-900 w-full px-3 py-2 border border-emerald-800 rounded-md shadow-sm pl-10 placeholder-emerald-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-medium text-emerald-500 text-sm"
              >
                Password:
              </label>
              <div className="relative rounded-md shadow-sm mt-1">
                <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password..."
                  className="block w-full bg-gray-900 px-3 py-2 border border-emerald-800 rounded-md shadow-sm placeholder-emerald-700 pl-10 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-emerald-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2
							focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 w-5 h-5 animate-spin"
                    aria-hidden="true"
                  />
                  <span className="ml-2">Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="mr-2 w-5 h-5" aria-hidden="true" />
                  Sign In
                </>
              )}
            </button>
          </form>
          <p className="mt-5 text-md text-center text-gray-300">
            {"Don't"} Have An Account?{" "}
            <Link
              to={"/sign-up"}
              className="text-emerald-800 px-1 py-0.5 bg-gray-300 border font-semibold border-emerald-700 rounded-md hover:bg-emerald-800 hover:text-gray-100"
            >
              Sign Up <ArrowRight className="inline w-4 h-4" />
            </Link>
          </p>
        </div>
      </motion.div>
      {/* Motion for form end here */}
    </div>
  )
}

export default SignInPage 