import { useMutation } from '@tanstack/react-query';
import { createConsultation } from '../services/consultationService';

export function useCreateConsultation() {
  return useMutation({
    mutationFn: createConsultation,
    retry: false,
  });
}
