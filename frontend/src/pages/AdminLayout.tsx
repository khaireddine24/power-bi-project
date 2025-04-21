/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Users, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout',
        variant: 'destructive',
      });
    }
  };

  const sidebarVariants = {
    open: {
      width: '16rem',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      width: '5rem',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const textVariants = {
    open: { opacity: 1, x: 0, display: 'block' },
    closed: { 
      opacity: 0, 
      x: -10, 
      transitionEnd: { display: 'none' }
    }
  };

  return (
    <motion.div 
      className="flex min-h-screen bg-gradient-to-br from-blue-50 to-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Navbar for mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Sidebar */}
      <motion.aside 
        className="fixed top-0 left-0 h-full bg-white shadow-lg z-10 overflow-hidden"
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        initial="open"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              variants={textVariants}
            >
              Admin Panel
            </motion.h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:flex hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
          
          <nav className="space-y-1">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100'
                }`
              }
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 0 : [0, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Users size={18} />
              </motion.div>
              <motion.span variants={textVariants}>User Management</motion.span>
            </NavLink>
            
            <Separator className="my-4" />
            
            <Button
              variant="ghost"
              className="flex w-full items-center gap-2 px-3 py-2 justify-start hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <motion.span variants={textVariants}>Logout</motion.span>
            </Button>
          </nav>
        </div>
      </motion.aside>
      
      {/* Main content */}
      <motion.main 
        className="flex-1 p-6 md:pt-6 pt-20"
        animate={{ 
          marginLeft: sidebarOpen ? '16rem' : '5rem',
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </motion.div>
  );
};

export default AdminLayout;