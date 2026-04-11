import { useState, FormEvent } from 'react'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import { Projeto } from '../../types/projeto'
import styles from './ProjetoForm.module.css'

interface ProjetoFormProps {
  initialData?: Projeto
  onSave: (data: Partial<Projeto>) => void
  onCancel: () => void
}

export default function ProjetoForm({ initialData, onSave, onCancel }: ProjetoFormProps) {
  const [formData, setFormData] = useState<Partial<Projeto>>(
    initialData || {
      nome: '',
      construtora: '',
      status: 'lancamento',
      tipoEmpreendimento: 'residencial',
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      totalUnidades: 0,
      unidadesDisponiveis: 0,
      tiposUnidades: [],
      areaPrivativaMin: 0,
      areaPrivativaMax: 0,
      vagasMin: 0,
      vagasMax: 0,
      precoMin: 0,
      precoMax: 0,
      entradaMinima: 0,
      aceitaFinanciamento: true,
      dataLancamento: '',
      previsaoEntrega: '',
      faseObra: 'fundacao',
      percentualConcluido: 0,
      areasLazer: [],
      seguranca: [],
      sustentabilidade: [],
      descricao: '',
      diferenciais: [],
      fotoDestaque: '',
      fotos: [],
      plantas: [],
      corretorResponsavel: '',
      vendedores: []
    }
  )

  const [activeTab, setActiveTab] = useState<
    'basico' | 'localizacao' | 'unidades' | 'valores' | 'prazos' | 'infraestrutura' | 'detalhes'
  >('basico')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const updateField = <K extends keyof Projeto>(field: K, value: Projeto[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const tabs = [
    { id: 'basico', label: 'Dados Básicos' },
    { id: 'localizacao', label: 'Localização' },
    { id: 'unidades', label: 'Unidades' },
    { id: 'valores', label: 'Valores' },
    { id: 'prazos', label: 'Prazos' },
    { id: 'infraestrutura', label: 'Infraestrutura' },
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
        {activeTab === 'basico' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Básicas</h3>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <Input
                  label="Nome do Projeto"
                  value={formData.nome || ''}
                  onChange={(e) => updateField('nome', e.target.value)}
                  placeholder="Residencial Parque das Flores"
                  required
                />
              </div>

              <Input
                label="Construtora"
                value={formData.construtora || ''}
                onChange={(e) => updateField('construtora', e.target.value)}
                placeholder="Construtora Horizonte"
                required
              />

              <Select
                label="Tipo de Empreendimento"
                value={formData.tipoEmpreendimento || ''}
                onChange={(value) => updateField('tipoEmpreendimento', value as any)}
                options={[
                  { value: 'residencial', label: 'Residencial' },
                  { value: 'comercial', label: 'Comercial' },
                  { value: 'misto', label: 'Misto' }
                ]}
              />

              <Select
                label="Status"
                value={formData.status || ''}
                onChange={(value) => updateField('status', value as any)}
                options={[
                  { value: 'lancamento', label: 'Lançamento' },
                  { value: 'em_construcao', label: 'Em Construção' },
                  { value: 'pronto', label: 'Pronto' },
                  { value: 'entregue', label: 'Entregue' }
                ]}
              />

              <Input
                label="URL Foto Destaque"
                value={formData.fotoDestaque || ''}
                onChange={(e) => updateField('fotoDestaque', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        )}

        {activeTab === 'localizacao' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Endereço</h3>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <Input
                  label="Endereço"
                  value={formData.endereco || ''}
                  onChange={(e) => updateField('endereco', e.target.value)}
                  placeholder="Av. das Américas, 5000"
                  required
                />
              </div>

              <Input
                label="Bairro"
                value={formData.bairro || ''}
                onChange={(e) => updateField('bairro', e.target.value)}
                placeholder="Barra da Tijuca"
                required
              />

              <Input
                label="Cidade"
                value={formData.cidade || ''}
                onChange={(e) => updateField('cidade', e.target.value)}
                placeholder="Rio de Janeiro"
                required
              />

              <Input
                label="Estado"
                value={formData.estado || ''}
                onChange={(e) => updateField('estado', e.target.value)}
                placeholder="RJ"
                required
              />

              <Input
                label="CEP"
                value={formData.cep || ''}
                onChange={(e) => updateField('cep', e.target.value)}
                placeholder="22640-102"
                required
              />
            </div>
          </div>
        )}

        {activeTab === 'unidades' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações das Unidades</h3>
            <div className={styles.grid}>
              <Input
                label="Total de Unidades"
                type="number"
                value={formData.totalUnidades || ''}
                onChange={(e) => updateField('totalUnidades', Number(e.target.value))}
                placeholder="240"
                required
              />

              <Input
                label="Unidades Disponíveis"
                type="number"
                value={formData.unidadesDisponiveis || ''}
                onChange={(e) => updateField('unidadesDisponiveis', Number(e.target.value))}
                placeholder="87"
                required
              />

              <Input
                label="Área Privativa Mínima (m²)"
                type="number"
                value={formData.areaPrivativaMin || ''}
                onChange={(e) => updateField('areaPrivativaMin', Number(e.target.value))}
                placeholder="68"
                required
              />

              <Input
                label="Área Privativa Máxima (m²)"
                type="number"
                value={formData.areaPrivativaMax || ''}
                onChange={(e) => updateField('areaPrivativaMax', Number(e.target.value))}
                placeholder="185"
                required
              />

              <Input
                label="Vagas Mínimas"
                type="number"
                value={formData.vagasMin || ''}
                onChange={(e) => updateField('vagasMin', Number(e.target.value))}
                placeholder="1"
              />

              <Input
                label="Vagas Máximas"
                type="number"
                value={formData.vagasMax || ''}
                onChange={(e) => updateField('vagasMax', Number(e.target.value))}
                placeholder="3"
              />
            </div>
          </div>
        )}

        {activeTab === 'valores' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Valores</h3>
            <div className={styles.grid}>
              <Input
                label="Preço Mínimo (R$)"
                type="number"
                value={formData.precoMin || ''}
                onChange={(e) => updateField('precoMin', Number(e.target.value))}
                placeholder="580000"
                required
              />

              <Input
                label="Preço Máximo (R$)"
                type="number"
                value={formData.precoMax || ''}
                onChange={(e) => updateField('precoMax', Number(e.target.value))}
                placeholder="1850000"
                required
              />

              <Input
                label="Entrada Mínima (R$)"
                type="number"
                value={formData.entradaMinima || ''}
                onChange={(e) => updateField('entradaMinima', Number(e.target.value))}
                placeholder="58000"
              />

              <div className={styles.checkboxGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.aceitaFinanciamento || false}
                    onChange={(e) => updateField('aceitaFinanciamento', e.target.checked)}
                  />
                  <span>Aceita Financiamento</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prazos' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Datas e Obra</h3>
            <div className={styles.grid}>
              <Input
                label="Data de Lançamento"
                type="date"
                value={formData.dataLancamento || ''}
                onChange={(e) => updateField('dataLancamento', e.target.value)}
                required
              />

              <Input
                label="Previsão de Entrega"
                type="date"
                value={formData.previsaoEntrega || ''}
                onChange={(e) => updateField('previsaoEntrega', e.target.value)}
                required
              />

              <Select
                label="Fase da Obra"
                value={formData.faseObra || ''}
                onChange={(value) => updateField('faseObra', value as any)}
                options={[
                  { value: 'fundacao', label: 'Fundação' },
                  { value: 'estrutura', label: 'Estrutura' },
                  { value: 'acabamento', label: 'Acabamento' },
                  { value: 'pronto', label: 'Pronto' }
                ]}
              />

              <Input
                label="Percentual Concluído (%)"
                type="number"
                min="0"
                max="100"
                value={formData.percentualConcluido || 0}
                onChange={(e) => updateField('percentualConcluido', Number(e.target.value))}
                placeholder="45"
              />
            </div>
          </div>
        )}

        {activeTab === 'infraestrutura' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Infraestrutura e Segurança</h3>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Áreas de Lazer (separadas por vírgula)</label>
                <Input
                  value={formData.areasLazer?.join(', ') || ''}
                  onChange={(e) =>
                    updateField(
                      'areasLazer',
                      e.target.value.split(',').map((item) => item.trim())
                    )
                  }
                  placeholder="Piscina, Academia, Salão de festas..."
                />
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Segurança (separadas por vírgula)</label>
                <Input
                  value={formData.seguranca?.join(', ') || ''}
                  onChange={(e) =>
                    updateField(
                      'seguranca',
                      e.target.value.split(',').map((item) => item.trim())
                    )
                  }
                  placeholder="Portaria 24h, Câmeras, Cerca elétrica..."
                />
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Sustentabilidade (separadas por vírgula)</label>
                <Input
                  value={formData.sustentabilidade?.join(', ') || ''}
                  onChange={(e) =>
                    updateField(
                      'sustentabilidade',
                      e.target.value.split(',').map((item) => item.trim())
                    )
                  }
                  placeholder="Energia solar, Coleta seletiva, Reuso de água..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detalhes' && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Adicionais</h3>
            <div className={styles.grid}>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Descrição</label>
                <textarea
                  className={styles.textarea}
                  value={formData.descricao || ''}
                  onChange={(e) => updateField('descricao', e.target.value)}
                  placeholder="Descreva o projeto, seus diferenciais e vantagens..."
                  rows={4}
                />
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Diferenciais (separados por vírgula)</label>
                <Input
                  value={formData.diferenciais?.join(', ') || ''}
                  onChange={(e) =>
                    updateField(
                      'diferenciais',
                      e.target.value.split(',').map((item) => item.trim())
                    )
                  }
                  placeholder="Vista para o mar, Acabamento premium..."
                />
              </div>

              <Input
                label="Corretor Responsável"
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
        <Button type="submit">
          {initialData ? 'Salvar Alterações' : 'Cadastrar Projeto'}
        </Button>
      </div>
    </form>
  )
}
