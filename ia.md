# Boas Práticas Next.js - SEO e Performance

## 1. Estrutura e Configuração do Projeto

### App Router (Next.js 13+)
```typescript
// app/layout.tsx - Layout raiz com metadata essencial
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://seudominio.com'),
  title: {
    default: 'Título Padrão do Site',
    template: '%s | Nome da Empresa'
  },
  description: 'Descrição única e relevante (150-160 caracteres)',
  keywords: ['palavra-chave1', 'palavra-chave2', 'palavra-chave3'],
  authors: [{ name: 'Nome da Empresa' }],
  creator: 'Nome da Empresa',
  publisher: 'Nome da Empresa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://seudominio.com',
    siteName: 'Nome do Site',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descrição da imagem'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Título para Twitter',
    description: 'Descrição para Twitter',
    images: ['/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'código-de-verificação-google',
    yandex: 'código-yandex',
    bing: 'código-bing'
  }
}
```

### next.config.js Otimizado
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compressão e otimização
  compress: true,
  poweredByHeader: false,

  // Otimização de imagens
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seucdn.com',
        pathname: '/images/**'
      }
    ]
  },

  // Headers de segurança e cache
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects e rewrites para SEO
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true // 301 redirect
      }
    ]
  }
}

module.exports = nextConfig
```

## 2. SEO On-Page

### Metadata Dinâmica por Página
```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://seudominio.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    },
    alternates: {
      canonical: `https://seudominio.com/blog/${params.slug}`
    }
  }
}
```

### Structured Data (JSON-LD)
```typescript
// components/StructuredData.tsx
export function ArticleStructuredData({ article }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nome da Empresa',
      logo: {
        '@type': 'ImageObject',
        url: 'https://seudominio.com/logo.png'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Breadcrumb Schema
export function BreadcrumbStructuredData({ items }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Organization Schema
export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nome da Empresa',
    url: 'https://seudominio.com',
    logo: 'https://seudominio.com/logo.png',
    description: 'Descrição da empresa',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Exemplo, 123',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '01234-567',
      addressCountry: 'BR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-1234-5678',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: ['Portuguese']
    },
    sameAs: [
      'https://www.facebook.com/suapagina',
      'https://twitter.com/suaconta',
      'https://www.linkedin.com/company/suaempresa',
      'https://www.instagram.com/suaconta'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

## 3. Performance e Core Web Vitals

### Otimização de Imagens
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'

export function OptimizedImage({ src, alt, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      quality={85}
      priority={priority} // Para imagens above the fold
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Gerar blur placeholder
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
```

### Font Optimization
```typescript
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
})

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Lazy Loading de Componentes
```typescript
// Lazy loading com Suspense
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  )
}

// Dynamic import para componentes client-side
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
```

## 4. Sitemap e Robots.txt

### Sitemap Dinâmico
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://seudominio.com'

  // Páginas estáticas
  const staticPages = [
    '',
    '/sobre',
    '/contato',
    '/servicos'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // Páginas dinâmicas (blog posts)
  const posts = await fetchAllPosts()
  const postPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  return [...staticPages, ...postPages]
}
```

### Robots.txt
```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/']
      }
    ],
    sitemap: 'https://seudominio.com/sitemap.xml'
  }
}
```

## 5. Estratégias de Renderização

### Static Site Generation (SSG) - Melhor para SEO
```typescript
// Para páginas estáticas com conteúdo que muda raramente
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidar a cada 1 hora

export default async function Page() {
  const data = await fetchData()
  return <div>{data.content}</div>
}
```

### Incremental Static Regeneration (ISR)
```typescript
// Para páginas que precisam ser atualizadas periodicamente
export const revalidate = 60 // Revalidar a cada 60 segundos

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug)
  return <article>{post.content}</article>
}
```

### generateStaticParams para rotas dinâmicas
```typescript
// Gerar páginas estáticas para rotas dinâmicas
export async function generateStaticParams() {
  const posts = await fetchAllPosts()

  return posts.map(post => ({
    slug: post.slug
  }))
}
```

## 6. Web Vitals e Monitoring

### Monitoramento de Performance
```typescript
// app/web-vitals.ts
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Enviar para analytics
    if (typeof window !== 'undefined') {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true
      })
    }
  })

  return null
}

// app/layout.tsx
import { WebVitals } from './web-vitals'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <WebVitals />
      </body>
    </html>
  )
}
```

## 7. Content Optimization

### Hierarquia de Headings Correta
```typescript
// ✅ Correto
export default function Page() {
  return (
    <article>
      <h1>Título Principal da Página</h1>
      <section>
        <h2>Subtítulo 1</h2>
        <p>Conteúdo...</p>
        <h3>Sub-subtítulo 1.1</h3>
        <p>Conteúdo...</p>
      </section>
      <section>
        <h2>Subtítulo 2</h2>
        <p>Conteúdo...</p>
      </section>
    </article>
  )
}

