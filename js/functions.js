"use strict";

var cards = [];
var currentCard = null;
var feedback = [];

console.log('load functions.js');

function pageLoaded () {
    console.log('pageLoaded()');
    //loadCardsFromLocalStorage();
    fetchLesson();
    fillScreen();
    console.log('end pageLoaded()');
}

function fetchLesson() {
    addCards();
}

function addCards() {
    console.log('addCards()');
    add("bauen (Präsens, ich ...)", "ich ", "ich baue");
    add("bauen (Präterium, ich ...)", "ich ", "ich baute");
    add("bauen (Perfekt, ich ...)", "ich ", "ich habe gebaut");
    
    add("hören (Präsens, ich ...)", "ich ", "ich höre");
    add("hören (Präterium, ich ...)", "ich ", "ich hörte");
    add("hören (Perfekt, ich ...)", "ich ", "ich habe gehört");
    
    add("heizen (Präsens, ich ...)", "ich ", "ich heize");
    add("heizen (Präterium, ich ...)", "ich ", "ich heizte");
    add("heizen (Perfekt, ich ...)", "ich ", "ich habe geheizt");
    
    add("spülen (Präsens, ich ...)", "ich ", "ich spüle");
    add("spülen (Präterium, ich ...)", "ich ", "ich spülte");
    add("spülen (Perfekt, ich ...)", "ich ", "ich habe gespült");
    
    add("trocknen (Präsens, ich ...)", "ich ", "ich trockne");
    add("trocknen (Präterium, ich ...)", "ich ", "ich trocknete");
    add("trocknen (Perfekt, ich ...)", "ich ", "ich habe getrocknet");

    add("laufen (Präsens, ich ...)", "ich ", "ich laufe");
    add("laufen (Präsens, er ...)", "er ", "er läuft");
    add("laufen (Präterium, ich ...)", "ich ", "ich lief");
    add("laufen (Perfekt, ich ...)", "ich ", "ich bin gelaufen");
    
    add("finden (Präsens, ich ...)", "ich ", "ich finde");
    add("finden (Präterium, ich ...)", "ich ", "ich fand");
    add("finden (Perfekt, ich ...)", "ich ", "ich habe gefunden");
    
    add("treffen (Präsens, ich ...)", "ich ", "ich treffe");
    add("treffen (Präterium, ich ...)", "ich ", "ich traf");
    add("treffen (Perfekt, ich ...)", "ich ", "ich habe getroffen");

    add("schreiben (Präsens, ich ...)", "ich ", "ich schreibe");
    add("schreiben (Präterium, ich ...)", "ich ", "ich schrieb");
    add("schreiben (Perfekt, ich ...)", "ich habe ", "ich habe geschrieben");
    
    add("schlafen (Präsens, ich ...)", "ich ", "ich schlafe");
    add("schlafen (Präterium, ich ...)", "ich ", "ich schlief");
    add("schlafen (Perfekt, ich ...)", "ich habe ", "ich habe geschlafen");
    
    add("geben (Präsens, ich ...)", "ich ", "ich gebe");
    add("geben (Präterium, ich ...)", "ich ", "ich gab");
    add("geben (Perfekt, ich ...)", "ich habe ", "ich habe gegeben");
    
    add("tauchen (Präsens, ich ...)", "ich ", "ich tauche");
    add("tauchen (Präterium, ich ...)", "ich ", "ich tauchte");
    add("tauchen (Perfekt, ich ...)", "ich habe ", "ich habe getaucht");
    
    add("haben (Präsens, ich ...)", "ich ", "ich habe");
    add("haben (Präterium, ich ...)", "ich ", "ich hatte");
    add("haben (Perfekt, ich ...)", "ich ", "ich habe gehabt");
    
    add("machen (Präsens, ich ...)", "ich ", "ich mache");
    add("machen (Präterium, ich ...)", "ich ", "ich machte");
    add("machen (Perfekt, ich ...)", "ich ", "ich habe gemacht");
    
    add("ziehen (Präsens, ich ...)", "ich ", "ich ziehe");
    add("ziehen (Präterium, ich ...)", "ich ", "ich zog");
    add("ziehen (Perfekt, ich ...)", "ich habe", "ich habe gezogen");
    
    add("klingeln (Präsens, ich ...)", "ich ", "ich klingle");
    add("klingeln (Präterium, ich ...)", "ich ", "ich klingelte");
    add("klingeln (Perfekt, ich ...)", "ich ", "ich habe geklingelt");
    
    add("klingen (Präsens, ich ...)", "ich ", "ich klinge");
    add("klingen (Präterium, ich ...)", "ich ", "ich klang");
    add("klingen (Präterium, er ...)", "er ", "er klang");
    add("klingen (Perfekt, ich ...)", "ich ", "ich habe geklungen");
    
    add("rufen (Präsens, ich ...)", "ich ", "ich rufe");
    add("rufen (Präterium, ich ...)", "ich ", "ich rief");
    add("rufen (Perfekt, ich ...)", "ich ", "ich habe gerufen");
    
    add("bedeuten (Präsens, ich ...)", "ich ", "ich bedeute");
    add("bedeuten (Präterium, ich ...)", "ich ", "ich bedeutete");
    add("bedeuten (Perfekt, ich ...)", "ich ", "ich habe bedeutet");
    
    add("bekommen (Präsens, ich ...)", "ich ", "ich bekomme");
    add("bekommen (Präterium, ich ...)", "ich ", "ich bekam");
    add("bekommen (Perfekt, ich ...)", "ich ", "ich habe bekommen");
    
    add("kommen (Präsens, ich ...)", "ich ", "ich komme");
    add("kommen (Präterium, ich ...)", "ich ", "ich kam");
    add("kommen (Perfekt, ich ...)", "ich ", "ich bin gekommen");
    
    add("treiben (Präsens, ich ...)", "ich ", "ich treibe");
    add("treiben (Präsens, er ...)", "er ", "er treibt");
    add("treiben (Präterium, er ...)", "er ", "er trieb");
    add("treiben (Perfekt, er ...)", "er ", "er hat getrieben ");
    
    add("fangen (Präsens, ich ...)", "ich ", "ich fange");
    add("fangen (Präterium, ich ...)", "ich ", "ich fing");
    add("fangen (Perfekt, ich ...)", "ich ", "ich habe gefangen");
    
    add("sein (Präsens, ich ...)", "ich ", "ich bin");
    add("sein (Präterium, ich ...)", "ich ", "ich war");
    add("sein (Perfekt, ich ...)", "ich ", "ich bin gewesen ");
    
    add("werfen (Präsens, ich ...)", "ich ", "ich werfe");
    add("werfen (Präterium, ich ...)", "ich ", "ich warf");
    add("werfen (Perfekt, ich ...)", "ich ", "ich habe geworfen");
    
    add("können (Präsens, ich ...)", "ich ", "ich kann");
    add("können (Präsens, du ...)", "du ", "du kannst");
    add("können (Präterium, ich ...)", "ich ", "ich konnte");
    add("können (Präterium, du ...)", "du ", "du konntest");
    add("können (Perfekt, ich ...)", "ich ", "ich habe gekonnt");
    
    add("kennen (Präsens, ich ...)", "ich ", "ich kenne");
    add("kennen (Präterium, ich ...)", "ich ", "ich kannte");
    add("kennen (Perfekt, ich ...)", "ich ", "ich habe gekannt");
    
    add("erkennen (Präsens, ich ...)", "ich ", "ich erkenne");
    add("erkennen (Präterium, ich ...)", "ich ", "ich erkannte");
    add("erkennen (Perfekt, ich ...)", "ich ", "ich habe erkannt");
    
    add("weißen (Präsens, ich ...)", "ich ", "ich weiße");
    add("weißen (Präterium, ich ...)", "ich ", "ich weißte");
    add("weißen (Perfekt, ich ...)", "ich ", "ich habe geweißt");
    
    add("umwandeln (Präsens, ich ...)", "ich ", "ich wandle um");
    add("umwandeln (Präterium, ich ...)", "ich ", "ich wandelte um");
    add("unwandeln (Perfekt, ich ...)", "ich ", "ich habe umgewandelt");
    
    add("bestimmen (Präsens, ich ...)", "ich ", "ich bestimme");
    add("bestimmen (Präterium, ich ...)", "ich ", "ich bestimmte");
    add("bestimmen (Perfekt, ich ...)", "ich ", "ich habe bestimmt");
    
    add("sehen (Präsens, ich ...)", "ich ", "ich sehe");
    add("sehen (Präterium, ich ...)", "ich ", "ich sah");
    add("sehen (Perfekt, ich ...)", "ich ", "ich habe gesehen");
    
    add("lieben (Präsens, ich ...)", "ich ", "ich liebe");
    add("lieben (Präterium, ich ...)", "ich ", "ich liebte");
    add("lieben (Perfekt, ich ...)", "ich ", "ich habe geliebt");
    
    add("gefallen (Präsens, ich ...)", "ich ", "ich gefalle");
    add("gefallen (Präterium, er ...)", "er ", "er gefällt");
    add("gefallen (Präterium, ich ...)", "ich ", "ich gefiel");
    add("gefallen (Perfekt, ich ...)", "ich ", "ich habe gefallen");
    
    add("fressen (Präsens, er ...)", "er ", "er frisst");
    add("fressen (Präterium, er ...)", "er ", "er fraß");
    add("fressen (Perfekt, er ...)", "er ", "er hat gefressen ");
    
    add("suchen (Präsens, ich ...)", "ich ", "ich suche");
    add("suchen (Präterium, ich ...)", "ich ", "ich suchte");
    add("suchen (Perfekt, ich ...)", "ich ", "ich habe gesucht");
    
    add("dürfen (Präsens, ich ...)", "ich ", "ich darf");
    add("dürfen (Präterium, ich ...)", "ich ", "ich durfte");
    add("dürfen (Perfekt, ich ...)", "ich ", "ich habe gedurft");
    
    add("brauchen (Präsens, ich ...)", "ich ", "ich brauche");
    add("brauchen (Präterium, ich ...)", "ich ", "ich brauchte");
    add("brauchen (Perfekt, ich ...)", "ich ", "ich habe gebraucht");
    
    add("vergiften (Präsens, ich ...)", "ich ", "ich vergifte");
    add("vergiften (Präterium, ich ...)", "ich ", "ich vergiftete");
    add("vergiften (Perfekt, ich ...)", "ich ", "ich habe vergiftet");

    add("müssen (Präsens, ich ...)", "ich ", "ich muss");
    add("müssen (Präterium, ich ...)", "ich ", "ich musste");
    add("müssen (Perfekt, ich ...)", "ich ", "ich habe gemusst");
    
    add("scheinen (Präsens, ich ...)", "ich ", "ich scheine");
    add("scheinen (Präterium, ich ...)", "ich ", "ich schien");
    add("scheinen (Perfekt, ich ...)", "ich ", "ich habe geschienen");
    
    add("entdecken (Präsens, ich ...)", "ich ", "ich entdecke");
    add("entdecken (Präterium, ich ...)", "ich ", "ich entdeckte");
    add("entdecken (Perfekt, ich ...)", "ich ", "ich habe entdeckt");

    add("sich fürchten (Präsens, ich ...)", "ich ", "ich fürchte mich");
    add("sich fürchten (Präterium, ich ...)", "ich ", "ich fürchtete mich");
    add("sich fürchten (Perfekt, ich ...)", "ich ", "ich habe mich gefürchtet");
    
    add("fürchten (Präsens, ich ...)", "ich ", "ich fürchte");
    add("fürchten (Präterium, ich ...)", "ich ", "ich fürchtete");
    add("fürchten (Perfekt, ich ...)", "ich ", "ich habe gefürchtet");

    add("bitten (Präsens, ich ...)", "ich ", "ich bitte");
    add("bitten (Präterium, ich ...)", "ich ", "ich bat");
    add("bitten (Perfekt, ich ...)", "ich ", "ich habe gebeten");
    
    add("sagen (Präsens, ich ...)", "ich ", "ich sage");
    add("sagen (Präterium, ich ...)", "ich ", "ich sagte");
    add("sagen (Perfekt, ich ...)", "ich ", "ich habe gesagt");
    
    add("lesen (Präsens, ich ...)", "ich ", "ich lese");
    add("lesen (Präterium, ich ...)", "ich ", "ich las");
    add("lesen (Perfekt, ich ...)", "ich ", "ich habe gelesen");
    
    add("zeigen (Präsens, ich ...)", "ich ", "ich zeige");
    add("zeigen (Präterium, ich ...)", "ich ", "ich zeigte");
    add("zeigen (Perfekt, ich ...)", "ich ", "ich habe gezeigt");
    
    add("gehen (Präsens, ich ...)", "ich ", "ich gehe");
    add("gehen (Präterium, ich ...)", "ich ", "ich ging");
    add("gehen (Perfekt, ich ...)", "ich ", "ich bin gegangen");
    
    add("wollen (Präsens, ich ...)", "ich ", "ich will");
    add("wollen (Präterium, ich ...)", "ich ", "ich wollte");
    add("wollen (Perfekt, ich ...)", "ich ", "ich habe gewollt");
    
    add("aufhören (Präsens, ich ...)", "ich ", "ich höre auf");
    add("aufhören (Präterium, ich ...)", "ich ", "ich hörte auf ");
    add("aufhören (Perfekt, ich ...)", "ich ", "ich habe aufgehört ");
    
    add("springen (Präsens, ich ...)", "ich ", "ich springe");
    add("springen (Präterium, ich ...)", "ich ", "ich sprang");
    add("springen (Perfekt, ich ...)", "ich ", "ich bin gesprungen");
    
    add("arbeiten (Präsens, ich ...)", "ich ", "ich arbeite");
    add("arbeiten (Präterium, ich ...)", "ich ", "ich arbeitete");
    add("arbeiten (Perfekt, ich ...)", "ich ", "ich habe gearbeitet");
    
    add("antworten (Präsens, ich ...)", "ich ", "ich antworte");
    add("antworten (Präterium, ich ...)", "ich ", "ich antwortete");
    add("antworten (Perfekt, ich ...)", "ich ", "ich habe geantwortet"); 
    
    add("helfen (Präsens, ich ...)", "ich ", "ich helfe");
    add("helfen (Präterium, ich ...)", "ich ", "ich half");
    add("helfen (Perfekt, ich ...)", "ich ", "ich habe geholfen");
    
    add("transportieren (Präsens, ich ...)", "ich ", "ich transportiere");
    add("transportieren (Präterium, ich ...)", "ich ", "ich transportierte");
    add("transportieren (Perfekt, ich ...)", "ich ", "ich habe transportiert");
    
    add("tragen (Präsens, ich ...)", "ich ", "ich trage");
    add("tragen (Präterium, ich ...)", "ich ", "ich trug");
    add("tragen (Perfekt, ich ...)", "ich ", "ich habe getragen");
    
    add("schlagen (Präsens, ich ...)", "ich ", "ich schlage");
    add("schlagen (Präterium, ich ...)", "ich ", "ich schlug");
    add("schlagen (Perfekt, ich ...)", "ich ", "ich habe geschlagen");
    
    add("binden (Präsens, ich ...)", "ich ", "ich binde");
    add("binden (Präterium, ich ...)", "ich ", "ich band");
    add("binden (Perfekt, ich ...)", "ich ", "ich habe gebunden");
    
    add("verbinden (Präsens, ich ...)", "ich ", "ich verbinde");
    add("verbinden (Präterium, ich ...)", "ich ", "ich verband");
    add("verbinden (Perfekt, ich ...)", "ich ", "ich habe verbunden");
    
    add("bringen (Präsens, ich ...)", "ich ", "ich bringe");
    add("bringen (Präterium, ich ...)", "ich ", "ich brachte");
    add("bringen (Perfekt, ich ...)", "ich ", "ich habe gebracht");
    
    add("sitzen (Präsens, ich ...)", "ich ", "ich sitze");
    add("sitzen (Präterium, du ...)", "du ", "du saßest");
    add("sitzen (Präterium, ich ...)", "ich ", "ich saß");
    add("sitzen (Perfekt, ich ...)", "ich ", "ich habe gesessen");
    
    add("schenken (Präsens, ich ...)", "ich ", "ich schenke");
    add("schenken (Präterium, ich ...)", "ich ", "ich schenkte");
    add("schenken (Perfekt, ich ...)", "ich ", "ich habe geschenkt");
    
    add("spielen (Präsens, ich ...)", "ich ", "ich spiele");
    add("spielen (Präterium, ich ...)", "ich ", "ich spielte");
    add("spielen (Perfekt, ich ...)", "ich ", "ich habe gespielt");
    
    add("fahren (Präsens, ich ...)", "ich ", "ich fahre");
    add("fahren (Präterium, ich ...)", "ich ", "ich fuhr");
    add("fahren (Perfekt, ich ...)", "ich ", "ich bin gefahren");
    
    add("waschen (Präsens, ich ...)", "ich ", "ich wasche");
    add("waschen (Präterium, ich ...)", "ich ", "ich wusch");
    add("waschen (Perfekt, ich ...)", "ich ", "ich habe gewaschen");
    
    add("kochen (Präsens, ich ...)", "ich ", "ich koche");
    add("kochen (Präterium, ich ...)", "ich ", "ich kochte");
    add("kochen (Perfekt, ich ...)", "ich ", "ich habe gekocht");
    
    add("packen (Präsens, ich ...)", "ich ", "ich packe");
    add("packen (Präterium, ich ...)", "ich ", "ich packte");
    add("packen (Perfekt, ich ...)", "ich ", "ich habe gepackt");

    add("verkaufen (Präsens, ich ...)", "ich ", "ich verkaufe");
    add("verkaufen (Präterium, ich ...)", "ich ", "ich verkaufte");
    add("verkaufen (Perfekt, ich ...)", "ich ", "ich habe verkauft");
    
    add("stricken (Präsens, ich ...)", "ich ", "ich stricke");
    add("stricken (Präterium, ich ...)", "ich ", "ich strickte");
    add("stricken (Perfekt, ich ...)", "ich ", "ich habe gestrickt");
    
    add("schneiden (Präsens, ich ...)", "ich ", "ich schneide");
    add("schneiden (Präterium, ich ...)", "ich ", "ich schnitt");
    add("schneiden (Perfekt, ich ...)", "ich ", "ich habe geschnitten");
    
    add("regnen (Präsens, es ...)", "es ", "es regnet");
    add("regnen (Präterium, es ...)", "es ", "es regnete");
    add("regnen (Perfekt, es ...)", "es ", "es hat geregnet");
    
    add("marschieren (Präsens, ich ...)", "ich ", "ich marschiere");
    add("marschieren (Präterium, ich ...)", "ich ", "ich marschierte");
    add("marschieren (Perfekt, ich ...)", "ich ", "ich bin marschiert");
    
    add("radieren (Präsens, ich ...)", "ich ", "ich radiere");
    add("radieren (Präterium, ich ...)", "ich ", "ich radierte");
    add("radieren (Perfekt, ich ...)", "ich ", "ich habe radiert");
    
    add("trinken (Präsens, ich ...)", "ich ", "ich trinke");
    add("trinken (Präterium, ich ...)", "ich ", "ich trank");
    add("trinken (Perfekt, ich ...)", "ich ", "ich habe getrunken");
    
    add("ruhen (Präsens, ich ...)", "ich ", "ich ruhe");
    add("ruhen (Präterium, ich ...)", "ich ", "ich ruhte");
    add("ruhen (Perfekt, ich ...)", "ich ", "ich habe geruht");
    
    add("telefonieren (Präsens, ich ...)", "ich ", "ich telefoniere");
    add("telefonieren (Präterium, ich ...)", "ich ", "ich telefonierte");
    add("telefonieren (Perfekt, ich ...)", "ich ", "ich habe telefoniert");
    
    add("schwimmen (Präsens, ich ...)", "ich ", "ich schwimme");
    add("schwimmen (Präterium, ich ...)", "ich ", "ich schwamm");
    add("schwimmen (Perfekt, ich ...)", "ich ", "ich bin geschwommen");
    
    add("treten (Präsens, ich ...)", "ich ", "ich trete");
    add("treten (Präterium, ich ...)", "ich ", "ich trat");
    add("treten (Perfekt, ich ...)", "ich ", "ich habe getreten");
    
    add("reisen (Präsens, ich ...)", "ich ", "ich reise");
    add("reisen (Präterium, ich ...)", "ich ", "ich reiste");
    add("reisen (Perfekt, ich ...)", "ich ", "ich bin gereist");
    
    add("krähen (Präsens, er ...)", "er ", "er kräht");
    add("krähen (Präterium, er ...)", "er ", "er krähte");
    add("krähen (Perfekt, er ...)", "er ", "er hat gekräht");
    
    add("schneien (Präsens, es ...)", "es ", "es schneit");
    add("schneien (Präterium, es ...)", "es ", "es schneite");
    add("schneien (Perfekt, es ...)", "es ", "es hat geschneit");
    
    add("backen (Präsens, ich ...)", "ich ", "ich backe");
    add("backen (Präterium, ich ...)", "ich ", "ich buk");  // auch ich backte
    add("backen (Perfekt, ich ...)", "ich ", "ich habe gebacken");
    
    add("malen (Präsens, ich ...)", "ich ", "ich male");
    add("malen (Präterium, ich ...)", "ich ", "ich malte");
    add("malen (Perfekt, ich ...)", "ich ", "ich habe gemalt");
    
    add("lachen (Präsens, ich ...)", "ich ", "ich lache");
    add("lachen (Präterium, ich ...)", "ich ", "ich lachte");
    add("lachen (Perfekt, ich ...)", "ich ", "ich habe gelacht");
    
    add("frühstücken (Präsens, ich ...)", "ich ", "ich frühstücke");
    add("frühstücken (Präterium, ich ...)", "ich ", "ich frühstückte");
    add("frühstücken (Perfekt, ich ...)", "ich ", "ich habe gefrühstückt");
    
    add("blättern (Präsens, ich ...)", "ich ", "ich blättere");   // auch blättre
    add("blättern (Präterium, ich ...)", "ich ", "ich blätterte");
    add("blättern (Perfekt, ich ...)", "ich ", "ich habe geblättert");
    
    add("schmieren (Präsens, ich ...)", "ich ", "ich schmiere");
    add("schmieren (Präterium, ich ...)", "ich ", "ich schmierte");
    add("schmieren (Perfekt, ich ...)", "ich ", "ich habe geschmiert");
        
    add("verkleiden (Präsens, ich ...)", "ich ", "ich verkleide");
    add("verkleiden (Präterium, ich ...)", "ich ", "ich verkleidete");
    add("verkleiden (Perfekt, ich ...)", "ich ", "ich habe verkleidet");
    
    add("schlendern (Präsens, ich ...)", "ich ", "ich schlendere");
    add("schlendern (Präterium, ich ...)", "ich ", "ich schlenderte");
    add("schlendern (Perfekt, ich ...)", "ich ", "ich bin geschlendert");
    
    add("beißen (Präsens, er ...)", "er ", "er beißt");
    add("beißen (Präterium, er ...)", "er ", "er biss");
    add("beißen (Perfekt, er ...)", "er ", "er hat gebissen");

    add("fallen (Präsens, ich ...)", "ich ", "ich falle");
    add("fallen (Präterium, ich ...)", "ich ", "ich fiel");
    add("fallen (Perfekt, ich ...)", "ich ", "ich bin gefallen");
    
    add("erfinden (Präsens, ich ...)", "ich ", "ich erfinde");
    add("erfinden (Präterium, ich ...)", "ich ", "ich erfand");
    add("erfinden (Perfekt, ich ...)", "ich ", "ich habe erfunden");
    
    add("drehen (Präsens, ich ...)", "ich ", "ich drehe");
    add("drehen (Präterium, ich ...)", "ich ", "ich drehte");
    add("drehen (Perfekt, ich ...)", "ich ", "ich habe gedreht");
    
    add("stehen (Präsens, ich ...)", "ich ", "ich stehe");
    add("stehen (Präterium, ich ...)", "ich ", "ich stand");
    add("stehen (Perfekt, ich ...)", "ich ", "ich habe gestanden");
    
    add("wegrennen (Präsens, ich ...)", "ich ", "ich renne weg");
    add("wegrennen (Präterium, ich ...)", "ich ", "ich rannte weg");
    add("wegrennen (Perfekt, ich ...)", "ich ", "ich bin weggerannt");
    
    add("rennen (Präsens, ich ...)", "ich ", "ich renne");
    add("rennen (Präterium, ich ...)", "ich ", "ich rannte");
    add("rennen (Perfekt, ich ...)", "ich ", "ich bin gerannt");
    
    add("schreien (Präsens, ich ...)", "ich ", "ich schreie");
    add("schreien (Präterium, ich ...)", "ich ", "ich schrie");
    add("schreien (Perfekt, ich ...)", "ich ", "ich habe geschrien");
    
    add("fühlen (Präsens, ich ...)", "ich ", "ich fühle");
    add("fühlen (Präterium, ich ...)", "ich ", "ich fühlte");
    add("fühlen (Perfekt, ich ...)", "ich ", "ich habe gefühlt");
    
    add("aufwachen (Präsens, ich ...)", "ich ", "ich wache auf");
    add("aufwachen (Präterium, ich ...)", "ich ", "ich wachte auf");
    add("aufwachen (Perfekt, ich ...)", "ich ", "ich bin aufgewacht");
    
    add("denken (Präsens, ich ...)", "ich ", "ich denke");
    add("denken (Präterium, ich ...)", "ich ", "ich dachte");
    add("denken (Perfekt, ich ...)", "ich ", "ich habe gedacht");
        
    add("geschehen (Präsens, es ...)", "es ", "es geschieht");
    add("geschehen (Präterium, es ...)", "es ", "es geschah");
    add("geschehen (Perfekt, es ...)", "es ", "es ist geschehen");
    
    add("wissen (Präsens, ich ...)", "ich ", "ich weiß");
    add("wissen (Präterium, ich ...)", "ich ", "ich wusste");
    add("wissen (Perfekt, ich ...)", "ich habe ", "ich habe gewusst")
    
    add("essen (Präsens, ich ...)", "ich ", "ich esse");
    add("essen (Präterium, ich ...)", "ich ", "ich aß");
    add("essen (Perfekt, ich ...)", "ich habe ", "ich habe gegessen");
    
    add("fliegen (Präsens, ich ...)", "ich ", "ich fliege");
    add("fliegen (Präterium, ich ...)", "ich ", "ich flog");
    add("fliegen (Perfekt, ich ...)", "ich ", "ich bin geflogen");
    
    add("halten (Präsens, ich ...)", "ich ", "ich halte");
    add("halten (Präterium, ich ...)", "ich ", "ich hielt");
    add("halten (Perfekt, ich ...)", "ich ", "ich habe gehalten");
    
    add("heben (Präsens, ich ...)", "ich ", "ich hebe");
    add("heben (Präterium, ich ...)", "ich ", "ich hob");
    add("heben (Perfekt, ich ...)", "ich ", "ich habe gehoben");
    
    add("pfeifen (Präsens, ich ...)", "ich ", "ich pfeife");
    add("pfeifen (Präterium, ich ...)", "ich ", "ich pfiff");
    add("pfeifen (Perfekt, ich ...)", "ich ", "ich habe gepfiffen");   
    
    add("singen (Präsens, ich ...)", "ich ", "ich singe");
    add("singen (Präterium, ich ...)", "ich ", "ich sang");
    add("singen (Perfekt, ich ...)", "ich ", "ich habe gesungen");    
    
    add("steigen (Präsens, ich ...)", "ich ", "ich steige");
    add("steigen (Präterium, ich ...)", "ich ", "ich stieg");
    add("steigen (Perfekt, ich ...)", "ich ", "ich bin gestiegen");    
    
    add("nehmen (Präsens, ich ...)", "ich ", "ich nehme");
    add("nehmen (Präterium, ich ...)", "ich ", "ich nahm");
    add("nehmen (Perfekt, ich ...)", "ich ", "ich habe genommen");
    
    add("übernehmen (Präsens, ich ...)", "ich ", "ich übernehme");
    add("übernehmen (Präterium, ich ...)", "ich ", "ich übernahm");
    add("übernehmen (Perfekt, ich ...)", "ich ", "ich habe übernommen");
    
    add("tun (Präsens, ich ...)", "ich ", "ich tue");
    add("tun (Präterium, ich ...)", "ich ", "ich tat");
    add("tun (Perfekt, ich ...)", "ich ", "ich habe getan");
    
    add("werden (Präsens, ich ...)", "ich ", "ich werde");
    add("werden (Präterium, ich ...)", "ich ", "ich wurde");
    add("werden (Perfekt, ich ...)", "ich ", "ich bin geworden");
    
    add("hängen (Präsens, er ...)", "er ", "er hängt");
    add("hängen (Präterium, er ...)", "er ", "er hing");
    add("hängen (Perfekt, er ...)", "er ", "er hat gehangen");   
    
    add("helfen (Präsens, ich ...)", "ich ", "ich helfe");
    add("helfen (Präterium, ich ...)", "ich ", "ich half");
    add("helfen (Perfekt, ich ...)", "ich ", "ich habe geholfen");
    
    add("lassen (Präsens, ich ...)", "ich ", "ich lasse");
    add("lassen (Präterium, ich ...)", "ich ", "ich ließ");
    add("lassen (Perfekt, ich ...)", "ich ", "ich habe gelassen"); 
    
    add("lügen (Präsens, ich ...)", "ich ", "ich lüge");
    add("lügen (Präterium, ich ...)", "ich ", "ich log");
    add("lügen (Perfekt, ich ...)", "ich ", "ich habe gelogen");  
    
    add("liegen (Präsens, ich ...)", "ich ", "ich liege");
    add("liegen (Präterium, ich ...)", "ich ", "ich lag");
    add("liegen (Perfekt, ich ...)", "ich ", "ich habe gelegen");    
    
    add("heißen (Präsens, er ...)","er ","er heißt");
    add("heißen (Präsens, ich ...)","er ","ich heiße");
    add("heißen (Präterium, ich ...)", "ich ", "ich hieß");
    add("heißen (Perfekt, ich ...)", "ich ", "ich habe geheißen");  
    
    add("beginnen (Präsens, er ...)","er ","er beginnt");
    add("beginnen (Präsens, wir ...)","wir ","wir beginnen");
    add("beginnen (Präsens, ihr ...)","ihr ","ihr beginnt");
    add("beginnen (Präsens, Sie ...)","Sie ","Sie beginnen");
    
    add("verlieren (Präsens, er ...)","er ","er verliert");
    add("verlieren (Präsens, ich ...)","ich ","ich verliere");
    add("verlieren (Präterium, er ...)","er ","er verlor");
    add("verlieren (Präterium, ich ...)","ich ","ich verlor");
    add("verlieren (Perfekt, er ...)","er ","er hat verloren");
    add("verlieren (Perfekt, ich ...)","ich ","ich habe verloren");
    add("verlieren (Perfekt, wir ...)","wir ","wir haben verloren");
    
    add("bleiben (Präsens, er ...)","er ","er bleibt");
    add("er bleibt (Präterium, er ...)","er ","er blieb");
    add("ich blieb (Präsens, ich ...)","ich ","ich bleibe");
    
    add("springen (Präsens, er ...)","er ","er springt");
    add("springen (Präterium, er ...)","er ","er sprang");
    
    add("geben (Präsens, ich ...)","ich ","ich gebe");
    add("geben (Präsens, er ...)","er ","er gibt");
    add("geben (Präterium, er ...)","er ","er gab");
    add("geben (Perfekt, er ...)","er ","er hat gegeben");
    
    add("lernen (Präsens, ich ...)", "ich ", "ich lerne");
    add("lernen (Präterium, ich ...)", "ich ", "ich lernte");
    
    add("trinken (Präsens, ich ...)", "ich ", "ich trinke");
    add("trinken (Präterium, ich ...)", "ich ", "ich trank");
    add("trinken (Perfekt, ich ...)", "ich ", "ich habe getrunken");
    
    add("essen (Präterium, ich ...)", "ich ", "ich aß");
    add("essen (Präsens, ich ...)", "ich ", "ich esse");
    add("essen (Präsens, wir ...)", "wir ", "wir essen");
    
    add("beißen (Präsens, er ...)", "er ", "er beißt");
    add("beißen (Präterium, er ...)", "er ", "er biss");
    
    add("gehen (Präsens, ich ...)", "ich ", "ich gehe");
    add("gehen (Präterium, ich ...)", "ich ", "ich ging");
}

