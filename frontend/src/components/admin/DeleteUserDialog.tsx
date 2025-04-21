import { useState } from 'react';
import { motion } from 'framer-motion';
import { deleteUser } from '@/services/api';
import { AdminUser } from '@/types/user.types';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: AdminUser;
  onUserDeleted: () => void;
}

const DeleteUserDialog = ({
  open,
  onClose,
  user,
  onUserDeleted,
}: DeleteUserDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      
      onUserDeleted();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete user',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 10, transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center text-lg font-semibold">
            <motion.div 
              variants={iconVariants}
              initial="initial"
              animate="animate"
              className="mr-2 text-amber-500"
            >
              <AlertTriangle size={20} />
            </motion.div>
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete the user{" "}
            <span className="font-medium text-gray-700">
              {user.name || user.email}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="mt-6 flex gap-3">
          <Button 
            variant="outline" 
            disabled={isDeleting} 
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete User'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;