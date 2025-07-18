export interface Image {
  id: number;
  path: string;
  thumbnail: string | null;
  title: string;
  orientation: 'landscape' | 'portrait' | 'square';
}

export interface Build {
  id: number;
  displayDate: string;
  startedDate: string;
  cpu: string;
  cool: string | null;
  mobo: string;
  ram: string;
  hdd: string[] | null;
  ssd: string[] | null;
  gpu: string;
  case: string;
  psu: string;
  image?: Image;
}

export interface Project {
  id: number;
  title: string;
  webUrl: string | null;
  codeUrl: string;
  displayDate: string;
  startedDate: string;
  languages: string[];
  info: string;
  role: string;
  status: string;
  images: (Image | undefined)[];
}

const _images: Image[] = [
  {
    id: 1,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/builds/mattBuild-oPfJtOMDViuKhzCJPBhWFfzG3RzEBt.jpg',
    thumbnail: null,
    title: "Matt's Computer",
    orientation: 'landscape',
  },
  {
    id: 2,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/builds/myBuild2013-4Zz58ZB6jegugK8yHHCOz7iyzzglNn.jpg',
    thumbnail: null,
    title: 'My Computer 2013',
    orientation: 'portrait',
  },
  {
    id: 3,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/builds/markBuild-1yJRoeIUbNlnPlh9TCNsEc0DlkKHCM.jpg',
    thumbnail: null,
    title: "Mark's Computer",
    orientation: 'portrait',
  },
  {
    id: 4,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/builds/myBuild2016_liquid-rlI2Xa5qIYbihVhw683Or97LsUpgYQ.jpg',
    thumbnail: null,
    title: 'My Computer 2016',
    orientation: 'portrait',
  },
  {
    id: 5,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/builds/jamesBuild-4Ji6MXmYps7IsR31G9J862BZJlo6lP.jpg',
    thumbnail: null,
    title: "James's computer",
    orientation: 'portrait',
  },
  {
    id: 6,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/genomic/genomic-QhUKk4LNs0K7fpa6NSU0Nxq8FKZ4Ac.png',
    thumbnail: null,
    title: 'Genomic Solutions Now! Software',
    orientation: 'landscape',
  },
  {
    id: 7,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pinelands/pinelands_landing-G6YsnlTzI9DB4e7l3BBStPZ8CHGiem.jpg',
    thumbnail: null,
    title: 'Pinelands landing page',
    orientation: 'landscape',
  },
  {
    id: 8,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pinelands/pinelands_tour-6dWa8H1aUKEx0ReqvZkWpLUbIR5vwd.jpg',
    thumbnail: null,
    title: 'Pinelands tour page',
    orientation: 'square',
  },
  {
    id: 9,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pinelands/pinelands_contact-1uwmRnMysZAeWZRf7JdnzyT8GhQwib.jpg',
    thumbnail: null,
    title: 'Pinelands contact page',
    orientation: 'square',
  },
  {
    id: 10,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/ttt/ttt_land-wiBqdSMPmWfHiMaFXxfgXhHpvgyfRO.png',
    thumbnail: null,
    title: 'Tic Tac Toe Landscape',
    orientation: 'landscape',
  },
  {
    id: 11,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/ttt/ttt_port-eBj3xvFwA6l9HxTRKOVVVJGy0PAMA4.png',
    thumbnail: null,
    title: 'Tic Tac Toe Portrait',
    orientation: 'portrait',
  },
  {
    id: 12,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/lol_playerdata/loldata_landing-4b8I27whh4kA9E46xbkBAT3gf2aPnZ.png',
    thumbnail: null,
    title: 'LoL player data landing page',
    orientation: 'landscape',
  },
  {
    id: 13,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/lol_playerdata/loldata-tCKUYr9CZxZwkqFotXlPKyHoRXCzaB.png',
    thumbnail: null,
    title: 'LoL player data results',
    orientation: 'square',
  },
  {
    id: 14,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/lol_playerdata/loldata_small-vwGPh3Se9Dky6fzC6kfjwjMaV48oVo.png',
    thumbnail: null,
    title: 'LoL player data results optimized for mobile',
    orientation: 'portrait',
  },
  {
    id: 15,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pca/scoresPlot-T8TXqegqUyc8atLHdp1wvwZlMGP0RD.png',
    thumbnail: null,
    title: 'A scores plot generated from calculated principal components',
    orientation: 'landscape',
  },
  {
    id: 16,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pca/scoresData-JdmrDQIaYj2uNhidpdxVt9bKF1cSgR.png',
    thumbnail: null,
    title: 'The calculated principal component data',
    orientation: 'square',
  },
  {
    id: 17,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pca/addinBar-wRshmb6qvIRkf4j0RRmk9f5A1nMoL0.PNG',
    thumbnail: null,
    title: 'The Excel add-in bar used to add scores and loadings plots',
    orientation: 'landscape',
  },
  {
    id: 18,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/pca/scoresInput-full-mn7Ud9ox1kXmLCr7tpQliImBfE1T6U.png',
    thumbnail: null,
    title:
      'Input form that is dynamically populated based on the number of principal components',
    orientation: 'portrait',
  },
  {
    id: 19,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/bms/bms_rawData-1K0xEAu1sCgwxpbOCE5f3ArmO3uOAN.png',
    thumbnail: null,
    title: 'The raw data taken from the lab to be processed',
    orientation: 'landscape',
  },
  {
    id: 20,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/bms/bms_formatForm-Vd4a3KQHDMSiO9tcSoFCLAP02rrUdJ.png',
    thumbnail: null,
    title: 'Input form used to select the worksheet to be processed',
    orientation: 'square',
  },
  {
    id: 21,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/bms/bms_formattedData-e8MuyZLTqnAmDLvoM3VQY0GmlyrCg8.png',
    thumbnail: null,
    title: 'The entire formatted data set',
    orientation: 'square',
  },
  {
    id: 22,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/bms/bms_finalData-CVcHaLaPoAJE3qC9aP3hs9cJ47TApg.png',
    thumbnail: null,
    title: 'A further refined formatted data set used for plotting',
    orientation: 'square',
  },
  {
    id: 23,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/bms/bms_graphForm-cRVKMYzdrTCgEbLvIdpKNVPaBt8k8m.png',
    thumbnail: null,
    title: 'Input form used to select the variables to be plotted',
    orientation: 'square',
  },
  {
    id: 24,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/bms/bms_plot-V5NVrKbqQ2ZQc0WBMVOKotwM6rjr3A.png',
    thumbnail: null,
    title: 'The final plot',
    orientation: 'square',
  },
  {
    id: 25,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/lol_status/gui-OQmnNdfCXexZLB1KSUzhWudYMIPGQm.png',
    thumbnail: null,
    title:
      'The Java GUI that displays the current status of services in a specified region',
    orientation: 'square',
  },
  {
    id: 26,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/lol_status/polling-p2gJ98L6bHxGGHrJhmb4yB3zQc7cUB.png',
    thumbnail: null,
    title: 'Input form that allows users to specify how often the GUI updates',
    orientation: 'square',
  },
  {
    id: 27,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/projects/lol_status/tray-pLalF64qBUiBKyBf8Tc4DLoIDhBwAs.png',
    thumbnail: null,
    title: 'Notification area functionality',
    orientation: 'square',
  },
  {
    id: 28,
    path: 'https://raw.githubusercontent.com/chrismeyers/pleasehold/master/examples/pleasehold.gif',
    thumbnail:
      'https://raw.githubusercontent.com/chrismeyers/pleasehold/master/examples/pleasehold-thumbnail.png',
    title: 'Demo of pleasehold',
    orientation: 'landscape',
  },
  {
    id: 29,
    path: 'https://c0dok9ur2fyehfvp.public.blob.vercel-storage.com/builds/myBuild2021-Uqzd0f4K7rFa9LOFMJjdEL3ZWMikqC.jpg',
    thumbnail: null,
    title: 'My Computer 2021',
    orientation: 'portrait',
  },
  {
    id: 30,
    path: 'https://raw.githubusercontent.com/chrismeyers/spotify-cli/main/vhs/demo.gif',
    thumbnail:
      'https://raw.githubusercontent.com/chrismeyers/spotify-cli/main/vhs/thumbnail.png',
    title: 'Demo of spotify-cli',
    orientation: 'landscape',
  },
];

