export interface Ability {
  name: string;
  flavor: string;
  description: string;
}

const classAbilitiesData: Record<string, Ability[]> = {
  "Bojovník": [
    {
      name: "Letící zbraň",
      flavor: "Kdo si myslí, že se obouručákem nedá zabít na dálku, bude nepříjemně překvapen.",
      description: "Postava s touto vyhrazenou dovedností dokáže jakoukoliv zbraň pro boj zblízka použít jako vrhací zbraň, takže může využít zdarma manévr lstivě jako u kterékoliv běžné vrhací zbraně. (aktivace: 1 Tělo)"
    },
    {
      name: "Cit pro zbraň",
      flavor: "Ten chlap to s tesákem umí, a nemám na mysli jen porcování masa, jestli mi rozumíte.",
      description: "Hráč si vybere jeden druh zbraně pro boj zblízka (např. kopí nebo meč). Postava má nadání (2 manévry) pro pěší i jízdní boj s tímto druhem zbraně proti jakémukoliv protivníkovi a pro zručnost s tímto druhem zbraně. (bez aktivace, Tělo)"
    },
    {
      name: "Gladiátor",
      flavor: "Vybojoval už tolik duelů s lidmi i zvířaty, že přesně ví, jak se jim dostat na kobylku.",
      description: "Postava je zběhlá (některé manévry zdarma) v pěším boji zblízka jakoukoliv zbraní (i nouzovou) proti zvířatům nebo lidem. (bez aktivace, Tělo)"
    },
    {
      name: "Zápasník",
      flavor: "Zná tajné údery a chvaty, které lámou kosti a drtí klouby.",
      description: "Postava je zběhlá (některé manévry zdarma) v pěším boji zblízka beze zbraně proti zvířatům nebo lidem, tuto schopnost může uplatnit i proti soupeři ozbrojenému zbraní. (bez aktivace, Tělo)"
    },
    {
      name: "Silák",
      flavor: "Dokáže vyvrátit okované dveře z pantů nebo vyrvat menší strom ze země i s kořeny.",
      description: "Postava je zběhlá (některé manévry zdarma) v činnostech vyžadujících pouze hrubou sílu (např. zvedání a odvalování břemen nebo vyrážení dveří). Dále může postava bojovat dvouručními zbraněmi a držet je při tom jen v jedné ruce. (bez aktivace, Tělo)"
    },
    {
      name: "Šampión",
      flavor: "Jeho slova a chování dokážou zdrtit soupeře dřív, než začne samotný boj.",
      description: "Postava je zběhlá (některé manévry zdarma) v chvástání, ostouzení soupeřů a zastrašování lidí. (bez aktivace, Vliv)"
    },
    {
      name: "Bojové reflexy",
      flavor: "Jeho rychlost je nelidská. V jediném okamžiku může napadnout dva soupeře.",
      description: "Při boji zblízka může postava při každém svém tělesném útoku směřovaném pouze na dva cíle použít zdarma manévr rozsáhle. (bez aktivace, Tělo)"
    },
    {
      name: "Osobní strážce",
      flavor: "Svého zákazníka nebo přítele dostane živého a zdravého z jakéhokoliv nebezpečí.",
      description: "Tělesnými akcemi může reagovat pomocí manévru obrana nejen na akce vedené na sebe, jak je obvyklé, ale i na jakékoliv akce vedené na jinou postavu, která se nachází poblíž. (bez aktivace, Tělo)"
    },
    {
      name: "Rameno na rameno",
      flavor: "Věrnému spolubojovníkovi dokáže pomoci v útoku i krýt záda.",
      description: "Postava může zaplatit svými zdroji za svého pomocníka nebo jinou postavu, která se nachází dostatečně blízko a čelí nepřátelům v boji zblízka. (bez aktivace, Duše)"
    },
    {
      name: "Hlava nehlava",
      flavor: "V zápalu boje dokáže rozbít soupeři o hlavu takřka cokoliv.",
      description: "Postava může při boji zblízka udělit jizvu jakémukoliv předmětu, který použije jako nouzovou zbraň. Předmět tak zničí a získá tím 1 zdroj jako při zničení zbraně běžné kvality. (bez aktivace, Tělo)"
    },
    {
      name: "Pádný úder",
      flavor: "Ranou své zbraně dokáže prorazit i pevnou zbroj nebo rozdrtit přilbu.",
      description: "Proti jeho útokům se zbraní poskytuje zbroj o 1 menší slevu. (bez aktivace, Tělo)"
    },
    {
      name: "Přečtení soupeře",
      flavor: "Pozná, co může od svého protivníka čekat, a to ještě dřív, než se s ním střetne.",
      description: "Hráč může stanovit, že budoucí soupeř jeho postavy má při boji zblízka určitou slabinu nebo nějakou oblíbenou taktiku, kterou ve střetu s jeho postavou využije. (aktivace: 1 Vliv)"
    }
  ],
  "Lovec": [
    {
      name: "Jedno oko otevřené",
      flavor: "Je ostražitý a vnímá, co se kolem děje, i když odpočívá nebo spí.",
      description: "Postava s touto vyhrazenou dovedností dokáže i během spánku reagovat na jakoukoliv akci přímo ohrožující ji nebo jiného člena družiny, jako by nespala. (aktivace: 1 Duše)"
    },
    {
      name: "Vetřelci",
      flavor: "Vycítí na dálku cizí tvory, pro něž není divočina domovem.",
      description: "Postava s touto vyhrazenou dovedností dokáže v divočině určit, kterým směrem se do vzdálenosti asi jedné hodiny chůze nacházejí tvorové, již zde nejsou doma. (aktivace: 1 Duše)"
    },
    {
      name: "Něco z ničeho",
      flavor: "Nepotřebuje železa ani oka z drátů, k vytvoření smrtící léčky mu stačí kus provazu a nůž.",
      description: "Postava s touto vyhrazenou dovedností dokáže i bez vynaložení koupených surovin vytvářet lovecké pasti se silou až do výše své Duše. (aktivace: 1 Duše)"
    },
    {
      name: "Dobrá muška",
      flavor: "Se svou oblíbenou zbraní dokáže zasáhnout hned první ranou, jako by cíl jeho střelu přímo přitahoval.",
      description: "Hráč si vybere jeden druh střelné zbraně (např. luk). Postava má nadání (2 manévry) pro pěší i jízdní střelbu tímto druhem zbraně na jakýkoliv cíl. (bez aktivace, Tělo)"
    },
    {
      name: "Lučištník",
      flavor: "Před jeho střelami není úniku. Najde si svou kořist v jakémkoliv úkrytu.",
      description: "Postava je zběhlá (některé manévry zdarma) v pěší střelbě jakoukoliv střelnou zbraní na lidi, zvířata a neživé cíle. (bez aktivace, Tělo)"
    },
    {
      name: "Průzkumník",
      flavor: "V přírodním terénu se pohybuje tiše jako duch a jeho bystrému zraku nic neunikne.",
      description: "Postava je zběhlá (některé manévry zdarma) v tichém pohybu, skrývání se a odhalování skrytých tvorů či věcí v divočině. (bez aktivace, Duše)"
    },
    {
      name: "Zálesák",
      flavor: "V divočině je jako doma, neztratí směr ani netrpí hladem.",
      description: "Postava je zběhlá (některé manévry zdarma) v hledání cesty, potravy a příbytku v divočině, v lovu zvířat, rybolovu, zpracování kořisti a plavbě. (bez aktivace, Duše)"
    },
    {
      name: "Stopař",
      flavor: "Kde jiní vidí pouze brázdu ve sněhu, on dokáže rozpoznat stopy pěti mužů.",
      description: "Postava je zběhlá (některé manévry zdarma) v stopování a zakrývání stop. (bez aktivace, Duše)"
    },
    {
      name: "Krotitel",
      flavor: "I to nejvzpurnější zvíře zjihne pod jeho přísným pohledem či výhružným zamručením.",
      description: "Postava je zběhlá (některé manévry zdarma) v ochočování si zvířat, využívání zvířat pomocí povelů a v zastrašování zvířat. (bez aktivace, Vliv)"
    },
    {
      name: "Zdvojená střela",
      flavor: "První šíp ještě sviští vzduchem a zkušená ruka již zakládá na tětivu druhý.",
      description: "Při střelbě s dostatkem munice může postava při každém svém útoku směřovaném pouze na dva cíle použít zdarma manévr rozsáhle. (bez aktivace, Tělo)"
    }
  ],
  "Kejklíř": [
    {
      name: "Změna tváře",
      flavor: "Nepotřebuje převleky ani líčidla. Prostě jen svraští obličej nebo napodobí záškuby šílence.",
      description: "Postava se dokáže vydávat za někoho jiného, ačkoliv neměla dost času na přípravu. Nemůže se vydávat za určitou existující osobu. (aktivace: 1 Tělo)"
    },
    {
      name: "Děsivá přesnost",
      flavor: "Pokud se jím vržená zbraň chvěje v trámu vedle vaší hlavy, buďte si jistí, že neminul. Bylo to varování.",
      description: "Hráč si vybere jeden druh vrhací zbraně. Postava má nadání (2 manévry) pro pěší i jízdní vrhání tímto druhem zbraně. (bez aktivace, Tělo)"
    },
    {
      name: "Vrhač",
      flavor: "Zabíjel na dálku už tolikrát, že předvídá každý pohyb i úmysl své kořisti.",
      description: "Postava je zběhlá (některé manévry zdarma) v pěším vrhání jakoukoliv vrhací zbraní na lidi, zvířata a neživé cíle. (bez aktivace, Tělo)"
    },
    {
      name: "Akrobat",
      flavor: "Je skvělý jezdec i běžec a jeho přemety či skoky ze střechy na střechu vyrážejí dech.",
      description: "Postava je zběhlá (některé manévry zdarma) ve skocích a pádech, v běhu, jezdectví a jezdecké akrobacii. (bez aktivace, Tělo)"
    },
    {
      name: "Zloděj",
      flavor: "Vyhodit kotvičku na hradební zeď je pro něj stejně snadné jako odříznout něčí váček.",
      description: "Postava je zběhlá (některé manévry zdarma) ve vrhání na neživý cíl, žonglování, okrádání druhých a ukrývání věcí na těle. (bez aktivace, Tělo)"
    },
    {
      name: "Komediant",
      flavor: "Když mluví, může mu za zády přecházet karavana velbloudů a nikdo si jí ani nevšimne.",
      description: "Postava je zběhlá (některé manévry zdarma) v předstírání a herectví, v přestrojování se a v uměleckých kouscích. (bez aktivace, Vliv)"
    },
    {
      name: "Skrytá kapsa",
      flavor: "Nikdo neví, jak to dělá, ale nějakou tu drobnost je schopen pronést kamkoliv.",
      description: "Hráč může určit, že jeho postava má u sebe jeden malý předmět do velikosti dlaně, a to i poté, co byla prohledána. (aktivace: 1 Tělo)"
    }
  ],
  "Mastičkář": [
    {
      name: "Čtení v duši",
      flavor: "Vidí člověku až do žaludku a dokáže odhadnout jeho pravou povahu i schopnosti.",
      description: "Postava dokáže společně s odhadem jedné z hranic určitého člověka zároveň zjistit i výši nebo obsah jeho charakteristiky. (aktivace: 1 Vliv)"
    },
    {
      name: "Umění improvizace",
      flavor: "Zatímco jiní zkoušejí chybějící přísadu nahradit, on si upraví celý recept.",
      description: "Postava dokáže vyrobit substanci z nouzových surovin bez ztráty vlastností při soumraku. (aktivace: 1 Duše)"
    },
    {
      name: "Všelék",
      flavor: "Sbírá babské recepty a díky tomu dokáže namíchat léčivý životabudič.",
      description: "Postava dokáže vyrobit lektvar, který hojí jakýkoliv druh tělesných jizev – od zranění až po nemoc. (aktivace: 1 surovina)"
    },
    {
      name: "Ranhojič",
      flavor: "Kde běžný felčar dokáže tak nanejvýš pustit žilou, on zachraňuje životy.",
      description: "Postava je zběhlá (některé manévry zdarma) v léčení lidského těla, v lučbě a v přípravě a podávání lektvarů. (bez aktivace, Duše)"
    },
    {
      name: "Vyjednavač",
      flavor: "Ví, co a kdy je třeba říci, aby se rozhovor ubíral tím správným směrem.",
      description: "Postava je zběhlá (některé manévry zdarma) v odhadování hranic a úmyslů lidí a ve vyjednávání a smlouvání s lidmi. (bez aktivace, Vliv)"
    },
    {
      name: "Ostrý jazyk",
      flavor: "Umí se zastat svých přátel a jeho slova tnou hlouběji než meč.",
      description: "Vlivovými akcemi může reagovat pomocí manévru obrana na akce vedené na jakoukoliv jinou postavu v doslechu. (bez aktivace, Vliv)"
    }
  ],
  "Zaříkávač": [
    {
      name: "Čarovné stráže",
      flavor: "Z prastarých knih vyčetl návody na ochranné rituály, jaké zná jen málokterý kouzelník.",
      description: "Dokáže při magických obrazcích vytvořit strážce s podmínkou aktivace (aktivace: 1 Duše) nebo „věčného“ strážce (aktivace: 3 Duše)."
    },
    {
      name: "Modlitby a uřknutí",
      flavor: "Umí zajistit přízeň nebes, ale také potrestat provinilce.",
      description: "Dokáže seslat zaříkání ovlivňující činnost cíle do soumraku (aktivace: 1 Vliv) nebo věčnou kletbu s podmínkou (aktivace: 3 Vlivy)."
    },
    {
      name: "Divoký talent",
      flavor: "Síla jeho nadání je udivující. Lidé touží po jeho požehnání.",
      description: "Postava je zběhlá (některé manévry zdarma) v sesílání prokletí a požehnání. (bez aktivace, Vliv)"
    },
    {
      name: "Povolávač",
      flavor: "Ví přesně, jak přivolat nadpřirozenou bytost a ochránit se před její zlobou.",
      description: "Postava je zběhlá (některé manévry zdarma) v jednání s nadpřirozenými bytostmi a vytváření magických obrazců. (bez aktivace, Vliv)"
    },
    {
      name: "Bystrost",
      flavor: "Je pohotový a v pravou chvíli dokáže pomoci příteli radou či kouzlem.",
      description: "Duševními akcemi může reagovat manévrem obrana na akce vedené na jakoukoliv jinou postavu v dohledu. (bez aktivace, Duše)"
    },
    {
      name: "Moc amuletu",
      flavor: "Jen zašeptá prosbu a je vyslyšen.",
      description: "Postava dokáže ukládat zdroje do rituálního předmětu bez vynaložení surovin. (bez aktivace, Duše)"
    }
  ],
  "Válečník": [
    {
      name: "Bojový výcvik",
      flavor: "Zjizvení žoldáci v jeho službách často vzpomínají, jaké bývali padavky.",
      description: "Může naučit svého pomocníka jednu bojovnickou dovednost nebo schopnost, kterou sám ovládá. (aktivace: 1 Vliv)"
    },
    {
      name: "Šermíř",
      flavor: "Ovládá všemožné triky, záludnosti a finty, takže souboje jsou jeho druhá přirozenost.",
      description: "Postava je mistrem (posílené manévry) v pěším boji zblízka jakoukoliv zbraní proti lidem a zvířatům. (bez aktivace, Tělo)"
    },
    {
      name: "Urozený",
      flavor: "Jeho původ či výchova a znalosti diplomatického jednání mu otevírají každé dveře.",
      description: "Postava je mistrem (posílené manévry) ve využívání svého vlivu ve vyšší společnosti a v diplomacii. (bez aktivace, Duše)"
    },
    {
      name: "Velitel",
      flavor: "Aby splnili jím vydaný rozkaz, jsou jeho lidé ochotni položit i život.",
      description: "Postava je mistrem (posílené manévry) ve vedení lidí v boji. (bez aktivace, Vliv)"
    },
    {
      name: "Válečný oř",
      flavor: "Když se řítí vpřed, rozdrtí bojovným pokřikem odvahu všech.",
      description: "Sedí-li na jízdním zvířeti, může při zastrašování lidí a zvířat použít zdarma manévr rozsáhle. (bez aktivace, Vliv)"
    }
  ],
  "Hraničář": [
    {
      name: "Poutník",
      flavor: "Postava rychle pochytí základy většiny jazyků a zbytek odgestikuluje.",
      description: "Dokáže zhruba odhadnout, co lidé říkají cizím jazykem, a sdělit jim jednoduché myšlenky. (aktivace: 1 Duše)"
    },
    {
      name: "Dravčí instinkty",
      flavor: "Vnímá nestvůry jakýmsi vnitřním zrakem.",
      description: "Postava dokáže vnímat netvory, i když je nevidí ani neslyší (šestý smysl). Bojuje bez omezení i v naprosté tmě. (bez aktivace, Duše)"
    },
    {
      name: "Berserk",
      flavor: "V zoufalé situaci jej posedne válečné šílenství.",
      description: "Postava dokáže za zdroje z tělesné jizvy úrovně 1 dosáhnout úspěchu ve zkoušce bez ohledu na Ohrožení. (bez aktivace, Tělo)"
    },
    {
      name: "Drakobijce",
      flavor: "S netvory se potýkal už tolikrát, že přesně ví, jak na ně.",
      description: "Postava je mistrem (posílené manévry) v boji zblízka s netvory a v braní trofejí. (bez aktivace, Tělo)"
    },
    {
      name: "Hrr na ně!",
      flavor: "Pod jeho nožem padnou během jediné chvíle hned dva strážci.",
      description: "Při přepadení ze zálohy v divočině na dva cíle může postava použít zdarma manévr rozsáhle. (bez aktivace, Duše)"
    }
  ],
  "Šaman": [
    {
      name: "Měnič podob",
      flavor: "Říkají o něm, že je vlkodlak, ale on tvrdí, že má své nadání pod kontrolou.",
      description: "Postava se dokáže proměnit ve zvíře a jednat ve zvířecí podobě. (aktivace: 2 Tělo)"
    },
    {
      name: "Vládce šelem",
      flavor: "Zvířata zůstávají zuřivá nebo krotká jako beránci na jeho povel.",
      description: "Dokáže vytvořit kouzlo zvířecí magie, které bude trvat až do soumraku či úsvitu. (aktivace: 1 Vliv)"
    },
    {
      name: "Neviditelný jezdec",
      flavor: "Pouhé pírko mu stačí, aby mohl následovat svého zvířecího přítele kamkoliv.",
      description: "Dokáže ovládnout jednání zvířete (aktivace: 1 Vliv) nebo využívat jeho smysly na dálku přes symbolický předmět (aktivace: 1 Vliv)."
    },
    {
      name: "Znak vlkodlaka",
      flavor: "Zvířata, jež vkročí do magického kruhu, nevysvětlitelně zdivočí.",
      description: "Postava dokáže vytvořit magický obrazec a jeho prostřednictvím sesílat kouzla magie zvířat. (bez aktivace, Duše)"
    },
    {
      name: "Medicinman",
      flavor: "Dokáže přivolat síly země a léčit jimi zvířata.",
      description: "Postava je zběhlá (některé manévry zdarma) v léčení zvířat a výrobě omamných látek. (bez aktivace, Duše)"
    }
  ],
  "Druid": [
    {
      name: "Paměť vody",
      flavor: "Horká polévka tryskající z kotle dokáže z hospodské rvačky udělat skutečné peklo.",
      description: "Působí na vodu přetvořenou člověkem (polévka, víno) a vytváří vodní kouzla trvající do soumraku. (aktivace: 1 Duše)"
    },
    {
      name: "Paměť kamene",
      flavor: "Pod druidovým dotekem praskají zdi chrámů a reznou čepele mečů.",
      description: "Působí na zemi a kov přetvořený člověkem (sochy, nádoby, zbraně) do soumraku. (aktivace: 1 Duše)"
    },
    {
      name: "Paměť dřeva",
      flavor: "Kdo tvrdí, že rám okna nemůže obrazit listím, bude se velice divit.",
      description: "Působí na rostliny přetvořené člověkem (dveře, nábytek) do soumraku. (aktivace: 1 Duše)"
    },
    {
      name: "Skály a prach",
      flavor: "Je pánem kamene i hlíny, jeho kouzla otřásají zemí a rozbíjejí skály.",
      description: "Postava je mistrem (posílené manévry) v kouzlech ovládajících zemi v její přírodní podobě. (bez aktivace, Duše)"
    }
  ],
  "Lupič": [
    {
      name: "Dotykový jed",
      flavor: "Darovat urozené dámě rukavičky je velmi praktické. Obzvlášť, pokud ji chcete zabít.",
      description: "Dokáže připravit jedy, které působí již při letmém kontaktu s pokožkou. (aktivace: 3 suroviny)"
    },
    {
      name: "Městské stíny",
      flavor: "Vmáčkne do temného rohu síně, zatímco stráže bezradně procházejí kolem.",
      description: "Dokáže se ve městě skrýt i tam, kde není úkryt, a setřást pronásledovatele v patách. (aktivace: 1 Vliv)"
    },
    {
      name: "Pavouk",
      flavor: "Dokáže bojovat s nepřáteli i v okamžiku, kdy visí hlavou dolů.",
      description: "Postava je zběhlá (některé manévry zdarma) ve vzdušné akrobacii a mistrovském šplhu. (bez aktivace, Duše)"
    },
    {
      name: "Záškodník",
      flavor: "Přípravu pastí a léček v městském prostředí ovládá jako nikdo jiný.",
      description: "Postava je zběhlá (některé manévry zdarma) v líčení mechanických pastí a výrobě kontaktních jedů. (bez aktivace, Duše)"
    },
    {
      name: "Jako blesk",
      flavor: "Dokáže zaútočit skrytou zbraní rychleji než podrážděná zmije.",
      description: "Při útoku skrytou zbraní (pod stolem, za zády), o které soupeř nevěděl, získává Výhodu o velikosti 2. (bez aktivace, Tělo)"
    }
  ],
  "Zvěd": [
    {
      name: "Lesní přízrak",
      flavor: "Má zaslouženou pověst nepolapitelného zbojníka či špeha.",
      description: "Dokáže se v divočině skrýt i tam, kde není úkryt, a setřást pronásledovatele v patách. (aktivace: 1 Vliv)"
    },
    {
      name: "Černá ovce",
      flavor: "Když se dostane do úzkých, lže a ponižuje se bez ohledu na to, co si o něm budou myslet ostatní.",
      description: "Dokáže za zdroje z jizvy na vlivu dosáhnout úspěchu bez ohledu na Ohrožení. (bez aktivace, Vliv)"
    },
    {
      name: "Šedá eminence",
      flavor: "Škraloup na vaší pověsti je náhle zapomenut.",
      description: "Postava je mistrem (posílené manévry) v utajování informací a obnovování lidského vlivu. (bez aktivace, Vliv)"
    },
    {
      name: "Budu tě krýt",
      flavor: "Dokáže sprškou šípů krýt postup svého spolubojovníka.",
      description: "Může zaplatit svými zdroji za jinou postavu, která čelí střelbě nebo vrhání. (bez aktivace, Duše)"
    },
    {
      name: "Slavné jméno",
      flavor: "Válečníkovy činy jsou známé v širém okolí.",
      description: "Hráč může určit, že cizí postava zná činy jeho hrdiny z vyprávění. (aktivace: 1 Vliv)"
    }
  ],
  "Vědmák": [
    {
      name: "Znamení Isa",
      flavor: "Klid před bouří, jenž v nestvůře zmrazí krev.",
      description: "Postihuje prokletím těla nemrtvých a běsů. (bez aktivace, Duše)"
    },
    {
      name: "Znamení Fehu",
      flavor: "Mocné gesto, jež probudí v nestvůře plamen stravující ji zevnitř.",
      description: "Sesílá na nemrtvého či běsa silné prokletí trvající do soumraku. (aktivace: 1 Vliv)"
    },
    {
      name: "Zmutované tělo",
      flavor: "Jedy i omamné látky jsou pro něj jako mateřské mléko.",
      description: "Čelí-li účinkům jedu nebo ochromení nestvůry, může podstoupit výzvu bez provedení akce. (bez aktivace, Tělo)"
    },
    {
      name: "Stříbrná zbraň",
      flavor: "Pro živoucí mrtvé je lesk stříbra a jeho ostrý svist smrtící.",
      description: "Postava je mistrem (posílené manévry) v boji zblízka svou speciální stříbrnou zbraní. (bez aktivace, Tělo)"
    }
  ],
  "Alchymista": [
    {
      name: "Mystický ranhojič",
      flavor: "Vrátí život do zkamenělé paže nebo pomůže sténající víle.",
      description: "Odstraňuje následky magie na tělo (zkamenění, kletby) bez znalosti magie. Léčí nadpřirozené bytosti. (aktivace: 1 Duše)"
    },
    {
      name: "Živá voda",
      flavor: "Elixír života, s jehož pomocí lze provádět věci považované za nemožné.",
      description: "Zhojí jinak nevyléčitelnou tělesnou jizvu (vypíchnuté oko, odťatá ruka). (aktivace: 12 surovin)"
    },
    {
      name: "Stvořitel",
      flavor: "Zkoumal tajemství šémů celé roky a nikdo se mu dnes nevyrovná.",
      description: "Mistr ve vytváření umělých bytostí a lámání oživovací magie. (bez aktivace, Vliv)"
    },
    {
      name: "Hračička",
      flavor: "Dodnes vzpomínají na mechanickou myš, která pískala.",
      description: "Postava má u sebe malý, fascinující vynález. (aktivace: 1 Duše)"
    }
  ],
  "Čaroděj": [
    {
      name: "Dračí dech",
      flavor: "Oheň stvořený jeho vůlí taví kov a rozpaluje kámen.",
      description: "Zabíjí ohnivou magií. Oheň má sílu kovářské výhně. (aktivace: 1 Duše)"
    },
    {
      name: "Síla vichřice",
      flavor: "Pouhým máchnutím ruky vyvrátí strom z kořenů.",
      description: "Zabíjí větrnou magií. Pohybuje věcmi, které by uzvedl pouze obr. (aktivace: 1 Duše)"
    },
    {
      name: "Magický štít",
      flavor: "Dokáže odrážet nepřátelská kouzla, i když vzduch kolem jen jiskří magií.",
      description: "Čelí-li nepřátelské magii, může jednou za kolo použít zdarma manévr obrana. (bez aktivace, Tělo)"
    }
  ],
  "Mág": [
    {
      name: "Mámení smyslů",
      flavor: "Iluze, které vytvořil, lze jen těžko odlišit od skutečnosti.",
      description: "Vytváří iluze působící na více smyslů najednou (vyloučen hmat). (aktivace: 1 Duše za každý smysl)"
    },
    {
      name: "Neviditelný loutkář",
      flavor: "Dokáže si člověka podřídit nebo jej provázet jako neviditelný rádce.",
      description: "Ovládá jednání člověka (aktivace: 1 Vliv) nebo s ním hovoří na dálku přes symbolický dotyk (aktivace: 1 Vliv)."
    },
    {
      name: "Davová psychóza",
      flavor: "Dokáže svými slovy přimět celý dav k pokání i k nenávisti.",
      description: "Při myšlenkových kouzlech na dav lidí může použít zdarma manévr rozsáhle. (bez aktivace, Vliv)"
    }
  ]
};

export default classAbilitiesData;