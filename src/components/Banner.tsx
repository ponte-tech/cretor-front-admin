'use client'

export default function Banner() {
  return (
    <div id="bannerhome" className="stray-section">
      <div className="bg-no-overflow" style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
        <div
          className="bg1 visible"
          style={{ backgroundImage: 'url(/assets/img/banner.webp)' }}
        />
      </div>

      <div
        className="recorte visible"
        style={{ backgroundImage: 'url(/assets/img/corretor.webp)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', top: '-40px', zIndex: 3 }}
      />

      <h1 className="conheca visible">
        Bem-vindo à Imobiliária em Balneário Camboriú<br />
        Guilherme Pilger Corretor de Imóveis
      </h1>

      <div
        className="unica visible"
        style={{ backgroundImage: 'url(/assets/img/unica.png)' }}
      >
        experiência única!
      </div>
    </div>
  )
}