export const images = new Map(_images.map((image) => [image.id, image]));

const _builds: Build[] = [
  {
    id: 1,
    displayDate: 'March 2012 - Built for my brother, Matt',
    startedDate: '2012-03-01T00:00:00.000Z',
    cpu: 'AMD 6-core FX-6100 @ 3.3GHz',
    cool: null,
    mobo: 'Gigabyte 990FXA-UD3',
    ram: '8GB G.SKILL Ripjaws Series 1600MHz',
    hdd: ['Western Digital Blue 500GB @ 7200rpm'],
    ssd: null,
    gpu: 'XFX Radeon 6870 1GB',
    case: 'NZXT Phantom Full-Tower',
    psu: 'Corsair TX750 80 Plus Bronze',
    image: images.get(1),
  },
  {
    id: 2,
    displayDate: 'February 2013 - Built for myself',
    startedDate: '2013-02-01T00:00:00.000Z',
    cpu: 'Intel Core i7 3770K @ 4.2GHz',
    cool: 'Cooler Master Hyper 212 Plus',
    mobo: 'Asus P8Z77-V LK',
    ram: '16GB Corsair Vengeance 1600MHz',
    hdd: [
      'Seagate BarraCuda 1TB @ 7200rpm',
      'Western Digital Blue 640GB @ 7200rpm',
    ],
    ssd: ['Samsung 850 Pro 256GB'],
    gpu: 'EVGA GeForce GTX 670 FTW 2GB',
    case: 'Rosewill Blackhawk Mid-Tower',
    psu: 'Corsair HX750 80 Plus Gold',
    image: images.get(2),
  },
  {
    id: 3,
    displayDate: 'September 2013 - Built for my Neighbor, Mark',
    startedDate: '2013-09-01T00:00:00.000Z',
    cpu: 'Intel Core i7 4770K @ 3.5GHz',
    cool: 'Cooler Master Hyper 212 EVO',
    mobo: 'MSI H87-G43',
    ram: '16GB G.SKILL Ripjaws X Series 1600MHz',
    hdd: ['Seagate BarraCuda 1TB @ 7200rpm'],
    ssd: ['Kingston HyperX 3K 120GB'],
    gpu: 'EVGA GeForce GTX 770 SuperClocked 2GB',
    case: 'Cooler Master HAF 932 Advanced Full-Tower',
    psu: 'Corsair HX750 80 Plus Gold',
    image: images.get(3),
  },
  {
    id: 4,
    displayDate: 'February 2016 - Built for myself',
    startedDate: '2016-02-01T00:00:00.000Z',
    cpu: 'Intel Core i7 6700K @ 4.6GHz',
    cool: 'Corsair H100i v2 w/ Noctua NF-F12 120mm PWM Fans',
    mobo: 'Asus ROG Maximus VIII Hero Alpha',
    ram: '32GB HyperX Fury 2666MHz',
    hdd: ['Western Digital Blue 1TB @ 7200rpm'],
    ssd: ['Samsung 850 EVO 500GB'],
    gpu: 'EVGA GeForce GTX 980 Ti 6GB',
    case: 'Corsair Obsidian 750D Full-Tower',
    psu: 'Corsair HX1000i 80 Plus Platinum',
    image: images.get(4),
  },
  {
    id: 5,
    displayDate: 'September 2017 - Built for my friend, James',
    startedDate: '2017-09-01T00:00:00.000Z',
    cpu: 'Intel Core i7-7700K @ 4.2GHz',
    cool: 'Corsair H100i v2',
    mobo: 'ASUS ROG STRIX Z270E',
    ram: '32GB HyperX Fury 2666MHz',
    hdd: ['Western Digital Blue 1TB @ 7200rpm'],
    ssd: ['Samsung 960 EVO M.2 500GB'],
    gpu: 'EVGA GeForce GTX 1080 Ti FTW3 11GB',
    case: 'Corsair Obsidian 750D Full-Tower',
    psu: 'Corsair RM750x 80 Plus Gold',
    image: images.get(5),
  },
  {
    id: 6,
    displayDate: 'November 2021 - Built for myself',
    startedDate: '2021-11-26T00:00:00.000Z',
    cpu: 'AMD Ryzen 9 5900X @ 3.7 GHz',
    cool: 'Corsair H150i Elite Capellix 360mm',
    mobo: 'Asus ROG Strix X570-E',
    ram: '32GB Corsair Vengeance RGB Pro 3200MHz',
    hdd: ['Western Digital Blue 2TB @ 7200rpm'],
    ssd: ['Samsung 980 PRO PCIe 4.0 NVMe 1TB'],
    gpu: 'Asus ROG Strix GeForce RTX 2080 Ti 11GB',
    case: 'Corsair 5000D Airflow Mid-Tower',
    psu: 'Corsair RM850x 80 Plus Gold',
    image: images.get(29),
  },
];

