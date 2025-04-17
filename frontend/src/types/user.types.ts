export interface AdminUser {
    id: number;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
}

export interface EditUserDialogProps {
    open: boolean;
    onClose: () => void;
    user: AdminUser;
    onUserUpdated: () => void;
  }