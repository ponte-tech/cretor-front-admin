import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import styles from './AutoAtendimentoPage.module.css'

type Step = 1 | 2 | 3 | 4 | 5

export default function AutoAtendimentoPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    // Passo 1: Dados Pessoais
    nome: '',
    email: '',
    telefone: '',

    // Passo 2: Composição Familiar
    temFilhos: false,
    numeroFilhos: '',
    temPets: false,
    tipoPets: '',

    // Passo 3: Preferências de Imóvel
    tipoImovel: [] as string[],
    finalidade: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    caracteristicas: [] as string[],

    // Passo 4: Localização
    bairrosPreferidos: '',
    cidadesPreferidas: '',
    pontosInteresse: {
      escolas: false,
      hospitais: false,
      shoppings: false,
      parques: false,
      transporte: false
    },

    // Passo 5: Orçamento e Urgência
    orcamentoMin: '',
    orcamentoMax: '',
    urgencia: '',
    observacoes: ''
  })

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Redirect to success page
    navigate('/cadastro/sucesso')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Vamos começar com suas informações</h2>
            <p className={styles.stepDescription}>
              Nos conte um pouco sobre você para que possamos encontrar o imóvel perfeito
            </p>

            <div className={styles.formGrid}>
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
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Sobre sua família</h2>
            <p className={styles.stepDescription}>
              Essas informações nos ajudam a encontrar um imóvel que atenda suas necessidades
            </p>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.temFilhos}
                  onChange={(e) => updateField('temFilhos', e.target.checked)}
                />
                <span>Tenho filhos</span>
              </label>
            </div>

            {formData.temFilhos && (
              <Input
                label="Quantos filhos?"
                type="number"
                value={formData.numeroFilhos}
                onChange={(e) => updateField('numeroFilhos', e.target.value)}
              />
            )}

            <div className={styles.checkboxGroup} style={{ marginTop: '24px' }}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.temPets}
                  onChange={(e) => updateField('temPets', e.target.checked)}
                />
                <span>Tenho pets</span>
              </label>
            </div>

            {formData.temPets && (
              <Input
                label="Quais pets?"
                value={formData.tipoPets}
                onChange={(e) => updateField('tipoPets', e.target.value)}
                placeholder="Ex: 1 cachorro, 2 gatos"
              />
            )}
          </div>
        )

      case 3:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Que tipo de imóvel você procura?</h2>
            <p className={styles.stepDescription}>
              Selecione as opções que mais se encaixam no que você deseja
            </p>

            <div className={styles.checkboxGrid}>
              {['Apartamento', 'Casa', 'Cobertura', 'Terreno'].map((tipo) => (
                <label key={tipo} className={styles.checkboxCard}>
                  <input
                    type="checkbox"
                    checked={formData.tipoImovel.includes(tipo.toLowerCase())}
                    onChange={(e) => {
                      const tipoLower = tipo.toLowerCase()
                      updateField(
                        'tipoImovel',
                        e.target.checked
                          ? [...formData.tipoImovel, tipoLower]
                          : formData.tipoImovel.filter((t) => t !== tipoLower)
                      )
                    }}
                  />
                  <span>{tipo}</span>
                </label>
              ))}
            </div>

            <div className={styles.formGrid} style={{ marginTop: '32px' }}>
              <Select
                label="Finalidade"
                value={formData.finalidade}
                onChange={(value) => updateField('finalidade', value)}
                options={[
                  { value: 'morar', label: 'Morar' },
                  { value: 'investir', label: 'Investir' },
                  { value: 'alugar', label: 'Alugar' }
                ]}
              />
              <Input
                label="Quartos"
                type="number"
                min="1"
                value={formData.quartos}
                onChange={(e) => updateField('quartos', e.target.value)}
              />
              <Input
                label="Banheiros"
                type="number"
                min="1"
                value={formData.banheiros}
                onChange={(e) => updateField('banheiros', e.target.value)}
              />
              <Input
                label="Vagas de Garagem"
                type="number"
                min="0"
                value={formData.vagas}
                onChange={(e) => updateField('vagas', e.target.value)}
              />
            </div>

            <h3 className={styles.subsectionTitle}>Características Desejadas</h3>
            <div className={styles.checkboxGrid}>
              {['Piscina', 'Churrasqueira', 'Varanda', 'Jardim', 'Área Gourmet', 'Home Office'].map((carac) => (
                <label key={carac} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.caracteristicas.includes(carac.toLowerCase())}
                    onChange={(e) => {
                      const caracLower = carac.toLowerCase()
                      updateField(
                        'caracteristicas',
                        e.target.checked
                          ? [...formData.caracteristicas, caracLower]
                          : formData.caracteristicas.filter((c) => c !== caracLower)
                      )
                    }}
                  />
                  <span>{carac}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Onde você gostaria de morar?</h2>
            <p className={styles.stepDescription}>
              Nos conte sobre os bairros e regiões de interesse
            </p>

            <div className={styles.formGrid}>
              <Input
                label="Cidades Preferidas"
                value={formData.cidadesPreferidas}
                onChange={(e) => updateField('cidadesPreferidas', e.target.value)}
                placeholder="Ex: São Paulo, Campinas"
              />
              <Input
                label="Bairros Preferidos"
                value={formData.bairrosPreferidos}
                onChange={(e) => updateField('bairrosPreferidos', e.target.value)}
                placeholder="Ex: Jardins, Vila Olímpia"
              />
            </div>

            <h3 className={styles.subsectionTitle}>O que é importante ter por perto?</h3>
            <div className={styles.checkboxGrid}>
              {[
                { key: 'escolas', label: 'Escolas' },
                { key: 'hospitais', label: 'Hospitais' },
                { key: 'shoppings', label: 'Shoppings' },
                { key: 'parques', label: 'Parques' },
                { key: 'transporte', label: 'Transporte Público' }
              ].map((item) => (
                <label key={item.key} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.pontosInteresse[item.key as keyof typeof formData.pontosInteresse]}
                    onChange={(e) =>
                      updateField('pontosInteresse', {
                        ...formData.pontosInteresse,
                        [item.key]: e.target.checked
                      })
                    }
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Última etapa!</h2>
            <p className={styles.stepDescription}>
              Nos conte sobre seu orçamento e urgência
            </p>

            <div className={styles.formGrid}>
              <Input
                label="Orçamento Mínimo (R$)"
                type="number"
                value={formData.orcamentoMin}
                onChange={(e) => updateField('orcamentoMin', e.target.value)}
                placeholder="500000"
              />
              <Input
                label="Orçamento Máximo (R$)"
                type="number"
                value={formData.orcamentoMax}
                onChange={(e) => updateField('orcamentoMax', e.target.value)}
                placeholder="1000000"
              />
              <Select
                label="Urgência"
                value={formData.urgencia}
                onChange={(value) => updateField('urgencia', value)}
                options={[
                  { value: 'baixa', label: 'Baixa - Estou só pesquisando' },
                  { value: 'media', label: 'Média - Nos próximos 6 meses' },
                  { value: 'alta', label: 'Alta - Preciso urgente' }
                ]}
              />
            </div>

            <textarea
              className={styles.textarea}
              value={formData.observacoes}
              onChange={(e) => updateField('observacoes', e.target.value)}
              placeholder="Alguma observação ou requisito especial? (Opcional)"
              rows={4}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background} />

      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Cretor" />
        </div>

        <div className={styles.card}>
          <div className={styles.progressBar}>
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`${styles.progressStep} ${
                  step === currentStep ? styles.progressStepActive : ''
                } ${step < currentStep ? styles.progressStepCompleted : ''}`}
              >
                <div className={styles.progressDot}>{step}</div>
                {step < 5 && <div className={styles.progressLine} />}
              </div>
            ))}
          </div>

          <form onSubmit={currentStep === 5 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {renderStep()}

            <div className={styles.formActions}>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  Voltar
                </Button>
              )}
              <div className={styles.formActionsRight}>
                <Button type="submit">
                  {currentStep === 5 ? 'Finalizar Cadastro' : 'Próximo'}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <p className={styles.footer}>
          Seus dados estão seguros conosco e serão usados apenas para encontrar o imóvel ideal para você.
        </p>
      </div>
    </div>
  )
}
