import { useState, FormEvent } from 'react'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import { Cliente } from '../../types/cliente'
import styles from './ClienteForm.module.css'

interface ClienteFormProps {
  initialData?: Cliente
  onSave: (data: Partial<Cliente>) => void
  onCancel: () => void
}

export default function ClienteForm({ initialData, onSave, onCancel }: ClienteFormProps) {
  const [formData, setFormData] = useState<Partial<Cliente>>(
    initialData || {
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      dataNascimento: '',
      sexo: 'masculino',
      estadoCivil: 'solteiro',
      profissao: '',
      rendaMensal: 0,
      temFilhos: false,
      temPets: false,
      tipoImovel: [],
      finalidade: 'morar',
      metragemMin: 0,
      metragemMax: 0,
      quartos: 1,
      banheiros: 1,
      vagas: 1,
      caracteristicas: [],
      condominio: true,
      condominioFechado: true,
      bairrosPreferidos: [],
      cidadesPreferidas: [],
      pontosInteresse: {
        escolas: false,
        universidades: false,
        hospitais: false,
        shoppings: false,
        parques: false,
        academias: false,
        restaurantes: false,
        supermercados: false,
        transporte: false,
        praia: false,
        metro: false
      },
      orcamentoMin: 0,
      orcamentoMax: 0,
      formasPagamento: [],
      trabalhaHome: false,
      praticaEsportes: false,
      gostaCozinhar: false,
      recebeMuito: false,
      viajaFrequente: false,
      urgencia: 'media',
      motivoCompra: '',
      jaVisitouImoveis: false,
      temImovelVenda: false,
      status: 'prospecto',
      origem: 'site',
      responsavel: 'Ana Paula Costa'
    }
  )

  const [activeTab, setActiveTab] = useState<
    'pessoal' | 'perfil' | 'imovel' | 'fisicas' | 'trabalho' | 'localizacao' | 'especiais' | 'orcamento' | 'prioridades' | 'lifestyle' | 'comportamento'
  >('pessoal')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const updateField = <K extends keyof Cliente>(field: K, value: Cliente[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const tabs = [
    { id: 'pessoal', label: 'Dados Pessoais' },
    { id: 'perfil', label: 'Perfil' },
    { id: 'imovel', label: 'Preferências' },
    { id: 'fisicas', label: 'Características' },
    { id: 'trabalho', label: 'Trabalho' },
    { id: 'localizacao', label: 'Localização' },
    { id: 'especiais', label: 'Necessidades' },
    { id: 'orcamento', label: 'Orçamento' },
    { id: 'prioridades', label: 'Prioridades' },
    { id: 'lifestyle', label: 'Estilo de Vida' },
    { id: 'comportamento', label: 'Comportamento' }
  ] as const

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.formContent}>
        {activeTab === 'pessoal' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Pessoais</h3>
            <div className={styles.grid}>
              <Input
                label="Nome Completo"
                value={formData.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
              <Input
                label="Telefone"
                value={formData.telefone}
                onChange={(e) => updateField('telefone', e.target.value)}
                required
              />
              <Input
                label="CPF"
                value={formData.cpf}
                onChange={(e) => updateField('cpf', e.target.value)}
                required
              />
              <Input
                label="Data de Nascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => updateField('dataNascimento', e.target.value)}
              />
              <Select
                label="Sexo"
                value={formData.sexo}
                onChange={(value) => updateField('sexo', value as 'masculino' | 'feminino')}
                options={[
                  { value: 'masculino', label: 'Masculino' },
                  { value: 'feminino', label: 'Feminino' }
                ]}
              />
              <Select
                label="Estado Civil"
                value={formData.estadoCivil}
                onChange={(value) =>
                  updateField(
                    'estadoCivil',
                    value as 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel'
                  )
                }
                options={[
                  { value: 'solteiro', label: 'Solteiro(a)' },
                  { value: 'casado', label: 'Casado(a)' },
                  { value: 'divorciado', label: 'Divorciado(a)' },
                  { value: 'viuvo', label: 'Viúvo(a)' },
                  { value: 'uniao_estavel', label: 'União Estável' }
                ]}
              />
            </div>
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Perfil Demográfico</h3>
            <div className={styles.grid}>
              <Input
                label="Profissão"
                value={formData.profissao}
                onChange={(e) => updateField('profissao', e.target.value)}
              />
              <Input
                label="Renda Mensal (R$)"
                type="number"
                value={formData.rendaMensal}
                onChange={(e) => updateField('rendaMensal', Number(e.target.value))}
              />
              <Input
                label="Patrimônio (R$)"
                type="number"
                value={formData.patrimonio || 0}
                onChange={(e) => updateField('patrimonio', Number(e.target.value))}
              />
              <Select
                label="Origem"
                value={formData.origem}
                onChange={(value) =>
                  updateField(
                    'origem',
                    value as 'site' | 'indicacao' | 'redes_sociais' | 'evento' | 'telefone' | 'outro'
                  )
                }
                options={[
                  { value: 'site', label: 'Site' },
                  { value: 'indicacao', label: 'Indicação' },
                  { value: 'redes_sociais', label: 'Redes Sociais' },
                  { value: 'evento', label: 'Evento' },
                  { value: 'telefone', label: 'Telefone' },
                  { value: 'outro', label: 'Outro' }
                ]}
              />
              <Select
                label="Status"
                value={formData.status}
                onChange={(value) =>
                  updateField('status', value as 'ativo' | 'inativo' | 'prospecto' | 'cliente')
                }
                options={[
                  { value: 'prospecto', label: 'Prospecto' },
                  { value: 'ativo', label: 'Ativo' },
                  { value: 'cliente', label: 'Cliente' },
                  { value: 'inativo', label: 'Inativo' }
                ]}
              />
              <Input
                label="Responsável"
                value={formData.responsavel}
                onChange={(e) => updateField('responsavel', e.target.value)}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Composição Familiar
            </h3>
            <div className={styles.grid}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.temFilhos}
                    onChange={(e) => updateField('temFilhos', e.target.checked)}
                  />
                  <span>Tem filhos</span>
                </label>
              </div>
              {formData.temFilhos && (
                <>
                  <Input
                    label="Número de Filhos"
                    type="number"
                    value={formData.numeroFilhos || 0}
                    onChange={(e) => updateField('numeroFilhos', Number(e.target.value))}
                  />
                  <Input
                    label="Idade dos Filhos"
                    value={formData.idadeFilhos || ''}
                    onChange={(e) => updateField('idadeFilhos', e.target.value)}
                    placeholder="Ex: 5, 8 e 12 anos"
                  />
                </>
              )}
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.temPets}
                    onChange={(e) => updateField('temPets', e.target.checked)}
                  />
                  <span>Tem pets</span>
                </label>
              </div>
              {formData.temPets && (
                <Input
                  label="Tipo de Pets"
                  value={formData.tipoPets || ''}
                  onChange={(e) => updateField('tipoPets', e.target.value)}
                  placeholder="Ex: 1 cachorro, 2 gatos"
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'imovel' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Preferências de Imóvel</h3>
            <div className={styles.grid}>
              <Select
                label="Finalidade"
                value={formData.finalidade}
                onChange={(value) =>
                  updateField('finalidade', value as 'morar' | 'investir' | 'alugar' | 'temporada')
                }
                options={[
                  { value: 'morar', label: 'Morar' },
                  { value: 'investir', label: 'Investir' },
                  { value: 'alugar', label: 'Alugar' },
                  { value: 'temporada', label: 'Temporada' }
                ]}
              />
              <Input
                label="Metragem Mínima (m²)"
                type="number"
                value={formData.metragemMin}
                onChange={(e) => updateField('metragemMin', Number(e.target.value))}
              />
              <Input
                label="Metragem Máxima (m²)"
                type="number"
                value={formData.metragemMax}
                onChange={(e) => updateField('metragemMax', Number(e.target.value))}
              />
              <Input
                label="Quartos"
                type="number"
                value={formData.quartos}
                onChange={(e) => updateField('quartos', Number(e.target.value))}
              />
              <Input
                label="Banheiros"
                type="number"
                value={formData.banheiros}
                onChange={(e) => updateField('banheiros', Number(e.target.value))}
              />
              <Input
                label="Vagas"
                type="number"
                value={formData.vagas}
                onChange={(e) => updateField('vagas', Number(e.target.value))}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Tipo de Imóvel
            </h3>
            <div className={styles.checkboxGrid}>
              {['apartamento', 'casa', 'cobertura', 'terreno', 'comercial'].map((tipo) => (
                <label key={tipo} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.tipoImovel?.includes(tipo as any)}
                    onChange={(e) => {
                      const current = formData.tipoImovel || []
                      updateField(
                        'tipoImovel',
                        e.target.checked
                          ? [...current, tipo as any]
                          : current.filter((t) => t !== tipo)
                      )
                    }}
                  />
                  <span>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
                </label>
              ))}
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Características Desejadas
            </h3>
            <div className={styles.checkboxGrid}>
              {[
                'piscina',
                'churrasqueira',
                'varanda',
                'sacada',
                'jardim',
                'área gourmet',
                'home office',
                'closet',
                'lavabo',
                'vista mar',
                'vista panorâmica'
              ].map((caracteristica) => (
                <label key={caracteristica} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.caracteristicas?.includes(caracteristica)}
                    onChange={(e) => {
                      const current = formData.caracteristicas || []
                      updateField(
                        'caracteristicas',
                        e.target.checked
                          ? [...current, caracteristica]
                          : current.filter((c) => c !== caracteristica)
                      )
                    }}
                  />
                  <span>{caracteristica}</span>
                </label>
              ))}
            </div>

            <div className={styles.checkboxGrid} style={{ marginTop: '24px' }}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.condominio}
                  onChange={(e) => updateField('condominio', e.target.checked)}
                />
                <span>Em condomínio</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.condominioFechado}
                  onChange={(e) => updateField('condominioFechado', e.target.checked)}
                />
                <span>Condomínio fechado</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'fisicas' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Características Físicas do Imóvel</h3>
            <div className={styles.grid}>
              <Select
                label="Preferência de Andar"
                value={formData.preferenciaAndar || ''}
                onChange={(value) => updateField('preferenciaAndar', value as any)}
                options={[
                  { value: 'terreo', label: 'Térreo' },
                  { value: 'baixo', label: 'Baixo (2-5)' },
                  { value: 'medio', label: 'Médio (6-10)' },
                  { value: 'alto', label: 'Alto (10+)' },
                  { value: 'cobertura', label: 'Cobertura' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
              <Select
                label="Imóvel Novo ou Usado"
                value={formData.imovelNovo || ''}
                onChange={(value) => updateField('imovelNovo', value as any)}
                options={[
                  { value: 'planta', label: 'Novo (na planta)' },
                  { value: 'novo_pronto', label: 'Novo (pronto)' },
                  { value: 'usado_5anos', label: 'Usado (até 5 anos)' },
                  { value: 'usado_qualquer', label: 'Usado (qualquer)' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
              <Select
                label="Estado de Conservação"
                value={formData.estadoConservacao || ''}
                onChange={(value) => updateField('estadoConservacao', value as any)}
                options={[
                  { value: 'pronto', label: 'Pronto para morar' },
                  { value: 'pequena_reforma', label: 'Aceita pequena reforma' },
                  { value: 'reforma_completa', label: 'Aceita reforma completa' }
                ]}
              />
              <Select
                label="Tipo de Acabamento"
                value={formData.tipoAcabamento || ''}
                onChange={(value) => updateField('tipoAcabamento', value as any)}
                options={[
                  { value: 'padrao', label: 'Padrão' },
                  { value: 'alto_padrao', label: 'Alto Padrão' },
                  { value: 'luxo', label: 'Luxo' },
                  { value: 'ultra_luxo', label: 'Ultra Luxo' }
                ]}
              />
              <Select
                label="Orientação Solar"
                value={formData.orientacaoSolar || ''}
                onChange={(value) => updateField('orientacaoSolar', value as any)}
                options={[
                  { value: 'sol_manha', label: 'Sol da manhã' },
                  { value: 'sol_tarde', label: 'Sol da tarde' },
                  { value: 'muita_luz', label: 'Muita luz natural' },
                  { value: 'sem_preferencia', label: 'Sem preferência' }
                ]}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Vista Desejada
            </h3>
            <div className={styles.checkboxGrid}>
              {['cidade', 'mar', 'natureza', 'rio', 'montanha', 'sem_preferencia'].map((vista) => (
                <label key={vista} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.vistaDesejada?.includes(vista as any)}
                    onChange={(e) => {
                      const current = formData.vistaDesejada || []
                      updateField(
                        'vistaDesejada',
                        e.target.checked
                          ? [...current, vista as any]
                          : current.filter((v) => v !== vista)
                      )
                    }}
                  />
                  <span>{vista === 'sem_preferencia' ? 'Sem preferência' : vista.charAt(0).toUpperCase() + vista.slice(1)}</span>
                </label>
              ))}
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Área Externa Privativa
            </h3>
            <div className={styles.checkboxGrid}>
              {['jardim', 'quintal', 'terraco', 'varanda_grande', 'nao_precisa'].map((area) => (
                <label key={area} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.areaExternaPrivativa?.includes(area as any)}
                    onChange={(e) => {
                      const current = formData.areaExternaPrivativa || []
                      updateField(
                        'areaExternaPrivativa',
                        e.target.checked
                          ? [...current, area as any]
                          : current.filter((a) => a !== area)
                      )
                    }}
                  />
                  <span>
                    {area === 'nao_precisa' ? 'Não precisa' :
                     area === 'terraco' ? 'Terraço' :
                     area === 'varanda_grande' ? 'Varanda Grande' :
                     area.charAt(0).toUpperCase() + area.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trabalho' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Trabalho & Mobilidade</h3>
            <div className={styles.grid}>
              <Input
                label="Endereço do Trabalho"
                value={formData.enderecoTrabalho || ''}
                onChange={(e) => updateField('enderecoTrabalho', e.target.value)}
                placeholder="Ex: Av. Paulista, 1000"
              />
              <Select
                label="Tempo Máximo de Deslocamento"
                value={formData.tempoDeslocamentoMax || ''}
                onChange={(value) => updateField('tempoDeslocamentoMax', value as any)}
                options={[
                  { value: '15min', label: '15 minutos' },
                  { value: '30min', label: '30 minutos' },
                  { value: '45min', label: '45 minutos' },
                  { value: '1h', label: '1 hora' },
                  { value: 'sem_restricao', label: 'Sem restrição' }
                ]}
              />
              <Select
                label="Modal de Transporte Principal"
                value={formData.modalTransporte || ''}
                onChange={(value) => updateField('modalTransporte', value as any)}
                options={[
                  { value: 'carro', label: 'Carro próprio' },
                  { value: 'transporte_publico', label: 'Transporte público' },
                  { value: 'a_pe', label: 'A pé' },
                  { value: 'bicicleta', label: 'Bicicleta' },
                  { value: 'misto', label: 'Misto' }
                ]}
              />
              <Select
                label="Horário de Trabalho"
                value={formData.horarioTrabalho || ''}
                onChange={(value) => updateField('horarioTrabalho', value as any)}
                options={[
                  { value: 'comercial', label: 'Comercial' },
                  { value: 'noturno', label: 'Noturno' },
                  { value: 'flexivel', label: 'Flexível' },
                  { value: 'home_office_integral', label: 'Home office integral' }
                ]}
              />
            </div>

            <div className={styles.grid} style={{ marginTop: '24px' }}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.jaMoraCidade}
                    onChange={(e) => updateField('jaMoraCidade', e.target.checked)}
                  />
                  <span>Já mora na cidade</span>
                </label>
              </div>
              {!formData.jaMoraCidade && (
                <Input
                  label="Cidade Atual"
                  value={formData.cidadeAtual || ''}
                  onChange={(e) => updateField('cidadeAtual', e.target.value)}
                  placeholder="De onde está se mudando"
                />
              )}
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.necessitaEscritorio}
                    onChange={(e) => updateField('necessitaEscritorio', e.target.checked)}
                  />
                  <span>Necessita escritório/consultório para receber clientes</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'especiais' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Necessidades Especiais & Acessibilidade</h3>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.necessitaAcessibilidade}
                  onChange={(e) => updateField('necessitaAcessibilidade', e.target.checked)}
                />
                <span>Necessita acessibilidade</span>
              </label>
            </div>

            {formData.necessitaAcessibilidade && (
              <>
                <h3 className={styles.sectionTitle} style={{ marginTop: '24px' }}>
                  Tipo de Acessibilidade
                </h3>
                <div className={styles.checkboxGrid}>
                  {['rampa', 'elevador_obrigatorio', 'portas_largas', 'banheiro_adaptado'].map((tipo) => (
                    <label key={tipo} className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.tipoAcessibilidade?.includes(tipo as any)}
                        onChange={(e) => {
                          const current = formData.tipoAcessibilidade || []
                          updateField(
                            'tipoAcessibilidade',
                            e.target.checked
                              ? [...current, tipo as any]
                              : current.filter((t) => t !== tipo)
                          )
                        }}
                      />
                      <span>
                        {tipo === 'elevador_obrigatorio' ? 'Elevador obrigatório' :
                         tipo === 'portas_largas' ? 'Portas largas' :
                         tipo === 'banheiro_adaptado' ? 'Banheiro adaptado' :
                         'Rampa'}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            <div className={styles.grid} style={{ marginTop: '32px' }}>
              <Select
                label="Mobilidade Reduzida"
                value={formData.mobilidadeReduzida || ''}
                onChange={(value) => updateField('mobilidadeReduzida', value as any)}
                options={[
                  { value: 'nao', label: 'Não' },
                  { value: 'idoso', label: 'Idoso' },
                  { value: 'cadeirante', label: 'Cadeirante' },
                  { value: 'temporario', label: 'Temporário' }
                ]}
              />
              <Select
                label="Quarto de Empregada/Dependência"
                value={formData.necessitaDependencia || ''}
                onChange={(value) => updateField('necessitaDependencia', value as any)}
                options={[
                  { value: 'nao', label: 'Não precisa' },
                  { value: 'simples', label: 'Sim, simples' },
                  { value: 'com_banheiro', label: 'Sim, com banheiro' }
                ]}
              />
            </div>

            <div className={styles.grid} style={{ marginTop: '24px' }}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.temBebe}
                    onChange={(e) => updateField('temBebe', e.target.checked)}
                  />
                  <span>Tem bebê/criança pequena</span>
                </label>
              </div>
              {formData.temBebe && (
                <Input
                  label="Idade do Bebê/Criança"
                  value={formData.idadeBebe || ''}
                  onChange={(e) => updateField('idadeBebe', e.target.value)}
                  placeholder="Ex: 6 meses, 2 anos"
                />
              )}
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Condomínio & Vizinhança
            </h3>
            <div className={styles.grid}>
              <Select
                label="Tamanho do Condomínio"
                value={formData.tamanhoCondominioPreferido || ''}
                onChange={(value) => updateField('tamanhoCondominioPreferido', value as any)}
                options={[
                  { value: 'pequeno', label: 'Pequeno (até 20 unidades)' },
                  { value: 'medio', label: 'Médio (20-50)' },
                  { value: 'grande', label: 'Grande (50+)' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
              <Select
                label="Importância Área de Lazer"
                value={formData.importanciaAreaLazer || ''}
                onChange={(value) => updateField('importanciaAreaLazer', value as any)}
                options={[
                  { value: 'essencial', label: 'Essencial' },
                  { value: 'importante', label: 'Importante' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
              <Select
                label="Perfil de Vizinhança"
                value={formData.perfilVizinhanca || ''}
                onChange={(value) => updateField('perfilVizinhanca', value as any)}
                options={[
                  { value: 'familias', label: 'Famílias' },
                  { value: 'jovens', label: 'Jovens profissionais' },
                  { value: 'aposentados', label: 'Aposentados' },
                  { value: 'misto', label: 'Misto' },
                  { value: 'sem_preferencia', label: 'Sem preferência' }
                ]}
              />
              <Select
                label="Tolerância a Barulho"
                value={formData.toleranciaBarulho || ''}
                onChange={(value) => updateField('toleranciaBarulho', value as any)}
                options={[
                  { value: 'baixa', label: 'Baixa (precisa silêncio)' },
                  { value: 'media', label: 'Média' },
                  { value: 'alta', label: 'Alta' }
                ]}
              />
            </div>
          </div>
        )}

        {activeTab === 'localizacao' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Localização Preferida</h3>
            <div className={styles.grid}>
              <Input
                label="Cidades Preferidas"
                value={formData.cidadesPreferidas?.join(', ') || ''}
                onChange={(e) =>
                  updateField(
                    'cidadesPreferidas',
                    e.target.value.split(',').map((c) => c.trim())
                  )
                }
                placeholder="Ex: São Paulo, Campinas"
              />
              <Input
                label="Bairros Preferidos"
                value={formData.bairrosPreferidos?.join(', ') || ''}
                onChange={(e) =>
                  updateField(
                    'bairrosPreferidos',
                    e.target.value.split(',').map((b) => b.trim())
                  )
                }
                placeholder="Ex: Jardins, Vila Olímpia"
              />
              <Select
                label="Zona Preferida"
                value={formData.zonaPreferida || ''}
                onChange={(value) =>
                  updateField('zonaPreferida', value as 'norte' | 'sul' | 'leste' | 'oeste' | 'centro')
                }
                options={[
                  { value: 'norte', label: 'Zona Norte' },
                  { value: 'sul', label: 'Zona Sul' },
                  { value: 'leste', label: 'Zona Leste' },
                  { value: 'oeste', label: 'Zona Oeste' },
                  { value: 'centro', label: 'Centro' }
                ]}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Pontos de Interesse Próximos
            </h3>
            <div className={styles.checkboxGrid}>
              {Object.keys(formData.pontosInteresse || {}).map((ponto) => (
                <label key={ponto} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.pontosInteresse?.[ponto as keyof typeof formData.pontosInteresse]}
                    onChange={(e) =>
                      updateField('pontosInteresse', {
                        ...formData.pontosInteresse,
                        [ponto]: e.target.checked
                      })
                    }
                  />
                  <span>{ponto.charAt(0).toUpperCase() + ponto.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orcamento' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Orçamento e Pagamento</h3>
            <div className={styles.grid}>
              <Input
                label="Orçamento Mínimo (R$)"
                type="number"
                value={formData.orcamentoMin}
                onChange={(e) => updateField('orcamentoMin', Number(e.target.value))}
              />
              <Input
                label="Orçamento Máximo (R$)"
                type="number"
                value={formData.orcamentoMax}
                onChange={(e) => updateField('orcamentoMax', Number(e.target.value))}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Formas de Pagamento
            </h3>
            <div className={styles.checkboxGrid}>
              {['vista', 'financiamento', 'permuta', 'consorcio'].map((forma) => (
                <label key={forma} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.formasPagamento?.includes(forma as any)}
                    onChange={(e) => {
                      const current = formData.formasPagamento || []
                      updateField(
                        'formasPagamento',
                        e.target.checked
                          ? [...current, forma as any]
                          : current.filter((f) => f !== forma)
                      )
                    }}
                  />
                  <span>{forma.charAt(0).toUpperCase() + forma.slice(1)}</span>
                </label>
              ))}
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Processo de Compra
            </h3>
            <div className={styles.grid}>
              <Select
                label="Urgência"
                value={formData.urgencia}
                onChange={(value) => updateField('urgencia', value as 'baixa' | 'media' | 'alta')}
                options={[
                  { value: 'baixa', label: 'Baixa' },
                  { value: 'media', label: 'Média' },
                  { value: 'alta', label: 'Alta' }
                ]}
              />
              <Input
                label="Motivo da Compra"
                value={formData.motivoCompra}
                onChange={(e) => updateField('motivoCompra', e.target.value)}
                placeholder="Ex: Mudança de cidade"
              />
            </div>

            <div className={styles.checkboxGrid} style={{ marginTop: '24px' }}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.jaVisitouImoveis}
                  onChange={(e) => updateField('jaVisitouImoveis', e.target.checked)}
                />
                <span>Já visitou imóveis</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.temImovelVenda}
                  onChange={(e) => updateField('temImovelVenda', e.target.checked)}
                />
                <span>Tem imóvel para venda</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'prioridades' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Ordem de Prioridade (1=Mais importante, 5=Menos importante)</h3>
            <div className={styles.grid}>
              <Input
                label="Localização"
                type="number"
                min="1"
                max="5"
                value={formData.prioridades?.localizacao || 1}
                onChange={(e) => updateField('prioridades', {
                  ...formData.prioridades,
                  localizacao: Number(e.target.value)
                } as any)}
              />
              <Input
                label="Tamanho/Metragem"
                type="number"
                min="1"
                max="5"
                value={formData.prioridades?.tamanho || 2}
                onChange={(e) => updateField('prioridades', {
                  ...formData.prioridades,
                  tamanho: Number(e.target.value)
                } as any)}
              />
              <Input
                label="Preço/Orçamento"
                type="number"
                min="1"
                max="5"
                value={formData.prioridades?.preco || 3}
                onChange={(e) => updateField('prioridades', {
                  ...formData.prioridades,
                  preco: Number(e.target.value)
                } as any)}
              />
              <Input
                label="Características do Imóvel"
                type="number"
                min="1"
                max="5"
                value={formData.prioridades?.caracteristicas || 4}
                onChange={(e) => updateField('prioridades', {
                  ...formData.prioridades,
                  caracteristicas: Number(e.target.value)
                } as any)}
              />
              <Input
                label="Condomínio/Área de Lazer"
                type="number"
                min="1"
                max="5"
                value={formData.prioridades?.condominio || 5}
                onChange={(e) => updateField('prioridades', {
                  ...formData.prioridades,
                  condominio: Number(e.target.value)
                } as any)}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Must Haves (Top 3 Obrigatórios)
            </h3>
            <Input
              label="Características Obrigatórias"
              value={formData.mustHaves?.join(', ') || ''}
              onChange={(e) => updateField('mustHaves', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Ex: Varanda gourmet, Home office, Vista livre"
            />

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Deal Breakers (Inaceitáveis)
            </h3>
            <Input
              label="O que é inaceitável"
              value={formData.dealBreakers?.join(', ') || ''}
              onChange={(e) => updateField('dealBreakers', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Ex: Via expressa, Sem elevador, Prédio sem portaria 24h"
            />

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Flexibilidade Financeira
            </h3>
            <div className={styles.grid}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.possuiFGTS}
                    onChange={(e) => updateField('possuiFGTS', e.target.checked)}
                  />
                  <span>Possui FGTS para usar</span>
                </label>
              </div>
              {formData.possuiFGTS && (
                <Input
                  label="Valor FGTS (R$)"
                  type="number"
                  value={formData.valorFGTS || 0}
                  onChange={(e) => updateField('valorFGTS', Number(e.target.value))}
                />
              )}
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.imovelEntrada}
                    onChange={(e) => updateField('imovelEntrada', e.target.checked)}
                  />
                  <span>Tem imóvel para dar de entrada</span>
                </label>
              </div>
              {formData.imovelEntrada && (
                <Input
                  label="Valor Estimado do Imóvel (R$)"
                  type="number"
                  value={formData.valorImovelEntrada || 0}
                  onChange={(e) => updateField('valorImovelEntrada', Number(e.target.value))}
                />
              )}
              <Select
                label="Score de Crédito"
                value={formData.scoreCredito || ''}
                onChange={(value) => updateField('scoreCredito', value as any)}
                options={[
                  { value: 'excelente', label: 'Excelente' },
                  { value: 'bom', label: 'Bom' },
                  { value: 'regular', label: 'Regular' },
                  { value: 'nao_sabe', label: 'Não sabe' }
                ]}
              />
              <Select
                label="Preferência de Parcelas"
                value={formData.preferenciaParcelas || ''}
                onChange={(value) => updateField('preferenciaParcelas', value as any)}
                options={[
                  { value: 'entrada_grande', label: 'Entrada grande + parcelas menores' },
                  { value: 'entrada_menor', label: 'Entrada menor + parcelas maiores' }
                ]}
              />
              <Select
                label="Renda Comprometida Aceitável"
                value={formData.rendaComprometida || ''}
                onChange={(value) => updateField('rendaComprometida', value as any)}
                options={[
                  { value: 'ate_20', label: 'Até 20%' },
                  { value: 'ate_30', label: 'Até 30%' },
                  { value: 'ate_40', label: 'Até 40%' }
                ]}
              />
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.podeFiador}
                    onChange={(e) => updateField('podeFiador', e.target.checked)}
                  />
                  <span>Pode ter fiador</span>
                </label>
              </div>
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Sustentabilidade & Tecnologia
            </h3>
            <div className={styles.grid}>
              <Select
                label="Carro Elétrico"
                value={formData.carroEletrico || ''}
                onChange={(value) => updateField('carroEletrico', value as any)}
                options={[
                  { value: 'tem', label: 'Tem - precisa tomada na vaga' },
                  { value: 'planeja', label: 'Planeja comprar' },
                  { value: 'nao', label: 'Não' }
                ]}
              />
              <Select
                label="Certificação Sustentável"
                value={formData.certificacaoSustentavel || ''}
                onChange={(value) => updateField('certificacaoSustentavel', value as any)}
                options={[
                  { value: 'essencial', label: 'Essencial' },
                  { value: 'importante', label: 'Importante' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
              <Select
                label="Automação Residencial"
                value={formData.automacaoResidencial || ''}
                onChange={(value) => updateField('automacaoResidencial', value as any)}
                options={[
                  { value: 'tem_quer_expandir', label: 'Já tem e quer expandir' },
                  { value: 'quer_implementar', label: 'Quer implementar' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
              <Select
                label="Energia Solar"
                value={formData.energiaSolar || ''}
                onChange={(value) => updateField('energiaSolar', value as any)}
                options={[
                  { value: 'essencial', label: 'Essencial' },
                  { value: 'desejavel', label: 'Desejável' },
                  { value: 'indiferente', label: 'Indiferente' }
                ]}
              />
            </div>
          </div>
        )}

        {activeTab === 'comportamento' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Timeline</h3>
            <div className={styles.grid}>
              <Select
                label="Prazo Ideal para Mudança"
                value={formData.prazoMudanca || ''}
                onChange={(value) => updateField('prazoMudanca', value as any)}
                options={[
                  { value: 'imediato', label: 'Imediato (até 30 dias)' },
                  { value: '1_3_meses', label: '1-3 meses' },
                  { value: '3_6_meses', label: '3-6 meses' },
                  { value: '6_12_meses', label: '6-12 meses' },
                  { value: 'flexivel', label: 'Flexível' }
                ]}
              />
              <Select
                label="Processo de Venda do Imóvel Atual"
                value={formData.processoVenda || ''}
                onChange={(value) => updateField('processoVenda', value as any)}
                options={[
                  { value: 'vendeu', label: 'Já vendeu' },
                  { value: 'anunciado', label: 'Anunciado' },
                  { value: 'vai_anunciar', label: 'Vai anunciar' },
                  { value: 'nao_tem', label: 'Não tem imóvel' }
                ]}
              />
              <Select
                label="Motivo da Busca"
                value={formData.motivoBusca || ''}
                onChange={(value) => updateField('motivoBusca', value as any)}
                options={[
                  { value: 'upgrade', label: 'Upgrade' },
                  { value: 'mudanca_cidade', label: 'Mudança de cidade' },
                  { value: 'casamento', label: 'Casamento' },
                  { value: 'nascimento', label: 'Nascimento de filho' },
                  { value: 'investimento', label: 'Investimento' },
                  { value: 'aposentadoria', label: 'Aposentadoria' },
                  { value: 'separacao', label: 'Separação' },
                  { value: 'outro', label: 'Outro' }
                ]}
              />
              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.propostaFeita}
                    onChange={(e) => updateField('propostaFeita', e.target.checked)}
                  />
                  <span>Já tem proposta feita em algum imóvel</span>
                </label>
              </div>
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Comportamento de Compra
            </h3>
            <div className={styles.grid}>
              <Select
                label="Quantos Imóveis Já Visitou"
                value={formData.imoveisVisitados || ''}
                onChange={(value) => updateField('imoveisVisitados', value as any)}
                options={[
                  { value: '0', label: 'Nenhum' },
                  { value: '1_3', label: '1-3' },
                  { value: '4_7', label: '4-7' },
                  { value: '8_15', label: '8-15' },
                  { value: 'mais_15', label: 'Mais de 15' }
                ]}
              />
              <Select
                label="Há Quanto Tempo Está Procurando"
                value={formData.tempoProcurando || ''}
                onChange={(value) => updateField('tempoProcurando', value as any)}
                options={[
                  { value: 'menos_1mes', label: 'Menos de 1 mês' },
                  { value: '1_3_meses', label: '1-3 meses' },
                  { value: '3_6_meses', label: '3-6 meses' },
                  { value: '6_12_meses', label: '6-12 meses' },
                  { value: 'mais_1ano', label: 'Mais de 1 ano' }
                ]}
              />
              <Select
                label="Principal Problema dos Imóveis Visitados"
                value={formData.principalProblema || ''}
                onChange={(value) => updateField('principalProblema', value as any)}
                options={[
                  { value: 'localizacao', label: 'Localização' },
                  { value: 'preco', label: 'Preço' },
                  { value: 'tamanho', label: 'Tamanho' },
                  { value: 'acabamento', label: 'Acabamento' },
                  { value: 'nenhum', label: 'Nenhum - ainda não visitou' }
                ]}
              />
              <Select
                label="Nível de Pesquisa"
                value={formData.nivelPesquisa || ''}
                onChange={(value) => updateField('nivelPesquisa', value as any)}
                options={[
                  { value: 'sabe_exatamente', label: 'Sabe exatamente o que quer' },
                  { value: 'ideia_geral', label: 'Tem ideia geral' },
                  { value: 'explorando', label: 'Está explorando opções' }
                ]}
              />
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Envolve na Decisão
            </h3>
            <div className={styles.checkboxGrid}>
              {['conjuge', 'filhos', 'pais', 'socio', 'sozinho'].map((pessoa) => (
                <label key={pessoa} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.envolveDecisao?.includes(pessoa as any)}
                    onChange={(e) => {
                      const current = formData.envolveDecisao || []
                      updateField(
                        'envolveDecisao',
                        e.target.checked
                          ? [...current, pessoa as any]
                          : current.filter((p) => p !== pessoa)
                      )
                    }}
                  />
                  <span>
                    {pessoa === 'conjuge' ? 'Cônjuge' :
                     pessoa === 'socio' ? 'Sócio' :
                     pessoa.charAt(0).toUpperCase() + pessoa.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lifestyle' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Estilo de Vida</h3>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.trabalhaHome}
                  onChange={(e) => updateField('trabalhaHome', e.target.checked)}
                />
                <span>Trabalha home office</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.praticaEsportes}
                  onChange={(e) => updateField('praticaEsportes', e.target.checked)}
                />
                <span>Pratica esportes</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.gostaCozinhar}
                  onChange={(e) => updateField('gostaCozinhar', e.target.checked)}
                />
                <span>Gosta de cozinhar</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.recebeMuito}
                  onChange={(e) => updateField('recebeMuito', e.target.checked)}
                />
                <span>Recebe muitas visitas</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.viajaFrequente}
                  onChange={(e) => updateField('viajaFrequente', e.target.checked)}
                />
                <span>Viaja frequentemente</span>
              </label>
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '32px' }}>
              Observações
            </h3>
            <textarea
              className={styles.textarea}
              value={formData.observacoes || ''}
              onChange={(e) => updateField('observacoes', e.target.value)}
              placeholder="Adicione observações sobre o cliente..."
              rows={6}
            />
          </div>
        )}
      </div>

      <div className={styles.formActions}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Cliente</Button>
      </div>
    </form>
  )
}
