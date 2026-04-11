import { Conversa } from '../types/whatsapp'

export const conversasMock: Conversa[] = [
  {
    id: '1',
    contato: 'Maria Silva',
    avatar: '/avatares/woman/1.png',
    telefone: '(11) 99876-5432',
    naoLidas: 3,
    online: true,
    ultimaMensagem: 'Boa tarde! Gostaria de agendar uma visita ao apartamento.',
    horarioUltimaMensagem: '14:32',
    mensagens: [
      {
        id: 'm1', tipo: 'texto', conteudo: 'Olá, boa tarde!', remetente: 'contato', horario: '14:20', lida: true,
        traducao: { en: 'Hello, good afternoon!', es: 'Hola, buenas tardes!' }
      },
      {
        id: 'm2', tipo: 'texto', conteudo: 'Boa tarde, Maria! Como posso ajudar?', remetente: 'eu', horario: '14:21', lida: true,
        traducao: { en: 'Good afternoon, Maria! How can I help you?', es: 'Buenas tardes, Maria! Como puedo ayudarte?' }
      },
      {
        id: 'm3', tipo: 'texto', conteudo: 'Vi o apartamento no Jardins que vocês anunciaram.', remetente: 'contato', horario: '14:23', lida: true,
        traducao: { en: 'I saw the apartment in Jardins that you advertised.', es: 'Vi el apartamento en Jardins que ustedes anunciaron.' }
      },
      {
        id: 'm4', tipo: 'texto', conteudo: 'O de 3 quartos com suíte? Está disponível sim!', remetente: 'eu', horario: '14:25', lida: true,
        traducao: { en: 'The 3-bedroom with en-suite? It is available!', es: 'El de 3 habitaciones con suite? Está disponible!' }
      },
      {
        id: 'm5', tipo: 'audio', conteudo: '', duracaoAudio: 15, remetente: 'contato', horario: '14:28', lida: true,
        transcricaoAudio: 'Eu gostaria de saber se posso visitar o apartamento essa semana, de preferência na quarta ou quinta-feira.',
        traducao: {
          en: 'I would like to know if I can visit the apartment this week, preferably on Wednesday or Thursday.',
          es: 'Me gustaría saber si puedo visitar el apartamento esta semana, preferiblemente el miércoles o jueves.'
        }
      },
      {
        id: 'm6', tipo: 'texto', conteudo: 'Entendi! Podemos agendar uma visita para esta semana.', remetente: 'eu', horario: '14:30', lida: true,
        traducao: { en: 'I understand! We can schedule a visit for this week.', es: 'Entendido! Podemos agendar una visita para esta semana.' }
      },
      {
        id: 'm7', tipo: 'texto', conteudo: 'Boa tarde! Gostaria de agendar uma visita ao apartamento.', remetente: 'contato', horario: '14:32', lida: false,
        traducao: { en: 'Good afternoon! I would like to schedule a visit to the apartment.', es: 'Buenas tardes! Me gustaría agendar una visita al apartamento.' }
      },
    ]
  },
  {
    id: '2',
    contato: 'João Pereira',
    avatar: '/avatares/man/11.png',
    telefone: '(11) 98765-4321',
    naoLidas: 0,
    online: false,
    ultimaMensagem: 'Perfeito, obrigado pela atenção!',
    horarioUltimaMensagem: '12:45',
    mensagens: [
      {
        id: 'm8', tipo: 'texto', conteudo: 'Bom dia! A documentação do imóvel está toda regularizada?', remetente: 'contato', horario: '10:00', lida: true,
        traducao: { en: 'Good morning! Is the property documentation all in order?', es: 'Buenos días! La documentación del inmueble está toda regularizada?' }
      },
      {
        id: 'm9', tipo: 'texto', conteudo: 'Bom dia, João! Sim, toda documentação está em ordem.', remetente: 'eu', horario: '10:15', lida: true,
        traducao: { en: 'Good morning, João! Yes, all documentation is in order.', es: 'Buenos días, João! Sí, toda la documentación está en orden.' }
      },
      {
        id: 'm10', tipo: 'audio', conteudo: '', duracaoAudio: 22, remetente: 'eu', horario: '10:16', lida: true,
        transcricaoAudio: 'A escritura está atualizada, o IPTU está em dia e não há nenhuma pendência judicial sobre o imóvel.',
        traducao: {
          en: 'The deed is up to date, the property tax is current and there are no pending legal issues on the property.',
          es: 'La escritura está actualizada, el impuesto predial está al día y no hay ninguna pendencia judicial sobre el inmueble.'
        }
      },
      {
        id: 'm11', tipo: 'texto', conteudo: 'Ótimo! E quanto ao valor, tem margem para negociação?', remetente: 'contato', horario: '11:30', lida: true,
        traducao: { en: 'Great! And regarding the price, is there room for negotiation?', es: 'Genial! Y en cuanto al valor, hay margen para negociación?' }
      },
      {
        id: 'm12', tipo: 'texto', conteudo: 'Podemos conversar sobre condições especiais sim. Qual seria sua proposta?', remetente: 'eu', horario: '11:45', lida: true,
        traducao: { en: 'We can discuss special conditions. What would be your offer?', es: 'Podemos conversar sobre condiciones especiales. Cuál sería su propuesta?' }
      },
      {
        id: 'm13', tipo: 'texto', conteudo: 'Perfeito, obrigado pela atenção!', remetente: 'contato', horario: '12:45', lida: true,
        traducao: { en: 'Perfect, thank you for your attention!', es: 'Perfecto, gracias por la atención!' }
      },
    ]
  },
  {
    id: '3',
    contato: 'Ana Rodrigues',
    avatar: '/avatares/woman/7.png',
    telefone: '(21) 99654-3210',
    naoLidas: 1,
    online: true,
    ultimaMensagem: 'Pode me enviar mais fotos do imóvel?',
    horarioUltimaMensagem: '13:10',
    mensagens: [
      {
        id: 'm14', tipo: 'texto', conteudo: 'Oi! Tenho interesse no terreno em Alphaville.', remetente: 'contato', horario: '12:00', lida: true,
        traducao: { en: 'Hi! I am interested in the land in Alphaville.', es: 'Hola! Tengo interés en el terreno en Alphaville.' }
      },
      {
        id: 'm15', tipo: 'texto', conteudo: 'Olá Ana! Qual terreno específico?', remetente: 'eu', horario: '12:05', lida: true,
        traducao: { en: 'Hello Ana! Which specific land?', es: 'Hola Ana! Cuál terreno específico?' }
      },
      {
        id: 'm16', tipo: 'texto', conteudo: 'O lote de 450m² na rua das Palmeiras.', remetente: 'contato', horario: '12:10', lida: true,
        traducao: { en: 'The 450m² lot on Palmeiras street.', es: 'El lote de 450m² en la calle de las Palmeras.' }
      },
      {
        id: 'm17', tipo: 'audio', conteudo: '', duracaoAudio: 35, remetente: 'eu', horario: '12:15', lida: true,
        transcricaoAudio: 'Esse terreno é excelente, está em uma região que vai valorizar muito nos próximos anos. O acesso é fácil e já tem toda infraestrutura de água e esgoto.',
        traducao: {
          en: 'This land is excellent, it is in a region that will appreciate a lot in the coming years. Access is easy and it already has full water and sewage infrastructure.',
          es: 'Ese terreno es excelente, está en una región que va a valorizar mucho en los próximos años. El acceso es fácil y ya tiene toda la infraestructura de agua y alcantarillado.'
        }
      },
      {
        id: 'm18', tipo: 'texto', conteudo: 'Pode me enviar mais fotos do imóvel?', remetente: 'contato', horario: '13:10', lida: false,
        traducao: { en: 'Can you send me more photos of the property?', es: 'Puede enviarme más fotos del inmueble?' }
      },
    ]
  },
  {
    id: '4',
    contato: 'Carlos Mendes',
    avatar: '/avatares/man/22.png',
    telefone: '(11) 97543-2109',
    naoLidas: 0,
    online: false,
    ultimaMensagem: 'Combinado, nos vemos amanhã às 10h.',
    horarioUltimaMensagem: 'Ontem',
    mensagens: [
      {
        id: 'm19', tipo: 'texto', conteudo: 'Boa tarde, gostaria de saber sobre financiamento.', remetente: 'contato', horario: '15:00', lida: true,
        traducao: { en: 'Good afternoon, I would like to know about financing.', es: 'Buenas tardes, me gustaría saber sobre financiamiento.' }
      },
      {
        id: 'm20', tipo: 'texto', conteudo: 'Claro! Trabalhamos com diversas opções de financiamento.', remetente: 'eu', horario: '15:10', lida: true,
        traducao: { en: 'Of course! We work with various financing options.', es: 'Claro! Trabajamos con diversas opciones de financiamiento.' }
      },
      {
        id: 'm21', tipo: 'audio', conteudo: '', duracaoAudio: 45, remetente: 'contato', horario: '15:15', lida: true,
        transcricaoAudio: 'Eu tenho um valor de entrada de aproximadamente duzentos mil reais e gostaria de financiar o restante em trinta anos. Vocês conseguem fazer uma simulação?',
        traducao: {
          en: 'I have a down payment of approximately two hundred thousand reais and I would like to finance the rest over thirty years. Can you run a simulation?',
          es: 'Tengo un valor de entrada de aproximadamente doscientos mil reales y me gustaría financiar el resto en treinta años. Pueden hacer una simulación?'
        }
      },
      {
        id: 'm22', tipo: 'texto', conteudo: 'Podemos marcar uma reunião para detalhar as condições?', remetente: 'eu', horario: '15:20', lida: true,
        traducao: { en: 'Can we schedule a meeting to detail the conditions?', es: 'Podemos agendar una reunión para detallar las condiciones?' }
      },
      {
        id: 'm23', tipo: 'texto', conteudo: 'Combinado, nos vemos amanhã às 10h.', remetente: 'contato', horario: '15:30', lida: true,
        traducao: { en: 'Agreed, see you tomorrow at 10am.', es: 'Combinado, nos vemos mañana a las 10h.' }
      },
    ]
  },
  {
    id: '5',
    contato: 'Fernanda Costa',
    avatar: '/avatares/woman/14.png',
    telefone: '(11) 96432-1098',
    naoLidas: 5,
    online: true,
    ultimaMensagem: 'Preciso de uma resposta urgente sobre a proposta!',
    horarioUltimaMensagem: '14:50',
    mensagens: [
      {
        id: 'm24', tipo: 'texto', conteudo: 'Olá! A proposta que enviei foi analisada?', remetente: 'contato', horario: '09:00', lida: true,
        traducao: { en: 'Hello! Was the proposal I sent analyzed?', es: 'Hola! La propuesta que envié fue analizada?' }
      },
      {
        id: 'm25', tipo: 'texto', conteudo: 'Bom dia Fernanda! Estamos analisando.', remetente: 'eu', horario: '09:30', lida: true,
        traducao: { en: 'Good morning Fernanda! We are analyzing it.', es: 'Buenos días Fernanda! Estamos analizando.' }
      },
      {
        id: 'm26', tipo: 'audio', conteudo: '', duracaoAudio: 28, remetente: 'contato', horario: '10:00', lida: true,
        transcricaoAudio: 'Preciso de uma resposta até o final do dia porque tenho outra proposta em mãos e preciso decidir.',
        traducao: {
          en: 'I need an answer by the end of the day because I have another offer in hand and need to decide.',
          es: 'Necesito una respuesta hasta el final del día porque tengo otra propuesta en manos y necesito decidir.'
        }
      },
      {
        id: 'm27', tipo: 'texto', conteudo: 'O proprietário pediu um valor maior de entrada.', remetente: 'eu', horario: '11:00', lida: true,
        traducao: { en: 'The owner asked for a higher down payment.', es: 'El propietario pidió un valor mayor de entrada.' }
      },
      {
        id: 'm28', tipo: 'texto', conteudo: 'Quanto a mais ele quer?', remetente: 'contato', horario: '11:05', lida: true,
        traducao: { en: 'How much more does he want?', es: 'Cuánto más quiere?' }
      },
      {
        id: 'm29', tipo: 'texto', conteudo: 'Cerca de 10% a mais do que o proposto inicialmente.', remetente: 'eu', horario: '11:10', lida: true,
        traducao: { en: 'About 10% more than initially proposed.', es: 'Cerca de 10% más de lo propuesto inicialmente.' }
      },
      {
        id: 'm30', tipo: 'audio', conteudo: '', duracaoAudio: 18, remetente: 'contato', horario: '13:00', lida: false,
        transcricaoAudio: 'Tudo bem, vou tentar conseguir esse valor com o banco.',
        traducao: { en: 'Alright, I will try to get that amount from the bank.', es: 'Está bien, voy a intentar conseguir ese valor con el banco.' }
      },
      {
        id: 'm31', tipo: 'texto', conteudo: 'Vou ver se consigo esse valor.', remetente: 'contato', horario: '13:30', lida: false,
        traducao: { en: 'I will see if I can get that amount.', es: 'Voy a ver si consigo ese valor.' }
      },
      {
        id: 'm32', tipo: 'texto', conteudo: 'Consegui! Podemos fechar?', remetente: 'contato', horario: '14:20', lida: false,
        traducao: { en: 'I got it! Can we close the deal?', es: 'Lo conseguí! Podemos cerrar?' }
      },
      {
        id: 'm33', tipo: 'texto', conteudo: 'Preciso de uma resposta urgente sobre a proposta!', remetente: 'contato', horario: '14:50', lida: false,
        traducao: { en: 'I need an urgent response about the proposal!', es: 'Necesito una respuesta urgente sobre la propuesta!' }
      },
    ]
  },
  {
    id: '6',
    contato: 'Roberto Almeida',
    avatar: '/avatares/man/33.png',
    telefone: '(21) 95321-0987',
    naoLidas: 0,
    online: false,
    ultimaMensagem: 'Obrigado, vou pensar e retorno.',
    horarioUltimaMensagem: 'Ontem',
    mensagens: [
      {
        id: 'm34', tipo: 'texto', conteudo: 'Boa noite! Vi o anúncio da cobertura duplex.', remetente: 'contato', horario: '20:00', lida: true,
        traducao: { en: 'Good evening! I saw the duplex penthouse ad.', es: 'Buenas noches! Vi el anuncio del ático dúplex.' }
      },
      {
        id: 'm35', tipo: 'texto', conteudo: 'Boa noite Roberto! É um imóvel espetacular.', remetente: 'eu', horario: '20:10', lida: true,
        traducao: { en: 'Good evening Roberto! It is a spectacular property.', es: 'Buenas noches Roberto! Es un inmueble espectacular.' }
      },
      {
        id: 'm36', tipo: 'texto', conteudo: 'Qual o valor do condomínio?', remetente: 'contato', horario: '20:15', lida: true,
        traducao: { en: 'What is the condo fee?', es: 'Cuál es el valor del condominio?' }
      },
      {
        id: 'm37', tipo: 'texto', conteudo: 'O condomínio é R$ 1.800/mês, inclui academia e piscina.', remetente: 'eu', horario: '20:20', lida: true,
        traducao: { en: 'The condo fee is R$ 1,800/month, includes gym and pool.', es: 'El condominio es R$ 1.800/mes, incluye gimnasio y piscina.' }
      },
      {
        id: 'm38', tipo: 'texto', conteudo: 'Obrigado, vou pensar e retorno.', remetente: 'contato', horario: '20:30', lida: true,
        traducao: { en: 'Thank you, I will think about it and get back to you.', es: 'Gracias, voy a pensarlo y regreso.' }
      },
    ]
  },
  {
    id: '7',
    contato: 'Luciana Ferreira',
    avatar: '/avatares/woman/20.png',
    telefone: '(11) 94210-9876',
    naoLidas: 2,
    online: true,
    ultimaMensagem: 'Consegue um desconto no valor?',
    horarioUltimaMensagem: '14:05',
    mensagens: [
      {
        id: 'm39', tipo: 'texto', conteudo: 'Oi, estou procurando um apartamento de 2 quartos na zona sul.', remetente: 'contato', horario: '08:00', lida: true,
        traducao: { en: 'Hi, I am looking for a 2-bedroom apartment in the south zone.', es: 'Hola, estoy buscando un apartamento de 2 habitaciones en la zona sur.' }
      },
      {
        id: 'm40', tipo: 'texto', conteudo: 'Bom dia Luciana! Temos ótimas opções. Qual seu orçamento?', remetente: 'eu', horario: '08:15', lida: true,
        traducao: { en: 'Good morning Luciana! We have great options. What is your budget?', es: 'Buenos días Luciana! Tenemos excelentes opciones. Cuál es su presupuesto?' }
      },
      {
        id: 'm41', tipo: 'audio', conteudo: '', duracaoAudio: 40, remetente: 'contato', horario: '08:20', lida: true,
        transcricaoAudio: 'Meu orçamento é de até seiscentos mil reais. Preciso que tenha vaga de garagem e que seja próximo do metrô.',
        traducao: {
          en: 'My budget is up to six hundred thousand reais. I need it to have a parking spot and be close to the subway.',
          es: 'Mi presupuesto es de hasta seiscientos mil reales. Necesito que tenga plaza de garaje y que esté cerca del metro.'
        }
      },
      {
        id: 'm42', tipo: 'texto', conteudo: 'Tenho um apartamento perfeito no Itaim! R$ 650 mil.', remetente: 'eu', horario: '08:30', lida: true,
        traducao: { en: 'I have a perfect apartment in Itaim! R$ 650 thousand.', es: 'Tengo un apartamento perfecto en Itaim! R$ 650 mil.' }
      },
      {
        id: 'm43', tipo: 'texto', conteudo: 'Parece bom! Tem garagem?', remetente: 'contato', horario: '13:50', lida: true,
        traducao: { en: 'Looks good! Does it have a garage?', es: 'Parece bueno! Tiene garaje?' }
      },
      {
        id: 'm44', tipo: 'texto', conteudo: 'Sim, 2 vagas cobertas!', remetente: 'eu', horario: '13:55', lida: true,
        traducao: { en: 'Yes, 2 covered parking spots!', es: 'Sí, 2 plazas cubiertas!' }
      },
      {
        id: 'm45', tipo: 'texto', conteudo: 'Consegue um desconto no valor?', remetente: 'contato', horario: '14:05', lida: false,
        traducao: { en: 'Can you get a discount on the price?', es: 'Consigue un descuento en el valor?' }
      },
    ]
  }
]
