import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { UserCircle, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-50 p-6 border-r">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="space-y-1">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md ${
                isActive ? 'bg-slate-200' : 'hover:bg-slate-100'
              }`
            }
          >
            <Users size={18} />
            <span>User Management</span>
          </NavLink>
          
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md ${
                isActive ? 'bg-slate-200' : 'hover:bg-slate-100'
              }`
            }
          >
            <UserCircle size={18} />
            <span>My Profile</span>
          </NavLink>
          
          <Separator className="my-4" />
          
          <Button
            variant="ghost"
            className="flex w-full items-center gap-2 px-3 py-2 justify-start hover:bg-slate-100"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;