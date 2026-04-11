import { useState, useRef, useEffect } from 'react'
import { Conversa, Mensagem, Idioma } from '../../types/whatsapp'
import { conversasMock } from '../../data/whatsapp.mock'
import styles from './WhatsAppPage.module.css'

const idiomaLabels: Record<Idioma, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES'
}

const traducoesMock: Record<string, Record<'en' | 'es', string>> = {
  // Simula tradução de novas mensagens via IA
}

function traduzirTexto(texto: string, idioma: 'en' | 'es'): string {
  if (traducoesMock[texto]?.[idioma]) return traducoesMock[texto][idioma]
  // Mock: em produção seria chamada de IA
  return idioma === 'en' ? `[EN] ${texto}` : `[ES] ${texto}`
}

export default function WhatsAppPage() {
  const [conversas, setConversas] = useState<Conversa[]>(conversasMock)
  const [conversaAtiva, setConversaAtiva] = useState<Conversa | null>(conversasMock[0])
  const [mensagemInput, setMensagemInput] = useState('')
  const [busca, setBusca] = useState('')
  const [gravando, setGravando] = useState(false)
  const [tempoGravacao, setTempoGravacao] = useState(0)
  const [idioma, setIdioma] = useState<Idioma>('pt')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversaAtiva?.mensagens])

  useEffect(() => {
    if (gravando) {
      intervaloRef.current = setInterval(() => {
        setTempoGravacao((t) => t + 1)
      }, 1000)
    } else {
      if (intervaloRef.current) clearInterval(intervaloRef.current)
      setTempoGravacao(0)
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current)
    }
  }, [gravando])

  const formatTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60)
    const sec = segundos % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const conversasFiltradas = conversas.filter((c) =>
    c.contato.toLowerCase().includes(busca.toLowerCase())
  )

  const selecionarConversa = (conversa: Conversa) => {
    setConversas((prev) =>
      prev.map((c) =>
        c.id === conversa.id
          ? { ...c, naoLidas: 0, mensagens: c.mensagens.map((m) => ({ ...m, lida: true })) }
          : c
      )
    )
    setConversaAtiva({
      ...conversa,
      naoLidas: 0,
      mensagens: conversa.mensagens.map((m) => ({ ...m, lida: true }))
    })
  }

  const enviarMensagem = () => {
    if (!mensagemInput.trim() || !conversaAtiva) return

    const texto = mensagemInput.trim()
    const novaMensagem: Mensagem = {
      id: `m${Date.now()}`,
      tipo: 'texto',
      conteudo: texto,
      remetente: 'eu',
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      lida: true,
      traducao: {
        en: traduzirTexto(texto, 'en'),
        es: traduzirTexto(texto, 'es')
      }
    }

    const conversaAtualizada = {
      ...conversaAtiva,
      mensagens: [...conversaAtiva.mensagens, novaMensagem],
      ultimaMensagem: novaMensagem.conteudo,
      horarioUltimaMensagem: novaMensagem.horario
    }

    setConversaAtiva(conversaAtualizada)
    setConversas((prev) => prev.map((c) => (c.id === conversaAtualizada.id ? conversaAtualizada : c)))
    setMensagemInput('')
  }

  const enviarAudio = () => {
    if (!conversaAtiva) return

    const transcricao = 'Áudio gravado pelo corretor com informações sobre o imóvel.'
    const novaMensagem: Mensagem = {
      id: `m${Date.now()}`,
      tipo: 'audio',
      conteudo: '',
      duracaoAudio: tempoGravacao,
      transcricaoAudio: transcricao,
      remetente: 'eu',
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      lida: true,
      traducao: {
        en: traduzirTexto(transcricao, 'en'),
        es: traduzirTexto(transcricao, 'es')
      }
    }

    const conversaAtualizada = {
      ...conversaAtiva,
      mensagens: [...conversaAtiva.mensagens, novaMensagem],
      ultimaMensagem: 'Audio',
      horarioUltimaMensagem: novaMensagem.horario
    }

    setConversaAtiva(conversaAtualizada)
    setConversas((prev) => prev.map((c) => (c.id === conversaAtualizada.id ? conversaAtualizada : c)))
    setGravando(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensagem()
    }
  }

  const getTextoOriginal = (msg: Mensagem) => {
    if (msg.tipo === 'audio') return msg.transcricaoAudio || ''
    return msg.conteudo
  }

  const getTraducao = (msg: Mensagem) => {
    if (idioma === 'pt') return null
    return msg.traducao?.[idioma] || null
  }

  return (
    <div className={styles.container}>
      {/* Painel de Conversas */}
      <div className={styles.conversasPanel}>
        <div className={styles.conversasHeader}>
          <h2 className={styles.conversasTitle}>Conversas</h2>
          <div className={styles.conversasActions}>
            <button className={styles.actionBtn} title="Nova conversa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.buscaWrapper}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Pesquisar conversa..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={styles.buscaInput}
          />
        </div>

        <div className={styles.conversasList}>
          {conversasFiltradas.map((conversa) => (
            <div
              key={conversa.id}
              className={`${styles.conversaItem} ${conversaAtiva?.id === conversa.id ? styles.conversaAtiva : ''}`}
              onClick={() => selecionarConversa(conversa)}
            >
              <div className={styles.conversaAvatar}>
                {conversa.avatar ? (
                  <img src={conversa.avatar} alt={conversa.contato} className={styles.avatarImg} />
                ) : (
                  <span>{conversa.contato.charAt(0)}</span>
                )}
                {conversa.online && <div className={styles.onlineIndicator} />}
              </div>
              <div className={styles.conversaInfo}>
                <div className={styles.conversaTop}>
                  <span className={styles.conversaNome}>{conversa.contato}</span>
                  <span className={styles.conversaHorario}>{conversa.horarioUltimaMensagem}</span>
                </div>
                <div className={styles.conversaBottom}>
                  <span className={styles.conversaPreview}>{conversa.ultimaMensagem}</span>
                  {conversa.naoLidas > 0 && (
                    <span className={styles.naoLidasBadge}>{conversa.naoLidas}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Painel de Chat */}
      {conversaAtiva ? (
        <div className={styles.chatPanel}>
          {/* Header do chat */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.chatAvatar}>
                {conversaAtiva.avatar ? (
                  <img src={conversaAtiva.avatar} alt={conversaAtiva.contato} className={styles.avatarImg} />
                ) : (
                  <span>{conversaAtiva.contato.charAt(0)}</span>
                )}
                {conversaAtiva.online && <div className={styles.onlineIndicator} />}
              </div>
              <div>
                <div className={styles.chatNome}>{conversaAtiva.contato}</div>
                <div className={styles.chatStatus}>
                  {conversaAtiva.online ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            <div className={styles.chatHeaderRight}>
              {/* Seletor de idioma */}
              <div className={styles.idiomaSeletor}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.idiomaIcon}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {(['pt', 'en', 'es'] as Idioma[]).map((lang) => (
                  <button
                    key={lang}
                    className={`${styles.idiomaBtn} ${idioma === lang ? styles.idiomaBtnAtivo : ''}`}
                    onClick={() => setIdioma(lang)}
                  >
                    {idiomaLabels[lang]}
                  </button>
                ))}
              </div>

              <div className={styles.chatHeaderActions}>
                <button className={styles.actionBtn} title="Buscar na conversa">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} title="Mais opcoes">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div className={styles.mensagensArea}>
            {conversaAtiva.mensagens.map((msg) => {
              const traducao = getTraducao(msg)
              const textoOriginal = getTextoOriginal(msg)

              return (
                <div
                  key={msg.id}
                  className={`${styles.mensagem} ${msg.remetente === 'eu' ? styles.mensagemEu : styles.mensagemContato}`}
                >
                  <div className={`${styles.balao} ${msg.remetente === 'eu' ? styles.balaoEu : styles.balaoContato}`}>
                    {msg.tipo === 'audio' && (
                      <div className={styles.audioPlayer}>
                        <button className={styles.playBtn}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                          </svg>
                        </button>
                        <div className={styles.audioWaveform}>
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className={styles.audioBar}
                              style={{ height: `${Math.random() * 20 + 4}px` }}
                            />
                          ))}
                        </div>
                        <span className={styles.audioDuracao}>{formatTempo(msg.duracaoAudio || 0)}</span>
                      </div>
                    )}

                    {/* Texto original ou transcrição do áudio */}
                    {msg.tipo === 'texto' && (
                      <p className={styles.mensagemTexto}>{msg.conteudo}</p>
                    )}

                    {msg.tipo === 'audio' && msg.transcricaoAudio && (
                      <div className={styles.transcricaoBloco}>
                        <div className={styles.transcricaoLabel}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <rect x="9" y="1" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
                            <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Transcrição
                        </div>
                        <p className={styles.transcricaoTexto}>{msg.transcricaoAudio}</p>
                      </div>
                    )}

                    {/* Tradução */}
                    {traducao && textoOriginal && (
                      <div className={styles.traducaoBloco}>
                        <div className={styles.traducaoLabel}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 2C14.5 4.74 16 8.29 16 12C16 15.71 14.5 19.26 12 22C9.5 19.26 8 15.71 8 12C8 8.29 9.5 4.74 12 2Z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          {idioma === 'en' ? 'English' : 'Español'}
                        </div>
                        <p className={styles.traducaoTexto}>{traducao}</p>
                      </div>
                    )}

                    <div className={styles.mensagemMeta}>
                      <span className={styles.mensagemHorario}>{msg.horario}</span>
                      {msg.remetente === 'eu' && (
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className={styles.checkIcon}>
                          <path d="M1 5.5L4.5 9L11 2" stroke={msg.lida ? '#53bdeb' : '#8696a0'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 5.5L8.5 9L15 2" stroke={msg.lida ? '#53bdeb' : '#8696a0'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensagem */}
          <div className={styles.inputArea}>
            {gravando ? (
              <div className={styles.gravandoBar}>
                <button className={styles.cancelarGravacao} onClick={() => setGravando(false)} title="Cancelar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className={styles.gravandoInfo}>
                  <div className={styles.gravandoDot} />
                  <span className={styles.gravandoTempo}>{formatTempo(tempoGravacao)}</span>
                </div>
                <button className={styles.enviarAudioBtn} onClick={enviarAudio} title="Enviar audio">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="Digite uma mensagem..."
                    value={mensagemInput}
                    onChange={(e) => setMensagemInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.mensagemInput}
                  />
                </div>
                {mensagemInput.trim() ? (
                  <button className={styles.enviarBtn} onClick={enviarMensagem} title="Enviar">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <button className={styles.micBtn} onClick={() => setGravando(true)} title="Gravar audio">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="1" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 19V23M8 23H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.emptyChat}>
          <div className={styles.emptyChatContent}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>WhatsApp Integrado</h3>
            <p>Selecione uma conversa para iniciar</p>
          </div>
        </div>
      )}
    </div>
  )
}
