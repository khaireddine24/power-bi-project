/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { deleteUser} from '@/services/api';
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
import { Loader2 } from 'lucide-react';
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
      onUserDeleted();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete user',
        variant: 'destructive',
      });
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open: any) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the user <strong>{user.name || user.email}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isDeleting}>Cancel</Button>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;