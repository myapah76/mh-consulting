import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  clearLocalAuthState,
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
  prepareCsrf,
  requestAdminPasswordReset,
  resetAdminPassword,
  validateAdminPasswordResetToken,
} from '../api/authService';
import type { AdminUser } from '../types/auth.types';

export const authKeys = {
  current: ['auth', 'current-admin'] as const,
  passwordResetValidations: ['auth', 'password-reset-validation'] as const,
  passwordResetValidation: (fingerprint: string) => [...authKeys.passwordResetValidations, fingerprint] as const,
};

async function createTokenFingerprint(token: string): Promise<string> {
  const encoded = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function useCurrentAdmin() {
  return useQuery({
    queryKey: authKeys.current,
    queryFn: getCurrentAdmin,
    retry: false,
    staleTime: 60_000,
  });
}

export function useLoginAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await prepareCsrf();
      return loginAdmin(credentials);
    },
    retry: false,
    onSuccess: (admin) => queryClient.setQueryData<AdminUser>(authKeys.current, admin),
  });
}

export function useLogoutAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutAdmin,
    retry: false,
    onSuccess: () => queryClient.setQueryData(authKeys.current, null),
  });
}

export function useClearAdminSession() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    clearLocalAuthState();
    queryClient.setQueryData(authKeys.current, null);
  }, [queryClient]);
}

export function useRequestAdminPasswordReset() {
  return useMutation({
    mutationFn: requestAdminPasswordReset,
    retry: false,
    gcTime: 0,
  });
}

export function useValidateAdminPasswordResetToken(token: string) {
  const queryClient = useQueryClient();
  const [fingerprint, setFingerprint] = useState('');

  useEffect(() => {
    let active = true;
    setFingerprint('');
    if (!token) return () => { active = false; };

    void createTokenFingerprint(token)
      .then((value) => { if (active) setFingerprint(value); })
      .catch(() => { if (active) setFingerprint('unavailable'); });

    return () => { active = false; };
  }, [token]);

  useEffect(() => () => {
    queryClient.removeQueries({ queryKey: authKeys.passwordResetValidations });
  }, [queryClient]);

  return useQuery({
    queryKey: authKeys.passwordResetValidation(fingerprint || 'pending'),
    queryFn: () => validateAdminPasswordResetToken({ token }),
    enabled: token.length > 0 && fingerprint.length > 0,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
}

export function useResetAdminPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetAdminPassword,
    retry: false,
    gcTime: 0,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.passwordResetValidations });
    },
  });
}
