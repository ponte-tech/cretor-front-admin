const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090'
const TENANT_ID = import.meta.env.VITE_TENANT_ID || ''

interface RequestOptions {
  method?: string
  body?: unknown
  auth?: boolean
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Tenant-ID': TENANT_ID,
  }

  if (auth) {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição')
  }

  return data as T
}

// Auth types
export interface UsuarioResponse {
  id: string
  nome: string
  email: string
  telefone: string
  foto?: string
  role: string
  status: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  usuario: UsuarioResponse
  access_token: string
  refresh_token: string
  expires_in: number
}

// Auth API
export const authApi = {
  login: (email: string, senha: string) =>
    api<AuthResponse>('/auth/login', { method: 'POST', body: { email, senha } }),

  signup: (data: { nome: string; email: string; senha: string; telefone: string; role: string }) =>
    api<AuthResponse>('/auth/signup', { method: 'POST', body: data }),

  refresh: (refresh_token: string) =>
    api<AuthResponse>('/auth/refresh', { method: 'POST', body: { refresh_token } }),

  logout: () =>
    api<{ message: string }>('/auth/logout', { method: 'POST', auth: true }),
}

// Lead types
export interface LeadResponse {
  id: string
  nome: string
  whatsapp: string
  email: string
  prazo: string
  forma_pagamento: string
  origem: string
  status: string
  created_at: string
}

// Leads API
export const leadsApi = {
  create: (data: { nome: string; whatsapp: string; email: string; prazo: string; forma_pagamento: string; website?: string }) =>
    api<LeadResponse>('/leads', { method: 'POST', body: data }),

  list: (params?: { status?: string; q?: string }) => {
    const query = new URLSearchParams()
    if (params?.status) query.set('status', params.status)
    if (params?.q) query.set('q', params.q)
    const qs = query.toString()
    return api<LeadResponse[]>(`/leads${qs ? '?' + qs : ''}`, { auth: true })
  },

  getById: (id: string) =>
    api<LeadResponse>(`/leads/${id}`, { auth: true }),

  update: (id: string, data: { nome: string; whatsapp: string; email: string; prazo: string; forma_pagamento: string; status: string }) =>
    api<LeadResponse>(`/leads/${id}`, { method: 'PUT', body: data, auth: true }),

  delete: (id: string) =>
    api<{ message: string }>(`/leads/${id}`, { method: 'DELETE', auth: true }),
}

// Pipeline types
export interface NegocioResponse {
  id: string
  lead_id: string
  lead_nome: string
  lead_email: string
  lead_telefone: string
  lead_prazo?: string
  lead_forma_pagamento?: string
  etapa: string
  prioridade: string
  valor_negocio: number
  probabilidade_fechamento: number
  data_criacao: string
  data_ultima_interacao: string
  data_movimentacao: string
  dias_na_etapa: number
  proxima_acao?: string
  ultima_anotacao?: string
  corretor_responsavel?: string
  tags: string[]
  motivo_perda?: string
}

// Pipeline API
export const pipelineApi = {
  list: () =>
    api<NegocioResponse[]>('/pipeline', { auth: true }),

  create: (data: {
    lead_id: string; lead_nome: string; lead_email: string; lead_telefone: string;
    etapa: string; prioridade: string; valor_negocio?: number;
    proxima_acao?: string; ultima_anotacao?: string; corretor_responsavel?: string; tags?: string[]
  }) => api<NegocioResponse>('/pipeline', { method: 'POST', body: data, auth: true }),

  update: (id: string, data: {
    etapa: string; prioridade: string; valor_negocio: number;
    probabilidade_fechamento: number; proxima_acao?: string;
    ultima_anotacao?: string; corretor_responsavel?: string; tags?: string[]; motivo_perda?: string
  }) => api<NegocioResponse>(`/pipeline/${id}`, { method: 'PUT', body: data, auth: true }),

  move: (id: string, etapa: string) =>
    api<NegocioResponse>(`/pipeline/${id}/move`, { method: 'PATCH', body: { etapa }, auth: true }),

  delete: (id: string) =>
    api<{ message: string }>(`/pipeline/${id}`, { method: 'DELETE', auth: true }),
}

// Email API
export const emailApi = {
  send: (data: { to: string; subject: string; body: string; attachment?: string; file_name?: string }) =>
    api<{ message: string }>('/email/send', { method: 'POST', body: data, auth: true }),
}

// Observacao types
export interface ObservacaoResponse {
  id: string
  negocio_id: string
  texto: string
  autor?: string
  created_at: string
}

// Observacoes API
export const observacoesApi = {
  list: (negocioId: string) =>
    api<ObservacaoResponse[]>(`/pipeline/${negocioId}/observacoes`, { auth: true }),

  create: (negocioId: string, data: { texto: string; autor?: string }) =>
    api<ObservacaoResponse>(`/pipeline/${negocioId}/observacoes`, { method: 'POST', body: data, auth: true }),
}