function inspectLesson() {
    alert(JSON.stringify(cards));
}

function inspectFeedback() {
    alert(JSON.stringify(feedback));
}

function add(question, answerHint, answer) {
    let card = {
        question: question, 
        answerHint: answerHint, 
        answer: answer,
        numberOfCorrectAnswers: 0,
        numberOfWrongAnswers: 0
        };
    cards.push(card)
}
function saveCardsToLocalStorage() {
    console.log('saveCardsToLocalStorage()');
    localStorage.setItem("cards", JSON.stringify(cards));
}

function loadCardsFromLocalStorage() {
    console.log("loadCardsFromLocalStorage()");
    cards = JSON.parse(localStorage.getItem("cards"));
    if (!cards)
        cards = []
}

function fillScreen() {
    console.log('fillScreen()');
    if (! cards.length) {
        console.log('No cards available');
        alert('No cards available');
        return;
    }
    setCurrentCard(cards[0]);
}

function setCurrentCard(card) {
    console.log('setCurrentCard()');
    console.log('question=%o', card.question);
    currentCard = card;
    $('.question').text(card.question);
    $('.answer').val(card.answerHint);
    console.log('end setCurrentCard()');
}

function processAnswer() {
    console.log("processAnswer()");
    let answer = $('.answer').val();
    console.log("answer=%o", answer);
    answer = preprocessAnswer(answer);    
    if (!hasAnswer(answer)) {
        reportMissingAnswer(answer);
    } else if (isAcceptableAnswer(answer)) {
        reportCorrectAnswer(answer)
    } else {
        reportWrongAnswer(answer);
    }
}

