import jsPDF from 'jspdf'
import type { PropostaData } from '../components/PropostaModal/PropostaModal'
import { LOGO_BASE64 } from './logoBase64'

function parseCurrencyValue(str: string): number {
  if (!str) return 0
  const cleaned = str.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}

export function gerarPropostaPDF(data: PropostaData) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageW = 210
  const marginL = 20
  const marginR = 20
  const contentW = pageW - marginL - marginR

  // ========== HEADER (dark banner) ==========
  doc.setFillColor(60, 30, 20) // dark brown/maroon
  doc.rect(0, 0, pageW, 35, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(255, 255, 255)
  doc.text(`PROPOSTA : ${data.nomeCliente.toUpperCase()}`, marginL, 17)

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(200, 200, 200)
  doc.text(`Por: ${data.nomeCorretor}`, marginL, 25)

  // Logo
  doc.addImage(LOGO_BASE64, 'PNG', 145, 5, 50, 25)

  let y = 50

  // ========== EMPREENDIMENTO ==========
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(180, 60, 30) // orange-red
  doc.text(`Empreendimento ${data.empreendimento.toUpperCase()}`, marginL, y)
  y += 10

  // Info table
  const infoRows = [
    ['Torre', data.torre],
    ['Unidade', data.unidade],
    ['Entrega Unidade', data.entregaUnidade],
    ['Imobiliária', data.imobiliaria],
  ]

  doc.setFontSize(10)
  for (const [label, value] of infoRows) {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)
    doc.text(label, marginL, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(30, 30, 30)
    doc.text(value || '-', marginL + 50, y)
    y += 6
  }

  y += 8

  // ========== FLUXO ==========
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(180, 60, 30)
  doc.text('Fluxo', marginL, y)
  y += 7

  // VALOR TABELA
  const valorTabela = parseCurrencyValue(data.valorTabela)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text('VALOR TABELA', marginL, y)
  doc.setFont('helvetica', 'italic')
  doc.text(formatBRL(valorTabela), marginL + contentW, y, { align: 'right' })

  y += 3
  doc.setDrawColor(180, 180, 180)
  doc.setLineWidth(0.3)
  doc.line(marginL, y, marginL + contentW, y)
  y += 7

  // Table header
  const colX = [marginL, marginL + 50, marginL + 80, marginL + 110, marginL + 145]
  const headers = ['Tipo', 'Qtdade Parcelas', 'Valor', 'Data Vencimento', 'Valor Total']

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  headers.forEach((h, i) => {
    doc.text(h, colX[i], y)
  })
  y += 3
  doc.setDrawColor(200, 200, 200)
  doc.line(marginL, y, marginL + contentW, y)
  y += 5

  // Table rows
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  let totalProposto = 0

  for (const row of data.fluxo) {
    doc.setTextColor(30, 30, 30)
    doc.text(row.tipo || '-', colX[0], y)
    doc.text(row.qtdeParcelas || '', colX[1] + 15, y, { align: 'center' })

    const valorParcela = parseCurrencyValue(row.valor)
    if (valorParcela > 0) {
      doc.text(formatBRL(valorParcela), colX[2], y)
    }

    doc.text(row.dataVencimento || '-', colX[3], y)

    const valorTotalRow = parseCurrencyValue(row.valorTotal)
    totalProposto += valorTotalRow
    doc.text(formatBRL(valorTotalRow), marginL + contentW, y, { align: 'right' })

    y += 6
  }

  // Total line
  y += 2
  doc.setDrawColor(100, 100, 100)
  doc.setLineWidth(0.5)
  doc.line(marginL, y, marginL + contentW, y)
  y += 5

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(30, 30, 30)
  doc.text('TOTAL PROPOSTO', marginL, y)
  doc.text(formatBRL(totalProposto), marginL + contentW, y, { align: 'right' })

  y += 16

  // ========== PROJECAO DO INVESTIMENTO ==========
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(180, 60, 30)
  doc.text('Projeção do investimento', marginL, y)
  y += 10

  // Calculate values
  const reducaoInvestimento = valorTabela - totalProposto
  const reducaoPercent = valorTabela > 0 ? ((reducaoInvestimento / valorTabela) * 100) : 0
  const valorizacaoPercent = parseFloat(data.valorizacaoPercent) || 100
  const totalValorizacao = totalProposto * (1 + valorizacaoPercent / 100)

  // Bar chart
  const chartX = marginL + 15
  const chartBaseY = y + 60
  const chartH = 55
  const barW = 22

  // Valor Atual bar (dark blue)
  const barH1 = chartH * 0.6
  doc.setFillColor(50, 70, 100)
  doc.rect(chartX, chartBaseY - barH1, barW, barH1, 'F')

  // Valorização bar (orange) - taller
  const barH2 = chartH
  doc.setFillColor(220, 120, 40)
  doc.rect(chartX + barW + 4, chartBaseY - barH2, barW, barH2, 'F')

  // Labels under bars
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(50, 50, 50)
  doc.text('Valor Atual', chartX + barW / 2, chartBaseY + 5, { align: 'center' })
  doc.setTextColor(220, 120, 40)
  doc.text('Valorização', chartX + barW + 4 + barW / 2, chartBaseY + 5, { align: 'center' })

  doc.setFontSize(7)
  doc.setTextColor(80, 80, 80)
  doc.text(formatBRL(totalProposto), chartX + barW / 2, chartBaseY + 10, { align: 'center' })
  doc.setTextColor(220, 120, 40)
  doc.text(formatBRL(totalValorizacao), chartX + barW + 4 + barW / 2, chartBaseY + 10, { align: 'center' })

  // Right side cards
  const cardX = marginL + 90
  const cardW = 75

  // Card 1 - Redução
  doc.setFillColor(245, 245, 245)
  doc.roundedRect(cardX, y, cardW, 25, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(50, 70, 100)
  doc.text(`-${reducaoPercent.toFixed(2)}%`, cardX + cardW / 2, y + 10, { align: 'center' })
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('Redução Investimento', cardX + cardW / 2, y + 15, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(30, 30, 30)
  doc.text(formatBRL(reducaoInvestimento), cardX + cardW / 2, y + 22, { align: 'center' })

  // Card 2 - Valorização
  const card2Y = y + 30
  doc.setFillColor(245, 245, 245)
  doc.roundedRect(cardX, card2Y, cardW, 25, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(220, 120, 40)
  doc.text(`${valorizacaoPercent}%`, cardX + cardW / 2, card2Y + 10, { align: 'center' })
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('Valorização até a entrega das chaves', cardX + cardW / 2, card2Y + 15, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(30, 30, 30)
  doc.text(formatBRL(totalValorizacao), cardX + cardW / 2, card2Y + 22, { align: 'center' })

  // Save
  const fileName = `Proposta - ${data.imobiliaria || 'Imobiliaria'} - ${data.nomeCliente}.pdf`
  doc.save(fileName)
}
