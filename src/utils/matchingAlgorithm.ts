import { Imovel } from '../types/imovel'
import { Cliente } from '../types/cliente'

/**
 * Calcula o score de compatibilidade entre um imóvel e um cliente
 * @param imovel - Imóvel a ser avaliado
 * @param cliente - Cliente com preferências
 * @returns Score de 0 a 100 (0 = incompatível, 100 = match perfeito)
 */
export function calcularMatchScore(imovel: Imovel, cliente: Cliente): number {
  let score = 0
  let pesoTotal = 0

  // ==========================================
  // 1. DEAL BREAKERS - ELIMINATÓRIOS
  // ==========================================

  // Pets não permitidos
  if (cliente.temPets && imovel.informacoesCondominio?.permitePets === false) {
    return 0
  }

  // Deal breakers do cliente presentes no imóvel
  if (cliente.dealBreakers && imovel.dealBreakers) {
    const temDealBreaker = cliente.dealBreakers.some((db) =>
      imovel.dealBreakers?.includes(db)
    )
    if (temDealBreaker) return 0
  }

  // ==========================================
  // 2. LOCALIZAÇÃO (Peso: 20)
  // ==========================================
  const pesoLocalizacao = cliente.prioridades?.localizacao || 3
  const pontosLocalizacao = pesoLocalizacao * 4 // max 20

  let scoreLocalizacao = 0
  if (cliente.bairrosPreferidos.includes(imovel.bairro)) {
    scoreLocalizacao += pontosLocalizacao * 0.7
  }
  if (cliente.cidadesPreferidas.includes(imovel.cidade)) {
    scoreLocalizacao += pontosLocalizacao * 0.3
  }
  if (cliente.zonaPreferida && imovel.zona === cliente.zonaPreferida) {
    scoreLocalizacao += pontosLocalizacao * 0.2
  }

  score += Math.min(pontosLocalizacao, scoreLocalizacao)
  pesoTotal += pontosLocalizacao

  // ==========================================
  // 3. PREÇO (Peso: 20)
  // ==========================================
  const pesoPreco = cliente.prioridades?.preco || 3
  const pontosPreco = pesoPreco * 4 // max 20

  const precoImovel = imovel.tipoNegocio === 'venda' || imovel.tipoNegocio === 'ambos'
    ? imovel.valorVenda || 0
    : imovel.valorLocacao || 0

  if (precoImovel >= cliente.orcamentoMin && precoImovel <= cliente.orcamentoMax) {
    score += pontosPreco
  } else if (precoImovel < cliente.orcamentoMin) {
    // Abaixo do orçamento - ainda bom
    score += pontosPreco * 0.8
  } else {
    // Acima do orçamento - reduz proporcionalmente
    const excedentePercent = (precoImovel - cliente.orcamentoMax) / cliente.orcamentoMax
    score += Math.max(0, pontosPreco * (1 - excedentePercent))
  }
  pesoTotal += pontosPreco

  // ==========================================
  // 4. TAMANHO (Peso: 15)
  // ==========================================
  const pesoTamanho = cliente.prioridades?.tamanho || 3
  const pontosTamanho = pesoTamanho * 3 // max 15

  if (imovel.area >= cliente.metragemMin && imovel.area <= cliente.metragemMax) {
    score += pontosTamanho
  } else if (imovel.area > cliente.metragemMax) {
    // Maior que o desejado - ainda aceitável
    score += pontosTamanho * 0.7
  } else {
    // Menor que o mínimo - penaliza mais
    score += pontosTamanho * 0.3
  }
  pesoTotal += pontosTamanho

  // ==========================================
  // 5. QUARTOS/BANHEIROS/VAGAS (Peso: 15)
  // ==========================================
  const pontosEspecificacoes = 15

  if (imovel.quartos >= cliente.quartos) score += 5
  else score += Math.max(0, 5 - (cliente.quartos - imovel.quartos) * 2)

  if (imovel.banheiros >= cliente.banheiros) score += 5
  else score += Math.max(0, 5 - (cliente.banheiros - imovel.banheiros) * 1.5)

  if (imovel.vagas >= cliente.vagas) score += 5
  else score += Math.max(0, 5 - (cliente.vagas - imovel.vagas) * 2)

  pesoTotal += pontosEspecificacoes

  // ==========================================
  // 6. MUST HAVES - CRÍTICO (Peso: 15)
  // ==========================================
  if (cliente.mustHaves && cliente.mustHaves.length > 0) {
    const pontosMustHaves = 15
    pesoTotal += pontosMustHaves

    const mustHavesAtendidos = cliente.mustHaves.filter((mh) =>
      verificarCaracteristica(imovel, mh)
    )

    const porcentagemAtendida = mustHavesAtendidos.length / cliente.mustHaves.length

    if (porcentagemAtendida === 1) {
      score += pontosMustHaves
    } else if (porcentagemAtendida >= 0.66) {
      score += pontosMustHaves * 0.7
    } else if (porcentagemAtendida >= 0.33) {
      score += pontosMustHaves * 0.4
    } else {
      score -= 20 // Penalidade severa
    }
  }

  // ==========================================
  // 7. CARACTERÍSTICAS DESEJADAS (Peso: 15)
  // ==========================================
  if (cliente.caracteristicas && cliente.caracteristicas.length > 0) {
    const pontosCaracteristicas = 15
    pesoTotal += pontosCaracteristicas

    const caracteristicasMatch = cliente.caracteristicas.filter((c) =>
      imovel.caracteristicas?.includes(c) || verificarCaracteristica(imovel, c)
    )

    score += (caracteristicasMatch.length / cliente.caracteristicas.length) * pontosCaracteristicas
  }

  // ==========================================
  // 8. ACESSIBILIDADE (Crítico se necessário)
  // ==========================================
  if (cliente.necessitaAcessibilidade) {
    const pontosAcessibilidade = 10
    pesoTotal += pontosAcessibilidade

    const tiposNecessarios = cliente.tipoAcessibilidade || []
    let acessibilidadeOK = true

    if (tiposNecessarios.includes('elevador_obrigatorio')) {
      acessibilidadeOK = acessibilidadeOK && (imovel.acessibilidade?.elevador === true)
    }
    if (tiposNecessarios.includes('rampa')) {
      acessibilidadeOK = acessibilidadeOK && (imovel.acessibilidade?.rampaAcesso === true)
    }
    if (tiposNecessarios.includes('banheiro_adaptado')) {
      acessibilidadeOK = acessibilidadeOK && (imovel.acessibilidade?.banheiroAdaptado === true)
    }
    if (tiposNecessarios.includes('portas_largas')) {
      acessibilidadeOK = acessibilidadeOK && (imovel.acessibilidade?.portasLargas === true)
    }

    if (acessibilidadeOK) {
      score += pontosAcessibilidade
    } else {
      score -= 30 // Penalidade crítica
    }
  }

  // ==========================================
  // 9. VISTA (Peso: 5)
  // ==========================================
  if (cliente.vistaDesejada && cliente.vistaDesejada.length > 0) {
    const pontosVista = 5
    pesoTotal += pontosVista

    if (imovel.caracteristicasFisicas?.vista) {
      const vistaMatch = cliente.vistaDesejada.some((v) =>
        v !== 'sem_preferencia' && imovel.caracteristicasFisicas?.vista.includes(v as any)
      )
      if (vistaMatch) score += pontosVista
    }
  }

  // ==========================================
  // 10. ACABAMENTO (Peso: 5)
  // ==========================================
  if (cliente.tipoAcabamento && imovel.caracteristicasFisicas?.tipoAcabamento) {
    const pontosAcabamento = 5
    pesoTotal += pontosAcabamento

    if (imovel.caracteristicasFisicas.tipoAcabamento === cliente.tipoAcabamento) {
      score += pontosAcabamento
    } else {
      // Aceita níveis acima do desejado
      const niveisAcabamento = ['padrao', 'alto_padrao', 'luxo', 'ultra_luxo']
      const nivelCliente = niveisAcabamento.indexOf(cliente.tipoAcabamento)
      const nivelImovel = niveisAcabamento.indexOf(imovel.caracteristicasFisicas.tipoAcabamento)

      if (nivelImovel > nivelCliente) {
        score += pontosAcabamento * 0.8
      } else {
        score += pontosAcabamento * 0.3
      }
    }
  }

  // ==========================================
  // 11. PROXIMIDADES (Peso: 10)
  // ==========================================
  if (imovel.proximidades && cliente.pontosInteresse) {
    const pontosProximidade = 10
    pesoTotal += pontosProximidade

    let interessesAtendidos = 0
    let totalInteresses = 0

    const mapeamento: Array<[keyof typeof cliente.pontosInteresse, keyof typeof imovel.proximidades, number]> = [
      ['escolas', 'escolaFundamental', 500],
      ['universidades', 'universidade', 2000],
      ['hospitais', 'hospital', 2000],
      ['shoppings', 'shopping', 1500],
      ['supermercados', 'supermercado', 800],
      ['parques', 'parque', 1000],
      ['academias', 'academia', 1000],
      ['metro', 'metro', 800],
      ['praia', 'praia', 3000]
    ]

    mapeamento.forEach(([interesse, proximidade, distanciaMax]) => {
      if (cliente.pontosInteresse[interesse]) {
        totalInteresses++
        const distancia = imovel.proximidades?.[proximidade]
        if (distancia !== undefined && distancia <= distanciaMax) {
          interessesAtendidos++
        }
      }
    })

    if (totalInteresses > 0) {
      score += (interessesAtendidos / totalInteresses) * pontosProximidade
    }
  }

  // ==========================================
  // CÁLCULO FINAL
  // ==========================================

  // Normalizar para 0-100
  if (pesoTotal === 0) return 50 // Score neutro se não houver critérios

  const scoreFinal = Math.min(100, Math.max(0, (score / pesoTotal) * 100))

  return Math.round(scoreFinal)
}

