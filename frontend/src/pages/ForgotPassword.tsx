/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { requestPasswordReset } from '@/services/api';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle, CheckCircle, ArrowLeft, Mail, Send } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await requestPasswordReset(data);
      setEmailSent(true);
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ borderRadius: "16px" }}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 transform -skew-y-6"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            
            <div className="relative py-12 px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center text-white"
              >
                <h2 className="text-3xl font-bold mb-2">Reset Your Password</h2>
                <p className="text-blue-100">Enter your email address and we'll send you an OTP code</p>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="px-6 py-8 sm:px-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {emailSent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-start"
              >
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Email Sent</h4>
                  <p className="text-green-700 text-sm">
                    If this email address exists in our system, you will receive an OTP code shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start"
              >
                <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Error</h4>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div className="space-y-6" variants={containerVariants}>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Mail className="h-5 w-5 text-indigo-500" />
                      <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                    </motion.div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                placeholder="example@email.com"
                                type="email"
                                autoComplete="email"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                {...field}
                              />
                              <motion.span 
                                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500" 
                                initial={{ width: 0 }}
                                whileFocus={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-sm text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      variants={buttonVariants}
                      initial="idle"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          <span>Send Reset Code</span>
                          <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                            className="ml-2"
                          />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-center mt-6"
                  >
                    <motion.button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
                      whileHover={{ 
                        x: -5,
                        color: "#4F46E5",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Login
                    </motion.button>
                  </motion.div>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            className="bg-gray-50 py-4 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>Never share your OTP code with anyone</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;