// ❌ Errado - pular níveis de heading
<h1>Título</h1>
<h3>Subtítulo</h3> // Pulou o h2
```

### Texto Alternativo em Imagens
```typescript
// ✅ Descritivo e relevante
<Image
  src="/produto.jpg"
  alt="Notebook Dell Inspiron 15 com tela de 15.6 polegadas e teclado retroiluminado"
/>

// ❌ Genérico ou vazio
<Image src="/produto.jpg" alt="imagem" />
<Image src="/produto.jpg" alt="" /> // Só use vazio para imagens decorativas
```

## 8. Acessibilidade (também impacta SEO)

```typescript
// Links semânticos
<Link href="/sobre" aria-label="Saiba mais sobre nossa empresa">
  Sobre Nós
</Link>

// Navegação acessível
<nav aria-label="Navegação principal">
  <ul>
    <li><Link href="/">Home</Link></li>
    <li><Link href="/servicos">Serviços</Link></li>
    <li><Link href="/contato">Contato</Link></li>
  </ul>
</nav>

// Formulários acessíveis
<form>
  <label htmlFor="email">E-mail:</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    aria-required="true"
    aria-describedby="email-help"
  />
  <span id="email-help">Digite seu melhor e-mail</span>
</form>
```

## 9. Internacionalização e hreflang

```typescript
// app/[lang]/layout.tsx
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://seudominio.com/${params.lang}`,
      languages: {
        'pt-BR': 'https://seudominio.com/pt-br',
        'en-US': 'https://seudominio.com/en',
        'es-ES': 'https://seudominio.com/es'
      }
    }
  }
}
```

## 10. Analytics e Search Console

### Google Analytics 4
```typescript
// components/GoogleAnalytics.tsx
import Script from 'next/script'

export function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </>
  )
}
```

## 11. Checklist SEO

### Técnico
- [ ] SSL/HTTPS configurado
- [ ] Sitemap.xml gerado e enviado ao Google Search Console
- [ ] Robots.txt configurado
- [ ] URLs amigáveis (slug-format)
- [ ] Canonical URLs definidas
- [ ] 301 redirects para URLs antigas
- [ ] Compressão Gzip/Brotli ativada
- [ ] Minificação de CSS/JS

### On-Page
- [ ] Title único e descritivo em todas as páginas (50-60 caracteres)
- [ ] Meta description única (150-160 caracteres)
- [ ] Headings hierárquicos (H1, H2, H3...)
- [ ] Apenas um H1 por página
- [ ] Alt text em todas as imagens
- [ ] Links internos relevantes
- [ ] URLs descritivas
- [ ] Schema.org/JSON-LD implementado

### Performance
- [ ] Core Web Vitals otimizados (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] Lazy loading implementado
- [ ] Font optimization
- [ ] Code splitting
- [ ] Cache estratégico
- [ ] CDN configurado

### Conteúdo
- [ ] Conteúdo original e relevante
- [ ] Densidade de palavras-chave natural (1-2%)
- [ ] Conteúdo atualizado regularmente
- [ ] Mínimo de 300 palavras por página
- [ ] Texto rico em informações úteis

### Mobile
- [ ] Design responsivo
- [ ] Touch targets adequados (min 48x48px)
- [ ] Texto legível sem zoom
- [ ] Sem conteúdo que exige scroll horizontal
- [ ] Velocidade mobile otimizada

### Social
- [ ] Open Graph tags configuradas
- [ ] Twitter Cards configuradas
- [ ] Botões de compartilhamento social

## 12. Ferramentas Essenciais

- **Google Search Console**: Monitorar indexação e performance
- **Google Analytics**: Analisar tráfego e comportamento
- **PageSpeed Insights**: Medir Core Web Vitals
- **Lighthouse**: Auditoria completa de SEO/Performance/Acessibilidade
- **Schema Markup Validator**: Validar structured data
- **Mobile-Friendly Test**: Testar responsividade
- **Screaming Frog**: Crawling e auditoria técnica

## 13. Comandos Úteis

```bash
# Analisar bundle size
npm run build
npx @next/bundle-analyzer

# Lighthouse CI
npx lighthouse https://seudominio.com --view

# Análise de performance
npm run build && npm start
# Abrir DevTools > Lighthouse > Run
```

## 14. Recursos Adicionais

- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Web.dev](https://web.dev/)
- [Schema.org](https://schema.org/)
