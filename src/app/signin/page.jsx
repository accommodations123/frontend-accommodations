import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import TextInput from "@/components/auth/TextInput";
import Button from "@/components/auth/Button";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApi";

const Signin = () => {
  const navigate = useNavigate();

  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();

  const [step, setStep] = useState("email"); // email | otp
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- SEND OTP ---------- */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendOtp({ email: formData.email }).unwrap();
      alert("OTP sent to your email");
      setStep("otp");
    } catch (error) {
      alert(error?.data?.message || "Failed to send OTP");
    }
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await verifyOtp(formData).unwrap()

      if (result) {
        if (result.user) {
          // Store user details for UI hints ONLY (name, etc.). 
          // Auth state is verified by backend via getMe query.
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        alert("Login Successful!")
        navigate("/"); // Redirect to home; Navbar will refetch auth state
      }
    } catch (error) {
      alert(error?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full min-h-screen grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-primary relative overflow-hidden h-full">
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
            <div className="w-70 h-50 rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src="/logo2.png"
                alt="NextKinLife Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-300 text-xl leading-relaxed">
              Access your personalized dashboard and stay connected.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full bg-gray-50 flex flex-col justify-center items-center p-8 md:p-12 h-full overflow-y-auto">
          <div className="w-full max-w-sm mx-auto py-8">
            <div className="text-center mb-8 lg:hidden">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg mx-auto mb-4">
                <img
                  src="/logo.jpeg"
                  alt="NextKinLife Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === "email" ? "Sign In" : "Verify OTP"}
              </h2>
            </div>

            <div className="hidden lg:block mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {step === "email" ? "Sign In" : "Verify OTP"}
              </h2>
              <p className="text-gray-500">
                {step === "email"
                  ? "Enter your email to receive OTP"
                  : "Enter the OTP sent to your email"}
              </p>
            </div>

            {/* EMAIL STEP */}
            {step === "email" && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white"
                  required
                />

                <Button
                  type="submit"
                  disabled={sendingOtp}
                  className="mt-4 w-full py-3 text-base"
                >
                  {sendingOtp ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* OTP STEP */}
            {step === "otp" && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <TextInput
                  label="OTP"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  icon={KeyRound}
                  value={formData.otp}
                  onChange={handleChange}
                  className="bg-white"
                  required
                />

                <Button
                  type="submit"
                  disabled={verifyingOtp}
                  className="mt-4 w-full py-3 text-base"
                >
                  {verifyingOtp ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Sign In <ArrowRight size={20} />
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-blue-600 hover:underline w-full text-center"
                >
                  Change Email
                </button>
              </form>
            )}

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;