function preprocessAnswer(aString) {
    // Replace multiple white characters with a single space.
    return aString.trim().replace(/\s+/g, ' ');
}

function hasAnswer(answer) {
    if (answer == "") return false;
    return true;
}

function isAcceptableAnswer(answer) {
    return (answer == currentCard.answer);
}

function reportMissingAnswer(answer) {
    console.log("reportCorrectAnswer(%o)", answer);
    $(".feedback").html('<font color="black">Gib bitte zuerst deine Antwort ein.</font>');}

function reportCorrectAnswer(answer) {
    console.log("reportCorrectAnswer(%o)", answer);
    $(".feedback").html('<font color="darkgreen">Die Antwort ist richtig.</font>');
    currentCard.numberOfCorrectAnswers += 1;
    addFeedback({
        isCorrect: true,
        question: currentCard.question,
        userAnswer: answer,
        answer: currentCard.answer});
    moveCurrentCard();
}

function reportWrongAnswer(answer) {
    console.log("reportWrongAnswer(%o)", answer);
    $(".feedback").html('<font color="red" weight="bold">Die Antwort ist leider noch nicht richtig.</font>')
    currentCard.numberOfCorrectAnswers -= 2;  
    if (currentCard.numberOfCorrectAnswers) {
        currentCard.numberOfCorrectAnswers = 0;
    }
    addFeedback({
        isCorrect: false,
        question: currentCard.question,
        userAnswer: answer,
        answer: currentCard.answer});
}
    
function addFeedback(aRecord) {
    console.log("addFeedback()");
    feedback.unshift(aRecord);
    var html = '<table>';
    html += '<thead><tr>';
    html += '<th>Frage</th>';
    html += '<th>Deine Antwort</th>';
    html += '<th>Richtige Antwort</th>';
    html += '</tr></thead>';
      
    for (var i in feedback) {
        html += '<tr>';
        html += '<td>';
        html += feedback[i].question;
        html += '</td>';
        if (feedback[i].isCorrect) 
            html += '<td class="correct-feedback">';
        else
            html += '<td class="wrong-feedback">';
        html += feedback[i].userAnswer;
        html += '</td>';
        html += '<td>';
        html += feedback[i].answer;
        html += '</td>';
        html += '</tr>';
    }
    html += '</table>';
    $(".feedback").append(html);
    console.log("end addFeedback()");
}

function moveCurrentCard() {
    console.log("moveCurrentCard()");
    let card = cards.shift();
    console.log("Shifted card %o", card.question);
    cards.push(card);
    fillScreen();
    console.log("end moveCurrentCard()");
}

