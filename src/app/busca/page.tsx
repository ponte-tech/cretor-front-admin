'use client'

import { Suspense } from 'react'
import BuscaContent from './BuscaContent'

export default function BuscaPage() {
  return (
    <Suspense fallback={null}>
      <BuscaContent />
    </Suspense>
  )
}
