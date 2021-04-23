/* eslint-disable quote-props */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'The future of': 'The future of',
      'Authentication': 'Authentication',
      'Authorization': 'Authorization',
      'Payments': 'Payments',
      'Privacy': 'Privacy',
      'Identity': 'Identity',
      'subtitle': 'Signata, SATA, and the Identity Guard & Anonymity Framework.',
      'read the whitepaper': 'Read the whitepaper',
      'whitepaper url': 'sata-whitepaper-2021-03-24.pdf',
      'telegram url': 'https://t.me/satatoken',

      'Access and Authorization on the': 'Access and Authorization on the',
      'Blockchain': 'Blockchain',
      'Hardware Key Protection': 'Hardware Key Protection',
      'Use Signata to store': 'Use Signata to store and manage cryptocurrency keys within affordable hardware devices.',
      'Decentralized Identity': 'Decentralized Identity',
      'Authenticate and Authorize access': 'Authenticate and Authorize access to services privately and securely.',
      'Anonymous Payments': 'Anonymous Payments',
      'Authenticate and pay for services': 'Authenticate and pay for services, without giving up your personal information.',
      
      'Our Vision': 'Our Vision',
      'Identity and Access without': 'Identity and Access without the control of Big Tech.',
      'Our personal information is collected by': 'Our personal information is collected by the online services we interact with on a daily basis, bundled up and sold for marketing and advertising purposes, edging us closer to an Orwellian future.',
      'Governments try to combat this with legislation': 'Governments try to combat this with legislation, and privacy-focused products try to limit what information is shared to 3rd parties, but it still hasn\'t stymied the flow of continued collection, sale, and distribution of our Privacy.',
      'As for service providers': 'As for service providers, the legislative, administrative, and financial burden added from collecting personal and payment information and ensures that the build and release of systems takes longer, costs more, requires more engineering effort, and are exposed to more vectors of attack.',
      'Congruent Labs is developing the Identity': 'Congruent Labs is developing the Identity Guard & Anonymity Framework (IdGAF) in conjunction with the release of the SATA token as a means to wrestle back control of our identities from big tech.',
      'The IdGAF is a decentralized': 'The IdGAF is a decentralized, jurisdiction-free, and privacy-preserving solution to online identities, leveraging existing identity management protocols and bleeding-edge blockchain smart contract technology.',
      'IdGAF will provide a zero-trust': 'IdGAF will provide a zero-trust payment, authentication, and authorization solution to allow online platforms to greatly reduce the cost of compliance and payments management. These systems will operate as a common standard, implemented through a series of smart contracts and public off-chain systems.',
      
      'The Future Identity and Access Marketplace': 'The Future Identity and Access Marketplace',
      'Simplified Access Control': 'Simplified Access Control',
      'No more usernames, and no more passwords.': 'No more usernames, and no more passwords.',
      'DeREx': 'DeREx',
      'Use our Decentralized Rights Exchange for trusted identity brokerage.': 'Use our Decentralized Rights Exchange for trusted identity brokerage.',
      'DeX509': 'DeX509',
      'Get the power of Public Key Infrastructure without the expense.': 'Get the power of Public Key Infrastructure without the expense.',
      'Trusted Validation Oracles': 'Trusted Validation Oracles',
      'Prove your identity and still maintain your privacy.': 'Prove your identity and still maintain your privacy.',
      'Free and Open': 'Free and Open',
      'Open source smart contracts and off-chain services.': 'Open source smart contracts and off-chain services.',
      'Anonymous First': 'Anonymous First',
      'All systems will be default Anonymous. Only share what you want.': 'All systems will be default Anonymous. Only share what you want.',

      'SATA Token': 'SATA Token',
      'Blockchains have laid the foundations. Be a part of the true decentralized future.': 'Blockchains have laid the foundations. Be a part of the true decentralized future.',

      'Tokenomics': 'Tokenomics',
      'The SATA token is an Ethereum ERC-20 token, with a fixed supply of 100,000,000 tokens.': 'The SATA token is an Ethereum ERC-20 token, with a fixed supply of 100,000,000 tokens.',
      '40,000,000 SATA tokens are reserved by Congruent Labs for development & distribution to the market as needed to support project milestones.': '40,000,000 SATA tokens are reserved by Congruent Labs for development & distribution to the market as needed to support project milestones.',
      '10,000,000 tokens are reserved by Congruent Labs for enabling integration with partners, and for allocation to beta service users.': '10,000,000 tokens are reserved by Congruent Labs for enabling integration with partners, and for allocation to beta service users.',

      'Product Roadmap':'Product Roadmap',
      'Token Launch':'Token Launch',
      'Whitepaper Release':'Whitepaper Release',
      'Liqudity Distributed':'Liqudity Distributed',
      'First Marketplace Release':'First Marketplace Release',
      'Proof of Concept Launch':'Proof of Concept Launch',
      'DeX509 & DeREx First Releases':'DeX509 & DeREx First Releases',
      'Marketplace Adoption':'Marketplace Adoption',
      'Alternative Chain Integration':'Alternative Chain Integration',
      'Enterprise Integration':'Enterprise Integration',
      'Scaling Up':'Scaling Up',
      'More Integrations':'More Integrations',
      'Greater Product Adoption':'Greater Product Adoption',

      'The Project Team':'The Project Team',
    },
  },
  es: {
    translation: {
      'The future of': 'El futuro de la ',
      'Authentication': 'Autenticación',
      'Authorization': 'Autorización',
      'Payments': 'Los Pagos',
      'Privacy': 'Privacidad',
      'Identity': 'Identidad',
      'subtitle': 'Signata, SATA, y el Framework de Protección de la Identidad y la Anonimidad (IdGAF en inglés).',
      'read the whitepaper': 'Leer el whitepaper',
      'whitepaper url': 'sata-whitepaper-2021-04-23-es.pdf',
      'telegram url': 'https://t.me/sataespanol',

      'Access and Authorization on the': 'El acceso y la Autorización en el',
      'Blockchain': 'Blockchain',
      'Hardware Key Protection': 'Protección de las claves en hardware',
      'Use Signata to store': 'Utiliza Signata para guardar y manejar tus claves de las criptomonedas dentro de dispositivos de hardware asequibles.',
      'Decentralized Identity': 'La identidad descentralizada',
      'Authenticate and Authorize access': 'Autentica y Autoriza el acceso a servicios de manera privada y segura.',
      'Anonymous Payments': 'Los Pagos Anónimos',
      'Authenticate and pay for services': 'Autentica y paga por los servicios sin conceder tu información personal.',
      
      'Our Vision': 'Nuestra Visión',
      'Identity and Access without': 'La identidad y el Acceso sin el control del Big Tech.',
      'Our personal information is collected by': 'En todos los servicios en línea que utilizamos a diario, nuestra información personal se recopila, se organiza y se vende para fines comerciales de marketing y publicidad, lo que nos acerca cada vez más a un futuro orwelliano.',
      'Governments try to combat this with legislation': 'Los gobiernos tratan de combatir esto con la legislación, mientras los productos enfocados en la privacidad intentan limitar qué información se comparte con los terceros, pero de todos modos no han podido impedir el flujo de la recopilación, venta, y distribución constante de nuestra Privacidad.',
      'As for service providers': 'Al mismo tiempo, los proveedores de servicios deben lidiar con una carga legislativa, administrativa, y financiera adicional debido a la necesidad de recopilar toda la información personal y de pagos de sus usuarios, resultando en la construcción y lanzamiento de los sistemas que se demoran y cuestan más, además de requerir más esfuerzo de ingeniería, al igual que dejarlos expuestos a más vectores de ataque.',
      'Congruent Labs is developing the Identity': 'Por lo tanto, Congruent Labs está desarrollando el Framework de Protección de la Identidad y la Anonimidad – o el Identity Guard & Anonymity Framework (IdGAF) – junto con el lanzamiento del token SATA como una forma de recuperar el control de nuestras identidades de las manos del big tech.',
      'The IdGAF is a decentralized': 'El IdGAF es una solución descentralizada, sin jurisdicción, que preserva la privacidad de las identidades en línea, aprovechando de los protocoles existentes de manejo de identidad y la tecnología bleeding edge de los contratos inteligentes del blockchain.',
      'IdGAF will provide a zero-trust': 'El IdGAF proveerá una solución zero trust para los pagos, la autenticación, y la autorización para permitir que las plataformas en línea puedan reducir de manera considerable sus gastos generados por el manejo del cumplimiento y de los pagos. Estos sistemas operarán como un estándar común y serán implementados a través de una serie de contratos inteligentes y sistemas públicos off-chain.',

      'The Future Identity and Access Marketplace': 'El mercado de la Identidad y el Acceso del futuro',
      'Simplified Access Control': 'Control del Acceso Simplificado',
      'No more usernames, and no more passwords.': 'No más usuarios ni contraseñas.',
      'DeREx': 'DeREx',
      'Use our Decentralized Rights Exchange for trusted identity brokerage.': 'Utiliza nuestro Exchange de Derechos Descentralizado para una correduría de identidad fiable. ',
      'DeX509': 'DeX509',
      'Get the power of Public Key Infrastructure without the expense.': 'Saca el poder de la Public Key Infrastructure sin el costo. ',
      'Trusted Validation Oracles': 'Validaciones Oracle Confiables',
      'Prove your identity and still maintain your privacy.': 'Verifica tu identidad mientras mantienes tu privacidad.',
      'Free and Open': 'Gratis y Abierto',
      'Open source smart contracts and off-chain services.': 'Contratos inteligentes open source y servicios off-chain.',
      'Anonymous First': 'Anonimidad Primera',
      'All systems will be default Anonymous. Only share what you want.': 'Todos los sistemas tendrán el valor de Anónimo por defecto. Comparte únicamente lo que quieres.',

      'SATA Token': 'SATA Token',
      'Blockchains have laid the foundations. Be a part of the true decentralized future.': 'Los blockchains han puesto los cimientos. Sé parte de un futuro realmente descentralizado.',
   
      'Tokenomics': 'Tokenomics',
      'The SATA token is an Ethereum ERC-20 token, with a fixed supply of 100,000,000 tokens.': 'El token SATA es un token Ethereum ERC-20, con una reserva fija de 100,000,000 de tokens.',
      '40,000,000 SATA tokens are reserved by Congruent Labs for development & distribution to the market as needed to support project milestones.': 'Congruent Labs reserva 40,000,000 de tokens SATA para el desarrollo y para ser distribuidos al mercado según sea necesario, con el fin de apoyar a los objetivos del proyecto.',
      '10,000,000 tokens are reserved by Congruent Labs for enabling integration with partners, and for allocation to beta service users.': 'Además, Congruent Labs reserva 10,000,000 de tokens para la integración con los socios y la distribución entre los usuarios beta del servicio.',

      'Product Roadmap':'Hoja de Ruta del Proyecto',
      'Token Launch':'Lanzamiento del Token',
      'Whitepaper Release':'Publicación del Whitepaper',
      'Liqudity Distributed':'Distribución de la Liquidez',
      'First Marketplace Release':'Primer Lanzamiento en el Mercado',
      'Proof of Concept Launch':'Prueba de Concepto',
      'DeX509 & DeREx First Releases':'Primeros lanzamientos de DeX509 & DeREx ',
      'Marketplace Adoption':'Adopción del Mercado',
      'Alternative Chain Integration':'integración de los Chains Alternativas',
      'Enterprise Integration':'Integración con las Empresas Grandes y Gubernamentales',
      'Scaling Up':'Ampliación',
      'More Integrations':'Más integraciones',
      'Greater Product Adoption':'Mayor Adopción del Producto',

      'The Project Team':'Nuestro Equipo',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;