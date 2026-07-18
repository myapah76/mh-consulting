import axios, {
  type InternalAxiosRequestConfig,
} from 'axios';

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim();

const configuredBaseUrl =
  rawBaseUrl?.replace(/\/+$/, '');

const apiClient = axios.create({
  baseURL: configuredBaseUrl || undefined,
  withCredentials: true,
});

interface CsrfResponse {
  headerName: string;
  parameterName: string;
  token: string;
}

type CachedCsrf = Pick<
  CsrfResponse,
  'headerName' | 'token'
>;

let csrf: CachedCsrf | null = null;
let csrfRequest: Promise<CachedCsrf> | null = null;

export function clearCsrfToken() {
  csrf = null;
}

export async function ensureCsrfToken(): Promise<CachedCsrf> {
  if (csrf) {
    return csrf;
  }

  if (!csrfRequest) {
    csrfRequest = apiClient
      .get<CsrfResponse>('/api/auth/csrf')
      .then(({ data }) => {
        if (
          !data.headerName?.trim() ||
          !data.token?.trim()
        ) {
          throw new Error('Invalid CSRF response');
        }

        csrf = {
          headerName: data.headerName,
          token: data.token,
        };

        return csrf;
      })
      .finally(() => {
        csrfRequest = null;
      });
  }

  return csrfRequest;
}

const unsafeMethods = new Set([
  'post',
  'put',
  'patch',
  'delete',
]);

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const method = config.method?.toLowerCase();

    if (method && unsafeMethods.has(method)) {
      const currentCsrf =
        await ensureCsrfToken();

      config.headers.set(
        currentCsrf.headerName,
        currentCsrf.token
      );
    }

    return config;
  }
);

export default apiClient;
