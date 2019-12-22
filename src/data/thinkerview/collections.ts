import { Item, ICollection } from '../types'
import keyBy from 'lodash.groupby'
import items from './items'


const itemsByCollection = keyBy(items, (x: Item) => x.collectionId)

const collections: ICollection[] = [
    {
        id: '1',
        slug: 'eric-denece-1',
        date: new Date('2019-09-11T12:00:00'),
        sectionId: '11',
        detail:
            '_La France en danger : où en est le renseignement ?_ - Les recommandations de lecture de Eric Dénécé dans un interview diffusé en direct le 11/09/2019, [lien de la vidéo](https://youtu.be/mx5QlspmmE8)',
        name: '**Eric Dénécé**',
        items: itemsByCollection['1'],
    },
    {
        id: '2',
        slug: 'vikash-dhorasoo-2',
        date: new Date('2019-09-05T12:00:00'),
        sectionId: '12',
        detail:
            '_Football : du pain, jeux et des magouilles ?_ des - Les recommandations de lecture de Vikash Dhorasoo dans un  Interview diffusé en direct le 5/09/2019,  [lien de la vidéo](https://youtu.be/_EFDjsMDlXU)',
        name: '**Vikash Dhorasoo**',
        items: itemsByCollection['2'],
    },
    {
        id: '3',
        slug: 'maxime-renahy-3',
        date: new Date('2019-09-03T12:00:00'),
        sectionId: '13',
        detail:
            "_DGSE : l'impuissance de l'état ?_ - Les recommandations de lecture de Maxime Renahy dans un interview diffusé en direct le 03/09/2019: [lien de la vidéo](https://youtu.be/Uj83ZmfT4Dw)",
        name: '**Maxime Renahy**',
        items: itemsByCollection['3'],
    },
    {
        id: '4',
        slug: 'frederic-pierucci-4',
        date: new Date('2019-07-08T12:00:00'),
        sectionId: '13',
        detail:
            '_Alstom : la France vendue à la découpe ?_ - Les recommandations de lecture de Frédéric Pierucci dans un interview diffusé en direct le 08/07/2019: [lien de la vidéo](https://youtu.be/dejeVuL9-7c)',
        name: '**Frédéric Pierucci**',
        items: itemsByCollection['4'],
    },
    {
        id: '5',
        slug: 'pierre-conesa-5',
        date: new Date('2019-07-02T12:00:00'),
        sectionId: '13',
        detail:
            '_Arabie , un pays protégé ?_ - Les recommandations de lecture de Pierre Conesa dans un interview diffusé en direct le 02/07/2019: [lien de la vidéo](https://youtu.be/5TbbV06LlP0)',
        name: '**Pierre Conesa**',
        items: itemsByCollection['5'],
    },
    {
        id: '6',
        slug: 'laurent-alexandre-et-philippe-bihouix-6',
        date: new Date('2019-06-25T12:00:00'),
        sectionId: '14',
        detail:
            "_Débat : L'avenir de l'humanité ?_  - Les recommandations de lecture de Laurent Alexandre et Philippe Bihouix dans un interview diffusé en direct le 25/06/2019: [lien de la vidéo](https://youtu.be/9iuBVin9oOk)",
        name: '**Laurent Alexandre et Philippe Bihouix**',
        items: itemsByCollection['6'],
    },
    {
        id: '7',
        slug: 'jean-ziegler-7',
        date: new Date('2019-06-14T12:00:00'),
        sectionId: '12',
        detail:
            '_Pourquoi il  faut détruire le capitalisme ?_ - Les recommandations de lecture de Jean Ziegler dans un interview diffusé en direct le 14/06/2019: [lien de la vidéo](https://youtu.be/sIJd1kuR2Ps)',
        name: '**Jean Ziegler**',
        items: itemsByCollection['7'],
    },
    {
        id: '8',
        slug: 'monique-pinconcharlot-8',
        date: new Date('2019-06-04T12:00:00'),
        sectionId: '11',
        detail:
            '_Casse sociale, le début ?_ - Les recommandations de lecture de Monique Pinçon-Charlot dans un  Interview diffusé en direct le 04/06/2019: [lien de la vidéo](https://youtu.be/DnHUyRfY3Wc)',
        name: '**Monique Pinçon-Charlot**',
        items: itemsByCollection['8'],
    },
    {
        id: '9',
        slug: 'barbara-stiegler-9',
        date: new Date('2019-05-17T12:00:00'),
        sectionId: '12',
        detail:
            "_S'adapter à une société malade ?_ - Les recommandations de lecture de Barbara Stiegler dans un interview diffusé en direct le 17/05/2019: [lien de la vidéo](https://youtu.be/uSSFmNHgJQQ)",
        name: '**Barbara Stiegler**',
        items: itemsByCollection['9'],
    },
    {
        id: '10',
        slug: 'coralie-delaume-10',
        date: new Date('2019-05-10T12:00:00'),
        sectionId: '12',
        detail:
            '_Union Européenne pour ou contre ?_ - Les recommandations de lecture de Coralie Delaume dans un interview diffusé en direct le 10/05/2019: [lien de la vidéo](https://youtu.be/M5_v9ld_LVc)',
        name: '**Coralie Delaume**',
        items: itemsByCollection['10'],
    },
    {
        id: '11',
        slug: 'jeanluc-melenchon-11',
        date: new Date('2019-05-06T12:00:00'),
        sectionId: '12',
        detail:
            '_Face à la réalité ?_ - Les recommandations de lecture de Jean-Luc Mélenchon dans un interview diffusé en direct le 06/05/2019: [lien de la vidéo](https://youtu.be/9y3aC0LruiQ)',
        name: '**Jean-Luc Mélenchon**',
        items: itemsByCollection['11'],
    },
    {
        id: '12',
        slug: 'bernard-stiegler-12',
        date: new Date('2019-04-17T12:00:00'),
        sectionId: '12',
        detail:
            "_Etat d'urgence géopolitique, Médias, Gilets Jaunes_ - Les recommandations de lecture de Bernard Stiegler dans un interview diffusé en direct le 17/04/2019: [lien de la vidéo](https://youtu.be/qYCfx2xFMjE)",
        name: '**Bernard Stiegler**',
        items: itemsByCollection['12'],
    },
    {
        id: '13',
        slug: 'champagne,-duplessy-et-fontaine-13',
        date: new Date('2019-04-12T12:00:00'),
        sectionId: '12',
        detail:
            '_Investigation sans filtre ?_ - Les recommandations de lecture de Champagne, Duplessy et Fontaine dans un interview diffusé en direct le 12/04/2019: [lien de la vidéo](https://youtu.be/XK2dsgJWqgk)',
        name: '**Champagne, Duplessy et Fontaine**',
        items: itemsByCollection['13'],
    },
    {
        id: '14',
        slug: 'alain-damasio-14',
        date: new Date('2019-04-11T12:00:00'),
        sectionId: '12',
        detail:
            "_L'intuition de la science-fiction ?_ - Les recommandations de lecture d'Alain Damasio dans un interview diffusé en direct le 11/04/2019: [lien de la vidéo](https://youtu.be/a7KapmsJQOE)",
        name: '**Alain Damasio**',
        items: itemsByCollection['14'],
    },
    {
        id: '15',
        slug: 'yannick-rousselet-15',
        date: new Date('2018-09-19T12:00:00'),
        sectionId: '14',
        detail:
            '_Greenpeace : menaces nucléaire ?_ - Les recommandations de lecture de Yannick Rousselet dans un Interview diffusé en direct le 19/09/2018: [lien de la vidéo](https://youtu.be/a7KapmsJQOE)',
        name: '**Yannick Rousselet**',
        items: itemsByCollection['15'],
    },
    {
        id: '1d',
        slug: 'edgar-morin-1d',
        date: new Date('2018-09-19T12:00:00'),
        sectionId: '12',
        detail:
            "_L'effondrement ?_ - Les recommandations de lecture de Edgar Morin dans un interview diffusé en direct le 19/09/2018: [lien de la vidéo](https://www.youtube.com/watch?v=jiyMlZauB8c)",
        name: '**Edgar Morin**',
        items: itemsByCollection['16'],
    },
    {
        id: '17',
        slug: 'caroline-galacteros-17',
        date: new Date('2019-03-27T12:00:00'),
        sectionId: '13',
        detail:
            '_Géopolitique : cynisme et bons sentiments ?_ - Les recommandations de lecture de Caroline Galacteros dans un interview diffusé en direct le 27/03/2019: [lien de la vidéo](https://youtu.be/9QePE_pAP9I)',
        name: '**Caroline Galacteros**',
        items: itemsByCollection['17'],
    },
    {
        id: '18',
        slug: 'gael-giraud-18',
        date: new Date('2019-03-20T12:00:00'),
        sectionId: '14',
        detail:
            '_Tsunami financier, désastre humanitaire ?_ - Les recommandations de lecture de Gaël Giraud dans un interview diffusé en direct le 20/03/2019: [lien de la vidéo](https://youtu.be/2oFARgqG0NA)',
        name: '**Gaël Giraud**',
        items: itemsByCollection['18'],
    },
    {
        id: '19',
        slug: 'noam-anouar-19',
        date: new Date('2019-03-20T12:00:00'),
        sectionId: '15',
        detail:
            '_Lucidité face aux terrorismes ?_ - Les recommandations de lecture de Noam Anouar dans un interview diffusé en direct le 20/03/2019: [lien de la vidéo](https://www.youtube.com/watch?v=lNS7tA7Nhkw)',
        name: '**Noam Anouar**',
        items: itemsByCollection['19'],
    },
    {
        id: '20',
        slug: 'francois-boulot-20',
        date: new Date('2019-02-25T12:00:00'),
        sectionId: '12',
        detail:
            '_Gilets Jaunes : Avant la révolution_ - Les recommandations de lecture de François Boulot dans un interview diffusé en direct le 25/02/2019: [lien de la vidéo](https://www.youtube.com/watch?v=tRl9_q2ytI8)',
        name: '**François Boulot**',
        items: itemsByCollection['20'],
    },
    {
        id: '21',
        slug: 'francis-dupuisderi-21',
        date: new Date('2019-02-25T12:00:00'),
        sectionId: '12',
        detail:
            '_Démocratie : Marketing politique pour les pauvres?_ - Les recommandations de lecture de Francis Dupuis-Déri dans un interview diffusé en direct le 25/02/2019: [lien de la vidéo](https://youtu.be/a7KapmsJQOE)',
        name: '**Francis Dupuis-Déri**',
        items: itemsByCollection['21'],
    },
    {
        id: '1a',
        slug: '22-1a',
        date: new Date('2019-02-18T12:00:00'),
        sectionId: '12',
        detail:
            '_ Gilets Jaunes, Populisme, Bourgeois ?_ - Les recommandations de lecture de François Bégaudeau dans un interview diffusé en direct le 18/02/2019: [lien de la vidéo](https://www.youtube.com/watch?v=GPfXLUThC6M)',
        name: '**François Bégaudeau**',
        items: itemsByCollection['22'],
    },
    {
        id: '1b',
        slug: '23-1b',
        date: new Date('2019-02-12T12:00:00'),
        sectionId: '14',
        detail:
            '_ Croissance et Effondrement_ - Les recommandations de lecture de Jean-Marc Jancovici et Philippe Bihouix dans un interview diffusé en direct le 12/02/2019: [lien de la vidéo](https://www.youtube.com/watch?v=NQkjhugvekI)',
        name: '**Jean-Marc Jancovici et Philippe Bihouix**',
        items: itemsByCollection['23'],
    },
    {
        id: '24',
        slug: 'khalid-essa-24',
        date: new Date('2019-02-18T12:00:00'),
        sectionId: '12',
        detail:
            '_Taxi un métier en danger ?_ - Les recommandations de lecture de Khalid Essa dans un interview diffusé en direct le 18/02/2019: [lien de la vidéo](https://www.youtube.com/watch?v=bWlDm9BuB-s)',
        name: '**Khalid Essa**',
        items: itemsByCollection['24'],
    },
    {
        id: '25',
        slug: 'yanis-varoufakis-25',
        date: new Date('2019-02-18T12:00:00'),
        sectionId: '11',
        detail:
            "_la fin de l'Europe et de l'Euro ?_ - Les recommandations de lecture de Yánis Varoufákis dans un interview diffusé en direct le 18/02/2019: [lien de la vidéo](https://www.youtube.com/watch?v=hbnzQtLS4T8)",
        name: '**Yánis Varoufákis**',
        items: itemsByCollection['25'],
    },
    {
        id: '26',
        slug: 'denis-robert-26',
        date: new Date('2019-01-17T12:00:00'),
        sectionId: '12',
        detail:
            '_Les milliardaires gavés au sang des gilets jaunes ?_ - Les recommandations de lecture de Denis Robert dans un interview diffusé en direct le 17/01/2019: [lien de la vidéo](https://www.youtube.com/watch?v=e5vAzJpyvCI)',
        name: '**Denis Robert**',
        items: itemsByCollection['26'],
    },
    {
        id: '27',
        slug: 'aleksei-pouchkov-27',
        date: new Date('2018-12-18T12:00:00'),
        sectionId: '13',
        detail:
            "_Futur de l'ordre mondial, la menace russe ?_ - Les recommandations de lecture de Alekseï Pouchkov dans un interview diffusé en direct le 18/12/2018: [lien de la vidéo](https://www.youtube.com/watch?v=iVEdbIb1xQw)",
        name: '**Alekseï Pouchkov**',
        items: itemsByCollection['27'],
    },
    {
        id: '28',
        slug: 'jeanchristophe-picard-28',
        date: new Date('2018-12-10T12:00:00'),
        sectionId: '12',
        detail:
            '_Corruption : Maladie de la France ? Anticor sans filtre_ - Les recommandations de lecture de Jean-Christophe Picard dans un interview diffusé en direct le 10/12/2018: [lien de la vidéo](youtube.com/watch?v=fz-yQJmmoG8)',
        name: '**Jean-Christophe Picard**',
        items: itemsByCollection['28'],
    },
    {
        id: '29',
        slug: 'jeremy-ferrari-29',
        date: new Date('2018-11-27T12:00:00'),
        sectionId: '12',
        detail:
            "_La révolte par l'humour ?_ - Les recommandations de lecture de Jérémy Ferrari dans un interview diffusé en direct le 27/11/2018: [lien de la vidéo](https://www.youtube.com/watch?v=I6zzV4b3nDU)",
        name: '**Jérémy Ferrari**',
        items: itemsByCollection['29'],
    },
    {
        id: '30',
        slug: 'kemi-seba-30',
        date: new Date('2018-11-21T12:00:00'),
        sectionId: '13',
        detail:
            '_Panafricanisme 2.0 ?_ - Les recommandations de lecture de Kémi Séba dans un interview diffusé en direct le 21/11/2018: [lien de la vidéo](https://www.youtube.com/watch?v=TQPjPeeP9dI)',
        name: '**Kémi Séba**',
        items: itemsByCollection['30'],
    },
    {
        id: '31',
        slug: 'daniel-schneidermann-31',
        date: new Date('2018-11-12T12:00:00'),
        sectionId: '16',
        detail:
            '_Autopsie du Journalisme de Hitler à Trump_ - Les recommandations de lecture de Daniel Schneidermann dans un interview diffusé en direct le 12/11/2018: [lien de la vidéo](https://www.youtube.com/watch?v=Iy5HMGIFpSI)',
        name: '**Daniel Schneidermann**',
        items: itemsByCollection['31'],
    },
    {
        id: '32',
        slug: '32-32',
        date: new Date('2018-11-08T12:00:00'),
        sectionId: '17',
        detail:
            "_L'asservissement par l'Intelligence Artificielle ?_ Les recommendations de lecture d'Eric Sadin dans un interview diffusé en direct le 08/11/2018: [lien de la vidéo](https://www.youtube.com/watch?v=VzeOnBRzDik)",
        name: '**Éric Sadin**',
        items: itemsByCollection['32'],
    },
    {
        id: '33',
        slug: 'emmanuel-todd-33',
        date: new Date('2018-11-07T12:00:00'),
        sectionId: '12',
        detail:
            '_Trahison des élites françaises ?_ - Les recommandations de lecture de Emmanuel Todd dans un interview diffusé en direct le 07/11/2018: [lien de la vidéo](https://www.youtube.com/watch?v=6adEOQR3ea4)',
        name: '**Emmanuel Todd**',
        items: itemsByCollection['33'],
    },
    {
        id: '34',
        slug: 'jeremie-zimmermann-34',
        date: new Date('2018-10-18T12:00:00'),
        sectionId: '17',
        detail:
            "_1984, un manuel d'instructions ?_ - Les recommandations de lecture de Jérémie Zimmermann dans un interview diffusé en direct le 18/10/2018: [lien de la vidéo](https://www.youtube.com/watch?v=Xmy3_QIGOe4)",
        name: '**Jérémie Zimmermann**',
        items: itemsByCollection['34'],
    },
    {
        id: '35',
        slug: 'tancrede-ramonet-35',
        date: new Date('2018-10-02T12:00:00'),
        sectionId: '12',
        detail:
            '_Anarchie VS Capitalisme ?_ - Les recommandations de lecture de Tancrède Ramonet dans un interview diffusé en direct le 02/10/2018: [lien de la vidéo](https://www.youtube.com/watch?v=E7vscTxD308)',
        name: '**Tancrède Ramonet**',
        items: itemsByCollection['36'],
    },
    {
        id: '36',
        slug: 'isabelle-attard-36',
        date: new Date('2018-09-21T12:00:00'),
        sectionId: '14',
        detail:
            '_Ex-députée écolo : sans langue de bois ?_ - Les recommandations de lecture de Isabelle Attard dans un interview diffusé en direct le 21/09/2018: [lien de la vidéo](https://www.youtube.com/watch?v=lMJbD7Yjfuc)',
        name: '**Isabelle Attard**',
        items: itemsByCollection['36'],
    },
    {
        id: '99',
        slug: 'carbon-de-seze-99',
        date: new Date('2018-11-30T12:00:00'),
        sectionId: '12',
        detail:
            '_Une Justice sous Macron ?_ - Les recommandations de lecture de Carbon de Seze dans un interview diffusé en direct le 30/11/2018: [lien de la vidéo](https://www.youtube.com/watch?v=oEG7QQKZ3jQ)',
        name: '**Carbon de Seze**',
        items: itemsByCollection['99'],
    },
    {
        id: '100',
        slug: 'vincent-cespedes-100',
        date: new Date('2019-01-22T12:00:00'),
        sectionId: '12',
        detail:
            '_Gilets Jaunes : Comprendre la violence ?_ - Les recommandations de lecture de Vincent Cespedes dans un interview diffusé en direct le 22/01/2019',
        name: '**Vincent Cespedes**',
        items: itemsByCollection['100'],
    },
    {
        id: '101',
        slug: 'general-vincent-desportes-101',
        date: new Date('2018-11-18T12:00:00'),
        sectionId: '13',
        detail:
            '_Armée française : Quelle stratégie ?_ - Les recommendations de lecture du Général Vincent Desportes dans un interview diffusé en direct le 18/11/2018',
        name: '**Général Vincent Desportes**',
        items: itemsByCollection['101'],
    },
    {
        id: '102',
        slug: 'olivier-marleix-102',
        date: new Date('2019-09-17T12:00:00'),
        sectionId: '13',
        detail:
            '_Guerre économique sans pitié pour la France ?_ - Les recommandations de lecture de Olivier Marleix dans un interview diffusé en direct le 17/09/2019: [lien de la vidéo](https://youtu.be/2mor2qort4U)',
        name: '**Olivier Marleix**',
        items: itemsByCollection['102'],
    },
    {
        id: '103',
        slug: 'inconnu-103',
        date: new Date('2019-09-20T12:00:00'),
        sectionId: '13',
        detail:
            '_DGSE - Face à la réalité ?_ - Les recommandations de lecture de Inconnu dans un interview diffusé en direct le 20/09/2019: [lien de la vidéo](https://youtu.be/_GONFUveBH0)',
        name: '**Inconnu**',
        items: itemsByCollection['103'],
    },
    {
        id: '104',
        slug: 'joseph-stiglitz-104',
        date: new Date('2019-09-25T12:00:00'),
        sectionId: '11',
        detail:
            '_Un prix Nobel face au krach à venir ?_ - Les recommandations de lecture de Joseph Stiglitz dans un interview diffusé en direct le 25/09/2019: [lien de la vidéo](https://youtu.be/-J_2tNIA4cI)',
        name: '**Joseph Stiglitz**',
        items: itemsByCollection['104'],
    },
    {
        id: '105',
        slug: 'jouzel-and-larrouturou-105',
        date: new Date('2019-09-27T12:00:00'),
        sectionId: '14',
        detail:
            '_Le climat survivra-t-il au capitalisme ?_ - Les recommandations de lecture de Jouzel & Larrouturou dans un interview diffusé en direct le 27/09/2019: [lien de la vidéo](https://youtu.be/tUml_4KZKhk)',
        name: '**Jouzel & Larrouturou**',
        items: itemsByCollection['105'],
    },
    {
        id: '106',
        slug: 'christophe-nijdam-and-jerome-cazes-106',
        date: new Date('2019-10-10T12:00:00'),
        sectionId: '11',
        detail:
            "_L'explosion des banques ?_ - Les recommandations de lecture de Christophe Nijdam & Jérôme Cazes dans un interview diffusé en direct le 10/10/2019: [lien de la vidéo](https://www.youtube.com/watch?v=5WHg49trJCw)",
        name: '**Christophe Nijdam & Jérôme Cazes**',
        items: itemsByCollection['106'],
    },
    {
        id: '107',
        slug: 'bruno-gaccio-107',
        date: new Date('2019-10-16T12:00:00'),
        sectionId: '16',
        detail:
            '_ Médias, les nouveaux Guignols ?_ - Les recommandations de lecture de Bruno Gaccio dans un interview diffusé en direct le 16/10/2019: [lien de la vidéo](https://www.youtube.com/watch?v=TFk_w_N2xXM)',
        name: '**Bruno Gaccio**',
        items: itemsByCollection['107'],
    },
    {
        id: 'gillesbabinet',
        slug: 'gillesbabinet-gillesbabinet',
        date: new Date('2019-11-14T12:00:00'),
        sectionId: '16',
        detail:
            '_ Camisole numérique pour votre bien ?_ - Les recommandations de lecture de Gilles Babinet dans un interview diffusé en direct le 14/11/2019: [lien de la vidéo](https://www.youtube.com/watch?v=V4yf3HOEHPk)',
        name: '**Gilles Babinet**',
        items: [
            {
                title:
                    'The Rise and Fall of the Great Powers: Economic Change and Military Conflict from 1500 to 2000',
                author: 'Paul Kennedy',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/51%2BX4jxZGZL._SX322_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Rise-Fall-Great-Powers/dp/0679720197/ref=sr_1_1',
                type: 'book',
            },
            {
                title: "La formation de l'esprit scientifique",
                author: 'Gaston Bachelard',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/51lgmcz0mjL._SX309_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/formation-lesprit-scientifique-Gaston-Bachelard/dp/2711611507',
                type: 'book',
            },
        ],
    },
    {
        id: 'christophebrusset',
        slug: 'christophebrusset-christophebrusset',
        date: new Date('2019-11-07T12:00:00'),
        sectionId: '12',
        detail:
            '_ L’agroalimentaire vu de l’intérieur, intoxication ?_ - Les recommandations de lecture de Christophe Brusset dans un interview diffusé en direct le 07/11/2019: [lien de la vidéo](https://youtu.be/lXXp-PVQ0HQ)',
        name: '**Christophe Brusset**',
        items: [
            {
                title:
                    "Trilogie «Jacques Vingtras» L'Enfant, Le Bachelier, L'Insurgé",
                author: 'Jules Vallès',
                note: '',
                imageUrl:
                    'https://images-eu.ssl-images-amazon.com/images/I/51A%2Blw531jL.jpg',
                productUrl:
                    'https://www.amazon.fr/Trilogie-%C2%ABJacques-Vingtras%C2%BB-Bachelier-Int%C3%A9grale-ebook/dp/B01JT0FAZ6',
                type: 'book',
            },
            {
                title: "Mémoires de guerre et mémoires d'espoir",
                author: 'Charles de GAULLE',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/51%2BX4jxZGZL._SX322_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/M%C3%A9moires-guerre-m%C3%A9moires-despoir-Charles/dp/2259249361',
                type: 'book',
            },
            {
                title: "Tribulations d'un précaire",
                author: 'Iain Levison',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/41XvzZaaxHL._SX331_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Tribulations-dun-pr%C3%A9caire-Iain-Levison/dp/2867468086',
                type: 'book',
            },
        ],
    },
    {
        id: 'agnes-levallois-et-pierreconesa',
        slug: 'agnes-levallois-et-pierreconesa-agnes',
        date: new Date('2019-11-16T12:00:00'),
        sectionId: '13',
        detail:
            '_ Clientélisme politique et Moyen-Orient _ - Les recommandations de lecture de Agnès Levallois et Pierre Conesa dans un interview diffusé en direct le 24/10/2019: [lien de la vidéo](https://youtu.be/MdtxJxaF_0w)',
        name: '**Agnès Levallois et Pierre Conesa**',
        items: [
            {
                title: 'Atlas du Moyen-Orient : Aux racines de la violence',
                author: 'Claire Levasseur',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/61%2BXxIM5TxL._SX343_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Atlas-Moyen-Orient-Pierre-Blanc-Jean/dp/2746751208',
                type: 'book',
            },
            {
                title: "J'ai couru vers le Nil ",
                author: 'Alaa El Aswany',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/51NVJfHGYoL._SX301_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Jai-couru-vers-Alaa-Aswany/dp/2330109040',
                type: 'book',
            },
            {
                title: "Syrie, l'Etat de barbarie",
                author: 'Michel Seurat',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/51BqGiQHQPL._SX346_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Syrie-lEtat-barbarie-Michel-Seurat/dp/2130607039',
                type: 'book',
            },
            {
                title: 'Au coeur des services spéciaux',
                author: 'Alain Chouet',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/41ZdSg0IkpL._SX326_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/coeur-services-sp%C3%A9ciaux-Jean-GUISNEL/dp/2707175374',
                type: 'book',
            },
            {
                title: "La Fabrication de l'ennemi",
                author: 'Pierre Conesa',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/41hE3rCJKUL._SX308_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Fabrication-lennemi-Pierre-CONESA/dp/2221126785',
                type: 'book',
            },
            {
                title: "Le Califat, histoire politique de l'Islam ",
                author: 'Nabil Mouline',
                note: '',
                imageUrl:
                    'https://images-na.ssl-images-amazon.com/images/I/41982tYdEcL._SX302_BO1,204,203,200_.jpg',
                productUrl:
                    'https://www.amazon.fr/Califat-histoire-politique-lIslam/dp/2081375869',
                type: 'book',
            },
        ],
    },
]

export default collections
