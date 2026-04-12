import { Link } from 'react-router-dom'
import styles from './PoliticaPrivacidadePage.module.css'

export default function PoliticaPrivacidadePage() {
  return (
    <div className={styles.container}>
      <div className={styles.background} />

      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Cretor" />
        </div>

        <Link to="/login" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19L5 12L12 5" />
          </svg>
          Voltar
        </Link>

        <div className={styles.card}>
          <h1 className={styles.title}>Politica de Privacidade</h1>
          <p className={styles.lastUpdate}>Ultima atualizacao: 12 de abril de 2026</p>

          {/* 1. Introducao */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introducao</h2>
            <p className={styles.text}>
              A <strong>Cretor</strong> ("nos", "nosso" ou "Empresa") esta comprometida em proteger a privacidade e os dados pessoais de seus usuarios, clientes e visitantes. Esta Politica de Privacidade descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos suas informacoes pessoais quando voce utiliza nossa plataforma de gestao imobiliaria e servicos relacionados.
            </p>
            <p className={styles.text}>
              Ao utilizar nossos servicos, voce declara estar ciente e de acordo com os termos desta Politica, em conformidade com a Lei Geral de Protecao de Dados Pessoais (LGPD - Lei n. 13.709/2018) e demais legislacoes aplicaveis.
            </p>
          </div>

          {/* 2. Dados coletados */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Dados Pessoais Coletados</h2>
            <p className={styles.text}>
              Coletamos os seguintes dados pessoais para oferecer nossos servicos de intermediacao e gestao imobiliaria:
            </p>

            <p className={styles.text}><strong>Dados de identificacao:</strong></p>
            <ul className={styles.list}>
              <li>Nome completo, CPF, data de nascimento</li>
              <li>Endereco de e-mail e numero de telefone</li>
              <li>Estado civil e composicao familiar</li>
            </ul>

            <p className={styles.text}><strong>Dados de preferencias imobiliarias:</strong></p>
            <ul className={styles.list}>
              <li>Tipo de imovel desejado, metragem, localizacao preferida</li>
              <li>Faixa de orcamento e condicoes financeiras</li>
              <li>Preferencias de infraestrutura, acabamento e lazer</li>
              <li>Estilo de vida e necessidades especificas</li>
            </ul>

            <p className={styles.text}><strong>Dados financeiros:</strong></p>
            <ul className={styles.list}>
              <li>Faixa de renda, disponibilidade de FGTS</li>
              <li>Valor de entrada e condicoes de financiamento</li>
              <li>Score de credito (quando informado voluntariamente)</li>
            </ul>

            <p className={styles.text}><strong>Dados de navegacao e uso:</strong></p>
            <ul className={styles.list}>
              <li>Endereco IP, tipo de navegador e dispositivo</li>
              <li>Paginas acessadas e tempo de permanencia</li>
              <li>Cookies e tecnologias similares de rastreamento</li>
            </ul>

            <p className={styles.text}><strong>Dados de comunicacao:</strong></p>
            <ul className={styles.list}>
              <li>Mensagens trocadas via WhatsApp integrado a plataforma</li>
              <li>Historico de interacoes com consultores</li>
            </ul>
          </div>

          {/* 3. Finalidades */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Finalidades do Tratamento</h2>
            <p className={styles.text}>
              Utilizamos seus dados pessoais para as seguintes finalidades:
            </p>
            <ul className={styles.list}>
              <li>Cadastro e gestao do seu perfil de cliente</li>
              <li>Analise de compatibilidade e matching inteligente entre seu perfil e imoveis disponiveis</li>
              <li>Envio de sugestoes personalizadas de imoveis e empreendimentos</li>
              <li>Gerenciamento do pipeline de vendas e acompanhamento de propostas</li>
              <li>Comunicacao via WhatsApp e outros canais para atendimento</li>
              <li>Geracao de propostas comerciais e documentos em PDF</li>
              <li>Melhoria continua dos nossos servicos e algoritmos de recomendacao</li>
              <li>Cumprimento de obrigacoes legais e regulatorias</li>
            </ul>
          </div>

          {/* 4. Base legal */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Base Legal para o Tratamento</h2>
            <p className={styles.text}>
              O tratamento de seus dados pessoais e realizado com base nas seguintes hipoteses legais previstas na LGPD:
            </p>
            <ul className={styles.list}>
              <li><strong>Consentimento:</strong> para coleta de dados via formularios de cadastro e autoatendimento</li>
              <li><strong>Execucao de contrato:</strong> para prestacao dos servicos de intermediacao imobiliaria</li>
              <li><strong>Legitimo interesse:</strong> para melhoria de servicos e envio de comunicacoes relevantes</li>
              <li><strong>Obrigacao legal:</strong> para cumprimento de exigencias legais e regulatorias</li>
            </ul>
          </div>

          {/* 5. Compartilhamento */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Compartilhamento de Dados</h2>
            <p className={styles.text}>
              Seus dados pessoais podem ser compartilhados com:
            </p>
            <ul className={styles.list}>
              <li><strong>Consultores imobiliarios:</strong> profissionais autorizados que atuam na intermediacao do seu imovel</li>
              <li><strong>Incorporadoras e construtoras:</strong> quando necessario para viabilizar a negociacao de empreendimentos</li>
              <li><strong>Prestadores de servicos:</strong> empresas que auxiliam na operacao da plataforma (hospedagem, comunicacao, analytics)</li>
              <li><strong>Autoridades publicas:</strong> quando exigido por lei ou determinacao judicial</li>
            </ul>
            <div className={styles.highlight}>
              <p>
                <strong>Importante:</strong> Nao vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins de marketing nao relacionados aos nossos servicos.
              </p>
            </div>
          </div>

          {/* 6. Armazenamento e seguranca */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Armazenamento e Seguranca</h2>
            <p className={styles.text}>
              Adotamos medidas tecnicas e organizacionais adequadas para proteger seus dados pessoais contra acessos nao autorizados, destruicao, perda, alteracao ou qualquer forma de tratamento inadequado, incluindo:
            </p>
            <ul className={styles.list}>
              <li>Criptografia de dados em transito e em repouso</li>
              <li>Controle de acesso baseado em funcoes e autenticacao segura</li>
              <li>Monitoramento e auditorias periodicas de seguranca</li>
              <li>Backups regulares e planos de recuperacao de desastres</li>
            </ul>
            <p className={styles.text}>
              Os dados sao armazenados pelo tempo necessario para cumprir as finalidades para as quais foram coletados, ou conforme exigido por lei. Apos esse periodo, os dados serao eliminados ou anonimizados.
            </p>
          </div>

          {/* 7. Direitos do titular */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Seus Direitos como Titular</h2>
            <p className={styles.text}>
              Conforme a LGPD, voce possui os seguintes direitos em relacao aos seus dados pessoais:
            </p>
            <ul className={styles.list}>
              <li><strong>Confirmacao e acesso:</strong> saber se tratamos seus dados e obter uma copia</li>
              <li><strong>Correcao:</strong> solicitar a atualizacao de dados incompletos ou desatualizados</li>
              <li><strong>Anonimizacao ou eliminacao:</strong> solicitar a exclusao de dados desnecessarios ou tratados em desconformidade</li>
              <li><strong>Portabilidade:</strong> solicitar a transferencia de seus dados a outro fornecedor</li>
              <li><strong>Revogacao do consentimento:</strong> retirar seu consentimento a qualquer momento</li>
              <li><strong>Oposicao:</strong> opor-se ao tratamento quando realizado com base em legitimo interesse</li>
              <li><strong>Informacao sobre compartilhamento:</strong> saber com quais entidades seus dados foram compartilhados</li>
            </ul>
          </div>

          {/* 8. Cookies */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Cookies e Tecnologias de Rastreamento</h2>
            <p className={styles.text}>
              Utilizamos cookies e tecnologias similares para melhorar sua experiencia na plataforma, analisar o uso dos servicos e personalizar conteudo. Os tipos de cookies utilizados incluem:
            </p>
            <ul className={styles.list}>
              <li><strong>Cookies essenciais:</strong> necessarios para o funcionamento da plataforma (autenticacao, sessao)</li>
              <li><strong>Cookies de desempenho:</strong> coletam informacoes sobre como voce utiliza a plataforma</li>
              <li><strong>Cookies de funcionalidade:</strong> permitem lembrar suas preferencias e configuracoes</li>
            </ul>
            <p className={styles.text}>
              Voce pode gerenciar suas preferencias de cookies atraves das configuracoes do seu navegador.
            </p>
          </div>

          {/* 9. Menores */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Dados de Menores de Idade</h2>
            <p className={styles.text}>
              Nossos servicos nao sao destinados a menores de 18 anos. Nao coletamos intencionalmente dados pessoais de criancas ou adolescentes. Caso identifiquemos que dados de um menor foram coletados sem o devido consentimento, procederemos com sua exclusao imediata.
            </p>
          </div>

          {/* 10. Alteracoes */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Alteracoes nesta Politica</h2>
            <p className={styles.text}>
              Esta Politica de Privacidade pode ser atualizada periodicamente para refletir mudancas em nossas praticas ou na legislacao vigente. Quando houver alteracoes significativas, notificaremos voce por meio da plataforma ou do e-mail cadastrado. Recomendamos que consulte esta pagina regularmente.
            </p>
          </div>

          {/* 11. Contato */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Contato e Encarregado de Dados (DPO)</h2>
            <p className={styles.text}>
              Para exercer seus direitos, esclarecer duvidas ou enviar solicitacoes relacionadas a esta Politica de Privacidade, entre em contato conosco:
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>privacidade@cretor.com.br</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.17 21.04 19.33 21 18.5 20.85C15.06 20.15 11.86 18.56 9.19 16.31C6.72 14.23 4.72 11.63 3.42 8.68C3.11 7.93 2.87 7.15 2.71 6.35C2.6 5.79 2.98 5.24 3.54 5.11L6.54 4.11C7.01 3.96 7.52 4.18 7.72 4.63L9.22 8.13C9.4 8.53 9.27 9.01 8.91 9.27L7.69 10.23C9.27 13.1 11.64 15.47 14.51 17.05L15.47 15.83C15.73 15.47 16.21 15.34 16.61 15.52L20.11 17.02C20.56 17.22 20.78 17.73 20.63 18.2L19.63 21.2" />
                </svg>
                <span>(11) 0000-0000</span>
              </div>
            </div>
          </div>

          <div className={styles.highlight}>
            <p>
              Ao utilizar a plataforma Cretor, voce confirma que leu, compreendeu e concorda com esta Politica de Privacidade. Caso nao concorde com algum dos termos descritos, recomendamos que nao utilize nossos servicos.
            </p>
          </div>
        </div>

        <p className={styles.footer}>
          Cretor - Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