export const builds = new Map(_builds.map((build) => [build.id, build]));

const _projects: Project[] = [
  {
    id: 1,
    title: 'chrismeyers.net, this website',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/website',
    displayDate: 'Personal Project, Fall 2013',
    startedDate: '2013-09-01T00:00:00.000Z',
    languages: ['TypeScript'],
    info: `
      A digital representation of myself.
      <br><br>
      This project has gone through several iterations over the years:
      <ol>
        <li>
          The original version of the website was written in plain HTML and CSS, which eventually
          evolved to use PHP and a MySQL database. The original code can be found
          <a href="https://github.com/chrismeyers/CM_WEBSITE" class="fancytxt">here</a>.
        </li>
        <li>
          A complete rewrite of the website was done in November 2018 using <a href="https://vuejs.org" class="fancytxt">Vue.js</a>
          and <a href="https://dart.dev" class="fancytxt">Dart</a> (<a href="https://aqueduct.io" class="fancytxt">Aqueduct</a>).
          The implementation of the site using Dart can be found <a href="https://github.com/chrismeyers/website/tree/api-dart-aqueduct/api" class="fancytxt">here</a>
          and the implementation using Vue.js can be found <a href="https://github.com/chrismeyers/website/tree/web-vue-2/web" class="fancytxt">here</a>.
        </li>
        <li>
          In the Spring of 2021, I decided to incrementally rewrite the website again due to the
          sunsetting of the Aqueduct framework. This version of the website was a monorepo that
          used <a href="https://fastify.dev" class="fancytxt">Fastify</a> and
          <a href="https://react.dev" class="fancytxt">React</a>. The implementation of this
          version can be found <a href="https://github.com/chrismeyers/website/tree/fastify-react-monorepo" class="fancytxt">here</a>.
        </li>
        <li>
          The current version of the website was simplified to only use <a href="https://react.dev" class="fancytxt">React</a>
          and <a href="https://vite.dev" class="fancytxt">Vite</a> in September 2022.
        </li>
      </ol>`,
    role: 'Solo project',
    status: 'Being maintained',
    images: [],
  },
  {
    id: 2,
    title: 'Genomic Solutions Now! Software',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/Genomic_SWE',
    displayDate: 'Software Engineering I, Rowan University, Spring 2014',
    startedDate: '2014-03-01T00:00:00.000Z',
    languages: ['Java'],
    info: `
      An application built for <a href="https://genomainternational.com" class="fancytxt">Genomic Solutions Now</a>
      that simplifies the patient reports generated by a lab.`,
    role: 'Responsible for parsing the input reports. I also handled outputting the simplified reports to an Excel spreadsheet.',
    status: 'Complete',
    images: [images.get(6)],
  },
  {
    id: 3,
    title: 'Pinelands Tour Maker',
    webUrl: null,
    codeUrl:
      'https://github.com/chrismeyers/WEB_PROG/tree/master/public_html/pinelands',
    displayDate: 'Web Programming, Rowan University, Spring 2014',
    startedDate: '2014-03-02T00:00:00.000Z',
    languages: ['PHP', 'JavaScript', 'MySQL'],
    info: 'An application that makes tours depending on selected points of interest.',
    role: 'Solo project',
    status: 'Complete',
    images: [images.get(7), images.get(8), images.get(9)],
  },
  {
    id: 4,
    title: 'Tic-Tac-Toe Android App',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/Android-TicTacToe',
    displayDate: 'Intro to Android Programming, Rowan University, Summer 2014',
    startedDate: '2014-06-01T00:00:00.000Z',
    languages: ['Java'],
    info: 'An Android version of Tic-Tac-Toe.',
    role: 'Solo Project',
    status: 'Complete',
    images: [images.get(10), images.get(11)],
  },
  {
    id: 5,
    title: 'League of Legends Player Data Parser',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/LoL_player_data',
    displayDate: 'Personal Project, Summer 2014',
    startedDate: '2014-06-02T00:00:00.000Z',
    languages: ['PHP'],
    info: `
      An application based on the video game <i>League of Legends</i> that utilizes the Riot Games
      API to query and parse player data for a specified player.
      <br><br>
      <i>
        Note: Due to the deprecation of the stats-v1.3 API endpoint, this web application no longer
        pulls live data.
      </i>`,
    role: 'Solo Project',
    status: 'Complete',
    images: [images.get(12), images.get(13), images.get(14)],
  },
  {
    id: 6,
    title: 'PCA Visualization',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/SeniorProj_BMS_PCA',
    displayDate: 'Senior Project, Rowan University, Fall 2014',
    startedDate: '2014-09-01T00:00:00.000Z',
    languages: ['C#'],
    info: `
      Principal component analysis (PCA) is a technique used to reduce dimensionality of a
      multivariate data set in order to better understand potentially correlated data. The goal of
      this project was to take an Excel add-in developed by Bristol-Myers Squibb and further develop
      it to have visualization functionality.`,
    role: 'Responsible for parsing the calculated principal component worksheets and storing them in data structures used for plotting.',
    status: 'Complete',
    images: [images.get(15), images.get(16), images.get(17), images.get(18)],
  },
  {
    id: 7,
    title: 'Cardiomyocyte Data Analysis Automation',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/BMS_Meyers_ExcelAutomation',
    displayDate: 'Personal Project, Winter 2014',
    startedDate: '2014-12-01T00:00:00.000Z',
    languages: ['C#'],
    info: `
      An Excel add-in that was developed to automate data analysis for Dan Meyers, scientist at
      Bristol-Myers Squibb pharmaceutical company. The add-in takes in a raw data set, formats the
      data, performs statistical calculations and plots specified variables to a column graph. Data
      is extracted from an <a href="http://www.ionoptix.com/" class="fancytxt">IonOptix</a>
      contraction/calcium monitoring system and is an important add-in for data analysis.`,
    role: 'Solo Project',
    status: 'Complete',
    images: [
      images.get(19),
      images.get(20),
      images.get(21),
      images.get(22),
      images.get(23),
      images.get(24),
    ],
  },
  {
    id: 8,
    title: 'League of Legends Server Status Checker',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/rito-pls',
    displayDate: 'Personal Project, June 2015',
    startedDate: '2015-06-01T00:00:00.000Z',
    languages: ['Java'],
    info: `
      A Java application that reports current <i>League of Legends</i> service statuses for a
      specified region. The application queries the <i>League of Legends</i> API periodically and
      presents the current status of several services (Boards/Forums, Game, Store and Website).
      <br><br>
      The purpose of this project was to get more practice with Java GUI building and multithreaded
      programming. The polling operation takes place on a new thread that allows for the program to
      function normally while maintaining periodic server checks.
      <br><br>
      <i>
        Note: Due to several changes to the Riot Games API, this application is no longer maintained
        and is not guaranteed to work.
      </i>`,
    role: 'Solo Project',
    status: 'Complete',
    images: [images.get(25), images.get(26), images.get(27)],
  },
  {
    id: 9,
    title: 'GPS Importer',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/gps_importer',
    displayDate: 'Personal Project, July 2017',
    startedDate: '2017-07-01T00:00:00.000Z',
    languages: ['Python'],
    info: `
      Before a vacation, I was tasked with entering addresses into a Garmin GPS. Instead of manually
      entering each address on the cramped GPS keyboard, I decided to create an application to
      automate the process. This Command Line application imports a .csv file of addresses and
      generates a .csv file that can be imported into a Garmin GPS device.`,
    role: 'Solo Project',
    status: 'Complete',
    images: [],
  },
  {
    id: 10,
    title: 'pleasehold',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/pleasehold',
    displayDate: 'Personal Project, February 2019',
    startedDate: '2019-02-01T00:00:00.000Z',
    languages: ['Python'],
    info: `
      pleasehold is a Python package that outputs multi-part messages on the same line with a
      loading bar in between. It's useful for providing an indication that a script is still running
      during long running processes.
      <br><br>
      I began this project as a way to experiment with multithreading in Python. While long running
      processes run on the main thread, the rendering of a loading bar takes place on a separate thread.
      This project also provided the opportunity to learn about and implement context managers.`,
    role: 'Solo Project',
    status: 'In Development',
    images: [images.get(28)],
  },
  {
    id: 11,
    title: 'data-shifter',
    webUrl: 'https://www.npmjs.com/package/data-shifter',
    codeUrl: 'https://github.com/chrismeyers/data-shifter',
    displayDate: 'Personal Project, November 2020',
    startedDate: '2020-11-02T00:00:00.000Z',
    languages: ['JavaScript'],
    info: `
      data-shifter is a JavaScript package that provides a data validation and transformation
      pipeline. Due to the functional nature of this package, it's easy to swap the components
      of the pipeline to dynamically generate different transformations. This package comes with a
      few predefined validators and shifters (transformation definitions), but the real power of
      this library comes from the fact that the pipeline just acts as a framework that custom
      validators and shifters can be plugged into.
      <br><br>
      The primary reason for starting this project was to get some experience with functional
      programming concepts, specifically currying, while abstracting and simplifying a common task.
      Design goals include:
      <ul>
        <li>Leveraging the flexibility of currying</li>
        <li>Providing an intuitive validation and transformation pipeline</li>
        <li>Allowing easy and powerful customization</li>
      </ul>`,
    role: 'Solo Project',
    status: 'In Development',
    images: [],
  },
  {
    id: 12,
    title: 'spotify-cli',
    webUrl: null,
    codeUrl: 'https://github.com/chrismeyers/spotify-cli',
    displayDate: 'Personal Project, June 2025',
    startedDate: '2025-06-01T00:00:00.000Z',
    languages: ['Go'],
    info: `
      spotify-cli is a command-line interface for interacting with Spotify from the terminal.
      Currently, it supports searching Spotify and displaying the results in a terminal user
      interface.
      <br><br>
      This project was started as a way to learn more about Go and its ecosystem, specifically
      <a href="https://github.com/charmbracelet/bubbletea" class="fancytxt">Bubble Tea</a> for
      building terminal applications.
    `,
    role: 'Solo Project',
    status: 'In Development',
    images: [images.get(30)],
  },
];

export const projects = new Map(
  _projects.map((project) => [project.id, project])
);
