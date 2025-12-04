import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import FormCard from '@/components/auth/FormCard';
import TextInput from '@/components/auth/TextInput';
import Button from '@/components/auth/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        otp: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen w-full bg-white overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full min-h-screen grid grid-cols-1 lg:grid-cols-2"
            >
                {/* Left Side - Description (Logo Palette) */}
                <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-primary relative overflow-hidden h-full">
                    {/* Background Effects */}
                    {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div> */}

                    <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
                        <div className="w-70 h-50 rounded-3xl overflow-hidden shadow-2xl mb-8 ">
                            <img src="/logo2.png" alt="NextKinLife Logo" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                            Join the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">NextKinLife</span>
                        </h1>
                        <p className="text-gray-300 text-xl leading-relaxed">
                            Connect, explore, and thrive with a community that understands you. Start your journey today.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form (Light Bright Gray) */}
                <div className="w-full bg-gray-50 flex flex-col justify-center items-center p-8 md:p-12 h-full overflow-y-auto">
                    <div className="w-full max-w-md mx-auto py-8">
                        <div className="text-center mb-8 lg:hidden">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg mx-auto mb-4">
                                <img src="/logo.jpeg" alt="NextKinLife Logo" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                        </div>

                        <div className="lg:hidden mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                            <p className="text-gray-500">Create your account to get started</p>
                        </div>

                        <div className="hidden lg:block mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                            <p className="text-gray-500">Enter your details below to get started</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    label="First Name"
                                    name="firstName"
                                    placeholder="John"
                                    icon={User}
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-white"
                                    required
                                />
                                <TextInput
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Doe"
                                    icon={User}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="bg-white"
                                    required
                                />
                            </div>

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

                            <TextInput
                                label="Verification Code"
                                name="otp"
                                placeholder="Enter OTP"
                                icon={ShieldCheck}
                                value={formData.otp}
                                onChange={handleChange}
                                className="bg-white"
                                rightElement={
                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        Get OTP
                                    </button>
                                }
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={Lock}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-white"
                                    required
                                />
                                <TextInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={Lock}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-white"
                                    required
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="mt-6 w-full shadow-blue-500/20 py-3 text-base">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Sign Up <ArrowRight size={20} />
                                    </>
                                )}
                            </Button>

                            <div className="text-center mt-8">
                                <p className="text-sm text-gray-500">
                                    Already have an account?{' '}
                                    <Link
                                        to="/signin"
                                        className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
