export type Idioma = 'pt' | 'en' | 'es'

export interface Traducao {
  en?: string
  es?: string
}

export interface Mensagem {
  id: string
  tipo: 'texto' | 'audio'
  conteudo: string
  transcricaoAudio?: string
  traducao?: Traducao
  duracaoAudio?: number
  remetente: 'eu' | 'contato'
  horario: string
  lida: boolean
}

export interface Conversa {
  id: string
  contato: string
  avatar?: string
  telefone: string
  ultimaMensagem: string
  horarioUltimaMensagem: string
  naoLidas: number
  online: boolean
  mensagens: Mensagem[]
}
