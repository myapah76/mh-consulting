import { useMutation } from '@tanstack/react-query';
import { changeCurrentAdminPassword, createAdminAccount } from '../services/adminAccountService';

export const adminAccountKeys = {
  all: ['admin-accounts'] as const,
};

export function useCreateAdminAccount() {
  return useMutation({ mutationFn: createAdminAccount, retry: false });
}

export function useChangeAdminPassword() {
  return useMutation({ mutationFn: changeCurrentAdminPassword, retry: false });
}
