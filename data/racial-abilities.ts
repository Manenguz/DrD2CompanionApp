import { Race } from '../types';

export interface RacialAbility {
  name: string;
  quickChoiceTag?: string;
  flavor: string;
  description: string;
}

export const RACIAL_ABILITIES_DATA: Record<string, RacialAbility[]> = {
  [Race.Clovek]: [
    { 
      name: "Jménem krále", 
      quickChoiceTag: "Lidé království",
      flavor: "Oddanost ušlechtilé věci mu dodává sílu vytrvat až do konce.", 
      description: "Když postava podstupuje zkoušku nebo střet, aby prosadila zájmy pána nebo organizace, kterým dlouhodobě slouží, a její život je při této zkoušce či střetu v ohrožení, dává jí každá jizva 1 zdroj navíc. (bez aktivace, Duše)" 
    },
    { 
      name: "Zarputilost", 
      quickChoiceTag: "Osadníci",
      flavor: "Mohou mu vyčítat, že je bezohledný, sobecký nebo paličatý, ale on to nazývá odvahou stát si za svým.", 
      description: "Z každé jizvy na Vlivu získává postava vždy 1 zdroj navíc. (bez aktivace, Vliv)" 
    },
    { 
      name: "Idol žen či mužů", 
      flavor: "Jeho divoký vzhled či naopak jemný šarm jsou zbraní, která láme i ta nejnepřístupnější srdce.", 
      description: "Postava má nadání (2 manévry) pro svádění a získávání přízně osob opačného pohlaví. (bez aktivace, Vliv)" 
    },
    { 
      name: "Lví srdce", 
      quickChoiceTag: "Barbaři",
      flavor: "Je statečný a neotřese jím sebevětší nebezpečí či beznadějná situace.", 
      description: "Postava má nadání (2 manévry) čelit zastrašování či psychickému nátlaku. (bez aktivace, Duše)" 
    },
    { 
      name: "Styky", 
      flavor: "Díky svému postavení nebo cestování má spoustu kontaktů na nejrůznějších místech.", 
      description: "Hráč může stanovit, že určitá cizí postava dluží jeho postavě z minulosti laskavost, nebo že s ní má společného známého, ke kterému mají oba kladný vztah. (aktivace: 1 Vliv)" 
    }
  ],
  [Race.Elf]: [
    { 
      name: "Vznešenost", 
      quickChoiceTag: "Lid pahorků",
      flavor: "Jeho osobní charisma rychle zastíní všechny fámy a špinavé pomluvy.", 
      description: "Na hojení jizev na Vlivu stačí postavě vynaložit o 1 zdroj méně. (bez aktivace, Vliv)" 
    },
    { 
      name: "Tesknota", 
      flavor: "Jeho mysl je bezedná studnice moudrosti a vědomostí, s nimi však vyplouvají na povrch i bolestné vzpomínky.", 
      description: "Z každé duševní jizvy získává postava vždy 1 zdroj navíc. (bez aktivace, Duše)" 
    },
    { 
      name: "Jsme jedné krve", 
      quickChoiceTag: "Lesní elfové",
      flavor: "Zvířata k němu cítí až zázračnou sounáležitost.", 
      description: "Postava má nadání (2 manévry) pro odhadování vlastností a úmyslů zvířat a pro jejich přesvědčování bez přímého ovládání. (bez aktivace, Vliv)" 
    },
    { 
      name: "Plášť soumraku", 
      quickChoiceTag: "Lid noci",
      flavor: "Naučil se procházet nocí neviděn, splynout se stíny a skrýt se zrakům ostatních.", 
      description: "Postava má nadání (2 manévry) pro skrývání se ve tmě, v šeru nebo při špatném osvětlení. (bez aktivace, Duše)" 
    },
    { 
      name: "Paměť rodu", 
      flavor: "O každém místě, stromě nebo kameni zná příběh, který se skutečně před lety odehrál.", 
      description: "Hráč může stanovit, jak určité místo vypadalo nebo jaký příběh se na něm odehrál v minulosti, musí však jít o minulost vzdálenou nejméně dvanáct let. (aktivace: 1 Duše)" 
    }
  ],
  [Race.Trpaslik]: [
    { 
      name: "Noční oči", 
      quickChoiceTag: "Hlubinní trpaslíci",
      flavor: "I v nejčernější tmě vidí jako jiní v šeru. Šero je pro něj jasným dnem.", 
      description: "Postava s touto vyhrazenou dovedností dokáže vidět ve tmě. (bez aktivace, Duše)" 
    },
    { 
      name: "Síla přísahy", 
      quickChoiceTag: "Horští trpaslíci",
      flavor: "Jednou dané slovo je pro trpaslíky nezrušitelné a posvátné.", 
      description: "Když postava podstupuje zkoušku nebo střet, aby splnila svou přísahu, a její život je přitom v ohrožení, dává jí každá jizva 1 zdroj navíc. (bez aktivace, Duše)" 
    },
    { 
      name: "Nezdolnost", 
      quickChoiceTag: "Osamocení trpaslíci",
      flavor: "Co jiní vnímají jako vážné zranění, to je pro něho jenom škrábnutí.", 
      description: "Na hojení tělesných jizev stačí postavě vynaložit o 1 zdroj méně. (bez aktivace, Tělo)" 
    },
    { 
      name: "Játra ze žuly", 
      flavor: "Nikdy se nepouštějte do pijáckého duelu s trpaslíkem.", 
      description: "Postava má nadání (2 manévry) čelit účinkům omamných látek a jedů. (bez aktivace, Tělo)" 
    },
    { 
      name: "Pouto krve", 
      flavor: "Pochází z rozvětveného rodu, takže má řadu bratranců i přívrženců.", 
      description: "Hráč může stanovit, že určitý trpaslík patří k příbuzným jeho postavy nebo má k jejímu rodu závazky. (aktivace: 1 Vliv)" 
    }
  ],
  [Race.Hobit]: [
    { 
      name: "Šestý smysl", 
      flavor: "Když mu hrozí nějaká nepříjemnost, okamžitě pocítí neklid a zbystří.", 
      description: "Postava s touto vyhrazenou dovedností dokáže rozpoznat hrozící nebezpečí, i když nemá k dispozici žádné běžnými smysly zachytitelné podněty. (bez aktivace, Duše)" 
    },
    { 
      name: "Takový prcek!", 
      quickChoiceTag: "Horda",
      flavor: "Je snadné jej podcenit, neboť bojuje zuřivěji, než by člověk od hobita čekal.", 
      description: "Když postava bojuje zblízka se soupeřem větším než je sama, který ji dosud neviděl bojovat, dává jí každá jizva 1 zdroj navíc. (bez aktivace, Duše)" 
    },
    { 
      name: "Dobrá nálada", 
      quickChoiceTag: "Usedlí hobiti",
      flavor: "Na všechen děs a útrapy rázem zapomene, když před něj někdo postaví žejdlík piva a rozestele mu čistou postel.", 
      description: "Na hojení duševních jizev stačí postavě vynaložit o 1 zdroj méně. (bez aktivace, Duše)" 
    },
    { 
      name: "Tichošlápek", 
      quickChoiceTag: "Potulní hobiti",
      flavor: "Díky měkkému došlapu dokáže proklouznout kamkoliv zcela neslyšně.", 
      description: "Postava má nadání (2 manévry) pro tichý pohyb, pokud při něm nemá na nohách boty. (bez aktivace, Tělo)" 
    },
    { 
      name: "Labužník", 
      flavor: "Vždycky má u sebe něco pro zlepšení nálady nebo navození pocitu domova.", 
      description: "Hráč může kdykoliv, kdy je to uvěřitelné, určit, že jeho postava má u sebe něco dobrého – placatku s vínem či kořalkou, hrst dýmkového tabáku nebo třeba pytlíček rozinek, sušených hub či exotického koření. (aktivace: 1 Duše)" 
    }
  ],
  [Race.Kroll]: [
    { 
      name: "Netopýří sluch", 
      flavor: "Zaslechne i to nejslabší prasknutí větvičky, slova pronášená šeptem nebo tichý dech skrývajícího se tvora.", 
      description: "Postava s touto vyhrazenou dovedností dokáže zaslechnout i velmi tiché zvuky a orientovat se podle nich i ve tmě. (bez aktivace, Duše)" 
    },
    { 
      name: "Zběsilost", 
      quickChoiceTag: "Spoutaní krollové",
      flavor: "Bolest a chuť vlastní krve na rtech ho dokážou vybičovat k neskutečným výkonům.", 
      description: "Z každé tělesné jizvy získává postava vždy 1 zdroj navíc. (bez aktivace, Tělo)" 
    },
    { 
      name: "Odznaky hrdinství", 
      quickChoiceTag: "Hraniční krollové",
      flavor: "Bizarní ozdoby, tetování nebo účes ohlašují, že vykonal odvážný skutek, a dodávají mu sebevědomí.", 
      description: "Postava má nadání (2 manévry) pro zastrašování všech tvorů inteligentnějších než zvířata. (bez aktivace, Vliv)" 
    },
    { 
      name: "Zubří kůže", 
      quickChoiceTag: "Divocí krollové",
      flavor: "Tuhá srst jej chrání lépe než prošívaná zbroj.", 
      description: "Pokožka dává postavě slevu odpovídající běžné zbroji, avšak bez největších omezení. (bez aktivace, Tělo)" 
    },
    { 
      name: "Kořeny magie", 
      flavor: "Duchové předků vždy odpovědí na jeho zavolání a dovedou jej ke zdroji moci.", 
      description: "Hráč může určit, že se poblíž nachází přirozené magické zřídlo, musí však popsat, jaká je jeho podstata, případně jak vzniklo. (aktivace: 1 Vliv)" 
    }
  ]
};

export default RACIAL_ABILITIES_DATA;