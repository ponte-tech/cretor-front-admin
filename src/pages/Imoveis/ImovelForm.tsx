import { useState, FormEvent } from 'react'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import { Imovel } from '../../types/imovel'
import styles from './ImovelForm.module.css'

interface ImovelFormProps {
  initialData?: Imovel
  onSave: (data: Partial<Imovel>) => void
  onCancel: () => void
}

export default function ImovelForm({ initialData, onSave, onCancel }: ImovelFormProps) {
  const [formData, setFormData] = useState<Partial<Imovel>>(
    initialData || {
      tipoNegocio: 'venda',
      status: 'disponivel',
      tipoImovel: 'apartamento',
      finalidade: 'residencial',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      area: 0,
      quartos: 0,
      suites: 0,
      banheiros: 0,
      vagas: 0,
      valorVenda: 0,
      iptu: 0,
      descricao: '',
      caracteristicas: [],
      mobiliado: false,
      aceitaPermuta: false,
      fotoDestaque: '',
      fotos: [],
      proprietario: '',
      corretorResponsavel: '',
      // Inicializar objetos complexos
      comodos: {
        escritorio: false,
        closet: false,
        lavabo: false,
        despensa: false,
        dependenciaEmpregada: 'nao_tem',
        areaServico: 'separada',
        cozinha: 'separada',
        salasEstaTv: 'integradas',
        salaJantar: false,
        varanda: false,
        sacada: false,
        terracoPrivativo: false,
        jardimPrivativo: false,
        quintal: false
      },
      caracteristicasFisicas: {
        vista: [],
        orientacaoSolar: 'muita_luz',
        estadoConservacao: 'bom',
        tipoAcabamento: 'padrao',
        estiloArquitetura: 'moderno',
        peDireito: 'padrao',
        tipoPlanta: 'tradicional'
      },
      infraestruturaCondominio: {
        piscinaAdulto: false,
        piscinaInfantil: false,
        piscinaAquecida: false,
        piscinaCoberta: false,
        saunaUmida: false,
        saunaSeca: false,
        spa: false,
        academiaCompleta: false,
        academiaBasica: false,
        quadraPoliesportiva: false,
        quadraTenis: false,
        quadraSquash: false,
        campoFutebol: false,
        salaoFestas: false,
        churrasqueiraColetiva: false,
        espacoGourmet: false,
        restaurante: false,
        cafe: false,
        lounge: false,
        playground: false,
        brinquedoteca: false,
        miniGolfe: false,
        espacoTeen: false,
        espacoGames: false,
        salaoJogos: false,
        cinema: false,
        biblioteca: false,
        coworking: false,
        salaReuniao: false,
        espacoPet: false,
        petPlace: false,
        petWash: false,
        bicicletario: false,
        bikeSpace: false,
        lavanderia: false,
        rooftop: false,
        jardimZen: false,
        horta: false,
        pomar: false
      },
      informacoesCondominio: {
        numeroUnidades: 0,
        numeroAndares: 0,
        unidadesPorAndar: 0,
        tamanhoCondominio: 'medio',
        perfilMoradores: 'misto',
        permitePets: true
      }
    }
  )

  const [activeTab, setActiveTab] = useState<
    | 'basico'
    | 'localizacao'
    | 'caracteristicas'
    | 'comodos'
    | 'fisicas'
    | 'infraestrutura'
    | 'seguranca'
    | 'valores'
    | 'detalhes'
  >('basico')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const updateField = <K extends keyof Imovel>(field: K, value: Imovel[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateNestedField = <T extends keyof Imovel>(
    parent: T,
    field: keyof NonNullable<Imovel[T]>,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as any),
        [field]: value
      }
    }))
  }

  const toggleArrayValue = (array: string[], value: string): string[] => {
    if (array.includes(value)) {
      return array.filter((v) => v !== value)
    }
    return [...array, value]
  }

  const tabs = [
    { id: 'basico', label: 'Dados Básicos' },
    { id: 'localizacao', label: 'Localização' },
    { id: 'caracteristicas', label: 'Área e Quartos' },
    { id: 'comodos', label: 'Cômodos' },
    { id: 'fisicas', label: 'Físicas' },
    { id: 'infraestrutura', label: 'Infraestrutura' },
    { id: 'seguranca', label: 'Segurança/Tech' },
    { id: 'valores', label: 'Valores' },
    { id: 'detalhes', label: 'Detalhes' }
  ] as const

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {/* ABA 1: DADOS BÁSICOS */}
        {activeTab === 'basico' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Básicas</h3>
            <div className={styles.grid}>
              <Select
                label="Tipo de Negócio *"
                value={formData.tipoNegocio || ''}
                onChange={(value) => updateField('tipoNegocio', value as any)}
                options={[
                  { value: 'venda', label: 'Venda' },
                  { value: 'locacao', label: 'Locação' },
                  { value: 'ambos', label: 'Venda e Locação' }
                ]}
              />

              <Select
                label="Tipo de Imóvel *"
                value={formData.tipoImovel || ''}
                onChange={(value) => updateField('tipoImovel', value as any)}
                options={[
                  { value: 'apartamento', label: 'Apartamento' },
                  { value: 'casa', label: 'Casa' },
                  { value: 'terreno', label: 'Terreno' },
                  { value: 'sala_comercial', label: 'Sala Comercial' },
                  { value: 'galpao', label: 'Galpão' },
                  { value: 'cobertura', label: 'Cobertura' },
                  { value: 'studio', label: 'Studio' }
                ]}
              />

              <Select
                label="Finalidade *"
                value={formData.finalidade || ''}
                onChange={(value) => updateField('finalidade', value as any)}
                options={[
                  { value: 'residencial', label: 'Residencial' },
                  { value: 'comercial', label: 'Comercial' },
                  { value: 'industrial', label: 'Industrial' }
                ]}
              />

              <Select
                label="Status *"
                value={formData.status || ''}
                onChange={(value) => updateField('status', value as any)}
                options={[
                  { value: 'disponivel', label: 'Disponível' },
                  { value: 'vendido', label: 'Vendido' },
                  { value: 'alugado', label: 'Alugado' },
                  { value: 'negociacao', label: 'Em Negociação' },
                  { value: 'reservado', label: 'Reservado' }
                ]}
              />

              {(formData.tipoImovel === 'apartamento' || formData.tipoImovel === 'sala_comercial') && (
                <Input
                  label="Andar"
                  value={formData.andar || ''}
                  onChange={(e) => updateField('andar', e.target.value)}
                  placeholder="Ex: 5º andar, Cobertura"
                />
              )}
            </div>
          </div>
        )}

        {/* ABA 2: LOCALIZAÇÃO */}
        {activeTab === 'localizacao' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Endereço Completo</h3>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <Input
                  label="Endereço *"
                  value={formData.endereco || ''}
                  onChange={(e) => updateField('endereco', e.target.value)}
                  placeholder="Rua, Avenida..."
                  required
                />
              </div>

              <Input
                label="Número *"
                value={formData.numero || ''}
                onChange={(e) => updateField('numero', e.target.value)}
                placeholder="123"
                required
              />

              <Input
                label="Complemento"
                value={formData.complemento || ''}
                onChange={(e) => updateField('complemento', e.target.value)}
                placeholder="Apto 101, Bloco A..."
              />

              <Input
                label="Bairro *"
                value={formData.bairro || ''}
                onChange={(e) => updateField('bairro', e.target.value)}
                placeholder="Centro"
                required
              />

              <Input
                label="Cidade *"
                value={formData.cidade || ''}
                onChange={(e) => updateField('cidade', e.target.value)}
                placeholder="São Paulo"
                required
              />

              <Input
                label="Estado *"
                value={formData.estado || ''}
                onChange={(e) => updateField('estado', e.target.value)}
                placeholder="SP"
                required
              />

              <Input
                label="CEP *"
                value={formData.cep || ''}
                onChange={(e) => updateField('cep', e.target.value)}
                placeholder="12345-678"
                required
              />

              <Select
                label="Zona"
                value={formData.zona || ''}
                onChange={(value) => updateField('zona', value as any)}
                options={[
                  { value: 'norte', label: 'Norte' },
                  { value: 'sul', label: 'Sul' },
                  { value: 'leste', label: 'Leste' },
                  { value: 'oeste', label: 'Oeste' },
                  { value: 'centro', label: 'Centro' }
                ]}
              />
            </div>
          </div>
        )}

        {/* ABA 3: ÁREA E QUARTOS */}
        {activeTab === 'caracteristicas' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Metragem e Distribuição</h3>
            <div className={styles.grid}>
              <Input
                label="Área Total (m²) *"
                type="number"
                value={formData.area || ''}
                onChange={(e) => updateField('area', Number(e.target.value))}
                placeholder="120"
                required
              />

              {(formData.tipoImovel === 'casa' || formData.tipoImovel === 'terreno') && (
                <Input
                  label="Área do Terreno (m²)"
                  type="number"
                  value={formData.areaTerreno || ''}
                  onChange={(e) => updateField('areaTerreno', Number(e.target.value))}
                  placeholder="250"
                />
              )}

              <Input
                label="Quartos *"
                type="number"
                value={formData.quartos || 0}
                onChange={(e) => updateField('quartos', Number(e.target.value))}
                min="0"
                required
              />

              <Input
                label="Suítes *"
                type="number"
                value={formData.suites || 0}
                onChange={(e) => updateField('suites', Number(e.target.value))}
                min="0"
                required
              />

              <Input
                label="Banheiros *"
                type="number"
                value={formData.banheiros || 0}
                onChange={(e) => updateField('banheiros', Number(e.target.value))}
                min="0"
                required
              />

              <Input
                label="Vagas de Garagem *"
                type="number"
                value={formData.vagas || 0}
                onChange={(e) => updateField('vagas', Number(e.target.value))}
                min="0"
                required
              />

              <Input
                label="Ano de Construção"
                type="number"
                value={formData.anosConstrucao || ''}
                onChange={(e) => updateField('anosConstrucao', Number(e.target.value))}
                placeholder="2020"
              />

              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.mobiliado || false}
                    onChange={(e) => updateField('mobiliado', e.target.checked)}
                  />
                  <span>Mobiliado</span>
                </label>

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.aceitaPermuta || false}
                    onChange={(e) => updateField('aceitaPermuta', e.target.checked)}
                  />
                  <span>Aceita Permuta</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ABA 4: CÔMODOS */}
        {activeTab === 'comodos' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Cômodos e Espaços</h3>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.escritorio || false}
                  onChange={(e) => updateNestedField('comodos', 'escritorio', e.target.checked)}
                />
                <span>Escritório</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.closet || false}
                  onChange={(e) => updateNestedField('comodos', 'closet', e.target.checked)}
                />
                <span>Closet</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.lavabo || false}
                  onChange={(e) => updateNestedField('comodos', 'lavabo', e.target.checked)}
                />
                <span>Lavabo</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.despensa || false}
                  onChange={(e) => updateNestedField('comodos', 'despensa', e.target.checked)}
                />
                <span>Despensa</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.salaJantar || false}
                  onChange={(e) => updateNestedField('comodos', 'salaJantar', e.target.checked)}
                />
                <span>Sala de Jantar</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.varanda || false}
                  onChange={(e) => updateNestedField('comodos', 'varanda', e.target.checked)}
                />
                <span>Varanda</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.sacada || false}
                  onChange={(e) => updateNestedField('comodos', 'sacada', e.target.checked)}
                />
                <span>Sacada</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.terracoPrivativo || false}
                  onChange={(e) => updateNestedField('comodos', 'terracoPrivativo', e.target.checked)}
                />
                <span>Terraço Privativo</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.jardimPrivativo || false}
                  onChange={(e) => updateNestedField('comodos', 'jardimPrivativo', e.target.checked)}
                />
                <span>Jardim Privativo</span>
              </label>

              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.comodos?.quintal || false}
                  onChange={(e) => updateNestedField('comodos', 'quintal', e.target.checked)}
                />
                <span>Quintal</span>
              </label>
            </div>

            <div className={styles.grid} style={{ marginTop: '24px' }}>
              <Select
                label="Dependência de Empregada"
                value={formData.comodos?.dependenciaEmpregada || 'nao_tem'}
                onChange={(value) => updateNestedField('comodos', 'dependenciaEmpregada', value)}
                options={[
                  { value: 'nao_tem', label: 'Não tem' },
                  { value: 'sem_banheiro', label: 'Sem Banheiro' },
                  { value: 'com_banheiro', label: 'Com Banheiro' }
                ]}
              />

              <Select
                label="Tipo de Cozinha"
                value={formData.comodos?.cozinha || 'separada'}
                onChange={(value) => updateNestedField('comodos', 'cozinha', value)}
                options={[
                  { value: 'separada', label: 'Separada' },
                  { value: 'americana', label: 'Americana' },
                  { value: 'gourmet', label: 'Gourmet' },
                  { value: 'planejada', label: 'Planejada' }
                ]}
              />

              <Select
                label="Área de Serviço"
                value={formData.comodos?.areaServico || 'separada'}
                onChange={(value) => updateNestedField('comodos', 'areaServico', value)}
                options={[
                  { value: 'separada', label: 'Separada' },
                  { value: 'integrada', label: 'Integrada' },
                  { value: 'coberta', label: 'Coberta' },
                  { value: 'descoberta', label: 'Descoberta' }
                ]}
              />

              <Select
                label="Salas de Estar e TV"
                value={formData.comodos?.salasEstaTv || 'integradas'}
                onChange={(value) => updateNestedField('comodos', 'salasEstaTv', value)}
                options={[
                  { value: 'integradas', label: 'Integradas' },
                  { value: 'separadas', label: 'Separadas' }
                ]}
              />
            </div>
          </div>
        )}

        {/* ABA 5: CARACTERÍSTICAS FÍSICAS */}
        {activeTab === 'fisicas' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Características Físicas e Acabamento</h3>
            <div className={styles.grid}>
              <Select
                label="Tipo de Acabamento"
                value={formData.caracteristicasFisicas?.tipoAcabamento || 'padrao'}
                onChange={(value) => updateNestedField('caracteristicasFisicas', 'tipoAcabamento', value)}
                options={[
                  { value: 'padrao', label: 'Padrão' },
                  { value: 'alto_padrao', label: 'Alto Padrão' },
                  { value: 'luxo', label: 'Luxo' },
                  { value: 'ultra_luxo', label: 'Ultra Luxo' }
                ]}
              />

              <Select
                label="Estado de Conservação"
                value={formData.caracteristicasFisicas?.estadoConservacao || 'bom'}
                onChange={(value) => updateNestedField('caracteristicasFisicas', 'estadoConservacao', value)}
                options={[
                  { value: 'novo', label: 'Novo (0-2 anos)' },
                  { value: 'seminovo', label: 'Seminovo (2-5 anos)' },
                  { value: 'bom', label: 'Bom Estado' },
                  { value: 'precisa_reforma', label: 'Precisa Reforma' },
                  { value: 'reformado', label: 'Recém Reformado' }
                ]}
              />

              <Select
                label="Orientação Solar"
                value={formData.caracteristicasFisicas?.orientacaoSolar || 'muita_luz'}
                onChange={(value) => updateNestedField('caracteristicasFisicas', 'orientacaoSolar', value)}
                options={[
                  { value: 'sol_manha', label: 'Sol da Manhã' },
                  { value: 'sol_tarde', label: 'Sol da Tarde' },
                  { value: 'muita_luz', label: 'Muita Luz Natural' },
                  { value: 'meia_luz', label: 'Meia Luz' }
                ]}
              />

              <Select
                label="Pé Direito"
                value={formData.caracteristicasFisicas?.peDireito || 'padrao'}
                onChange={(value) => updateNestedField('caracteristicasFisicas', 'peDireito', value)}
                options={[
                  { value: 'padrao', label: 'Padrão' },
                  { value: 'alto', label: 'Alto' },
                  { value: 'duplo', label: 'Duplo' }
                ]}
              />

              <Select
                label="Estilo Arquitetônico"
                value={formData.caracteristicasFisicas?.estiloArquitetura || 'moderno'}
                onChange={(value) => updateNestedField('caracteristicasFisicas', 'estiloArquitetura', value)}
                options={[
                  { value: 'moderno', label: 'Moderno' },
                  { value: 'classico', label: 'Clássico' },
                  { value: 'contemporaneo', label: 'Contemporâneo' },
                  { value: 'minimalista', label: 'Minimalista' },
                  { value: 'industrial', label: 'Industrial' },
                  { value: 'colonial', label: 'Colonial' }
                ]}
              />

              <Select
                label="Tipo de Planta"
                value={formData.caracteristicasFisicas?.tipoPlanta || 'tradicional'}
                onChange={(value) => updateNestedField('caracteristicasFisicas', 'tipoPlanta', value)}
                options={[
                  { value: 'aberta', label: 'Planta Aberta' },
                  { value: 'tradicional', label: 'Tradicional' },
                  { value: 'semi_integrada', label: 'Semi-Integrada' }
                ]}
              />
            </div>
          </div>
        )}

        {/* ABA 6: INFRAESTRUTURA DO CONDOMÍNIO */}
        {activeTab === 'infraestrutura' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Infraestrutura e Áreas de Lazer</h3>

            <h4 className={styles.subsectionTitle}>Lazer Aquático</h4>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.piscinaAdulto || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'piscinaAdulto', e.target.checked)}
                />
                <span>Piscina Adulto</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.piscinaInfantil || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'piscinaInfantil', e.target.checked)}
                />
                <span>Piscina Infantil</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.piscinaAquecida || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'piscinaAquecida', e.target.checked)}
                />
                <span>Piscina Aquecida</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.saunaUmida || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'saunaUmida', e.target.checked)}
                />
                <span>Sauna</span>
              </label>
            </div>

            <h4 className={styles.subsectionTitle}>Fitness e Esportes</h4>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.academiaCompleta || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'academiaCompleta', e.target.checked)}
                />
                <span>Academia Completa</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.quadraPoliesportiva || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'quadraPoliesportiva', e.target.checked)}
                />
                <span>Quadra Poliesportiva</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.quadraTenis || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'quadraTenis', e.target.checked)}
                />
                <span>Quadra de Tênis</span>
              </label>
            </div>

            <h4 className={styles.subsectionTitle}>Social e Eventos</h4>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.salaoFestas || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'salaoFestas', e.target.checked)}
                />
                <span>Salão de Festas</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.churrasqueiraColetiva || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'churrasqueiraColetiva', e.target.checked)}
                />
                <span>Churrasqueira</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.espacoGourmet || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'espacoGourmet', e.target.checked)}
                />
                <span>Espaço Gourmet</span>
              </label>
            </div>

            <h4 className={styles.subsectionTitle}>Infantil</h4>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.playground || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'playground', e.target.checked)}
                />
                <span>Playground</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.brinquedoteca || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'brinquedoteca', e.target.checked)}
                />
                <span>Brinquedoteca</span>
              </label>
            </div>

            <h4 className={styles.subsectionTitle}>Trabalho e Pet</h4>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.coworking || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'coworking', e.target.checked)}
                />
                <span>Coworking</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.espacoPet || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'espacoPet', e.target.checked)}
                />
                <span>Espaço Pet</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.infraestruturaCondominio?.petWash || false}
                  onChange={(e) => updateNestedField('infraestruturaCondominio', 'petWash', e.target.checked)}
                />
                <span>Pet Wash</span>
              </label>
            </div>

            <h4 className={styles.subsectionTitle}>Info do Condomínio</h4>
            <div className={styles.grid}>
              <Input
                label="Número de Unidades"
                type="number"
                value={formData.informacoesCondominio?.numeroUnidades || 0}
                onChange={(e) => updateNestedField('informacoesCondominio', 'numeroUnidades', Number(e.target.value))}
              />
              <Input
                label="Número de Andares"
                type="number"
                value={formData.informacoesCondominio?.numeroAndares || 0}
                onChange={(e) => updateNestedField('informacoesCondominio', 'numeroAndares', Number(e.target.value))}
              />
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.informacoesCondominio?.permitePets || false}
                  onChange={(e) => updateNestedField('informacoesCondominio', 'permitePets', e.target.checked)}
                />
                <span>Permite Pets</span>
              </label>
            </div>
          </div>
        )}

        {/* ABA 7: SEGURANÇA E TECNOLOGIA */}
        {activeTab === 'seguranca' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Segurança e Tecnologia</h3>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkbox}>
                <input type="checkbox" disabled />
                <span>Portaria 24h</span>
              </label>
              <label className={styles.checkbox}>
                <input type="checkbox" disabled />
                <span>Circuito de Câmeras</span>
              </label>
              <label className={styles.checkbox}>
                <input type="checkbox" disabled />
                <span>Cerca Elétrica</span>
              </label>
              <label className={styles.checkbox}>
                <input type="checkbox" disabled />
                <span>Controle de Acesso</span>
              </label>
              <label className={styles.checkbox}>
                <input type="checkbox" disabled />
                <span>Internet Fibra</span>
              </label>
              <label className={styles.checkbox}>
                <input type="checkbox" disabled />
                <span>Automação Residencial</span>
              </label>
            </div>
            <p style={{ color: '#B8A898', fontSize: '14px', marginTop: '16px' }}>
              💡 Seção simplificada - para cadastro completo use campos avançados
            </p>
          </div>
        )}

        {/* ABA 8: VALORES */}
        {activeTab === 'valores' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Valores e Custos</h3>
            <div className={styles.grid}>
              {(formData.tipoNegocio === 'venda' || formData.tipoNegocio === 'ambos') && (
                <Input
                  label="Valor de Venda (R$)"
                  type="number"
                  value={formData.valorVenda || ''}
                  onChange={(e) => updateField('valorVenda', Number(e.target.value))}
                  placeholder="850000"
                />
              )}

              {(formData.tipoNegocio === 'locacao' || formData.tipoNegocio === 'ambos') && (
                <Input
                  label="Valor de Locação (R$/mês)"
                  type="number"
                  value={formData.valorLocacao || ''}
                  onChange={(e) => updateField('valorLocacao', Number(e.target.value))}
                  placeholder="3500"
                />
              )}

              <Input
                label="Condomínio (R$/mês)"
                type="number"
                value={formData.valorCondominio || ''}
                onChange={(e) => updateField('valorCondominio', Number(e.target.value))}
                placeholder="650"
              />

              <Input
                label="IPTU (R$/ano) *"
                type="number"
                value={formData.iptu || ''}
                onChange={(e) => updateField('iptu', Number(e.target.value))}
                placeholder="2400"
                required
              />
            </div>
          </div>
        )}

        {/* ABA 9: DETALHES */}
        {activeTab === 'detalhes' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Adicionais</h3>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Descrição *</label>
                <textarea
                  className={styles.textarea}
                  value={formData.descricao || ''}
                  onChange={(e) => updateField('descricao', e.target.value)}
                  placeholder="Descreva o imóvel, seus diferenciais e vantagens..."
                  rows={4}
                  required
                />
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Características (separadas por vírgula)</label>
                <Input
                  value={formData.caracteristicas?.join(', ') || ''}
                  onChange={(e) =>
                    updateField(
                      'caracteristicas',
                      e.target.value.split(',').map((item) => item.trim()).filter(Boolean)
                    )
                  }
                  placeholder="piscina, churrasqueira, varanda, sacada..."
                />
              </div>

              <Input
                label="URL Foto Destaque"
                value={formData.fotoDestaque || ''}
                onChange={(e) => updateField('fotoDestaque', e.target.value)}
                placeholder="https://..."
              />

              <Input
                label="Proprietário *"
                value={formData.proprietario || ''}
                onChange={(e) => updateField('proprietario', e.target.value)}
                placeholder="Nome do proprietário"
                required
              />

              <Input
                label="Corretor Responsável *"
                value={formData.corretorResponsavel || ''}
                onChange={(e) => updateField('corretorResponsavel', e.target.value)}
                placeholder="Nome do corretor"
                required
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{initialData ? 'Salvar Alterações' : 'Cadastrar Imóvel'}</Button>
      </div>
    </form>
  )
}