/**
 * Verifica se o imóvel possui uma característica específica
 */
function verificarCaracteristica(imovel: Imovel, caracteristica: string): boolean {
  const c = caracteristica.toLowerCase()

  // Verificar no array de características
  if (imovel.caracteristicas?.some((car) => car.toLowerCase().includes(c))) {
    return true
  }

  // Verificar em campos específicos
  if (c.includes('piscina') && imovel.infraestruturaCondominio?.piscinaAdulto) return true
  if (c.includes('academia') && imovel.infraestruturaCondominio?.academiaCompleta) return true
  if (c.includes('churrasqueira') && imovel.infraestruturaCondominio?.churrasqueiraColetiva) return true
  if (c.includes('playground') && imovel.infraestruturaCondominio?.playground) return true
  if (c.includes('varanda') && imovel.comodos?.varanda) return true
  if (c.includes('sacada') && imovel.comodos?.sacada) return true
  if (c.includes('escritorio') && imovel.comodos?.escritorio) return true
  if (c.includes('closet') && imovel.comodos?.closet) return true
  if (c.includes('energia solar') && imovel.sustentabilidade?.energiaSolar) return true

  return false
}

/**
 * Ordena uma lista de imóveis por compatibilidade com um cliente
 */
export function ordenarPorMatch(imoveis: Imovel[], cliente: Cliente): Array<Imovel & { matchScore: number }> {
  return imoveis
    .map((imovel) => ({
      ...imovel,
      matchScore: calcularMatchScore(imovel, cliente)
    }))
    .filter((imovel) => imovel.matchScore > 0) // Remove matches eliminados
    .sort((a, b) => b.matchScore - a.matchScore) // Ordena do maior para o menor
}

/**
 * Retorna apenas os top matches
 */
export function getTopMatches(imoveis: Imovel[], cliente: Cliente, limit: number = 10): Array<Imovel & { matchScore: number }> {
  return ordenarPorMatch(imoveis, cliente).slice(0, limit)
}

/**
 * Classifica o nível de match
 */
export function classificarMatch(score: number): {
  nivel: 'excelente' | 'bom' | 'regular' | 'baixo'
  cor: string
  label: string
} {
  if (score >= 85) return { nivel: 'excelente', cor: '#10b981', label: 'Match Perfeito!' }
  if (score >= 70) return { nivel: 'bom', cor: '#3b82f6', label: 'Ótimo Match' }
  if (score >= 50) return { nivel: 'regular', cor: '#f59e0b', label: 'Match Razoável' }
  return { nivel: 'baixo', cor: '#ef4444', label: 'Match Fraco' }
}
