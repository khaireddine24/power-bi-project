import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminUpdateUserSchema, AdminUpdateUserFormData } from '@/schemas/userSchemas';
import { updateUser } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, UserCog } from 'lucide-react';
import { EditUserDialogProps } from '@/types/user.types';

const EditUserDialog = ({ open, onClose, user, onUserUpdated }: EditUserDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<AdminUpdateUserFormData>({
    resolver: zodResolver(adminUpdateUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email,
      });
    }
  }, [user, form]);

  const handleSubmit = async (data: AdminUpdateUserFormData) => {
    const updateData: Partial<AdminUpdateUserFormData> = {};
    if (data.name && data.name !== user.name) updateData.name = data.name;
    if (data.email && data.email !== user.email) updateData.email = data.email;

    if (Object.keys(updateData).length === 0) {
      toast({
        title: 'Info',
        description: 'No changes to update',
      });
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUser(user.id, updateData);
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      onUserUpdated();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update user',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.3 
      } 
    })
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2">
            <UserCog className="h-5 w-5 text-blue-500" />
            <DialogTitle className="text-lg font-medium">
              Edit User: {user?.name || user?.email}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <motion.div
              custom={0}
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter name" 
                        {...field} 
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div
              custom={1}
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter email" 
                        {...field}
                        className="h-10" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <motion.div
              custom={2}
              variants={formItemVariants}
              initial="hidden"
              animate="visible"
            >
              <DialogFooter className="mt-6 flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update User'
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;