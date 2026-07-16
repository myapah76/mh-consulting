import axios, { type InternalAxiosRequestConfig } from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const apiClient = axios.create({
  baseURL: configuredBaseUrl || undefined,
  withCredentials: true,
});

interface CsrfResponse {
  headerName: string;
  parameterName: string;
  token: string;
}

let csrf: Pick<CsrfResponse, 'headerName' | 'token'> | null = null;
let csrfRequest: Promise<Pick<CsrfResponse, 'headerName' | 'token'>> | null = null;

function hasCsrfCookie() {
  return typeof document !== 'undefined' && document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith('XSRF-TOKEN='));
}

export function clearCsrfToken() {
  csrf = null;
}

export async function ensureCsrfToken() {
  if (csrf && hasCsrfCookie()) return csrf;
  if (!csrfRequest) {
    csrfRequest = apiClient.get<CsrfResponse>('/api/auth/csrf')
      .then(({ data }) => {
        csrf = { headerName: data.headerName, token: data.token };
        return csrf;
      })
      .finally(() => {
        csrfRequest = null;
      });
  }
  return csrfRequest;
}

const unsafeMethods = new Set(['post', 'put', 'patch', 'delete']);

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (config.method && unsafeMethods.has(config.method.toLowerCase())) {
    const currentCsrf = await ensureCsrfToken();
    config.headers.set(currentCsrf.headerName, currentCsrf.token);
  }
  return config;
});

export default apiClient;
