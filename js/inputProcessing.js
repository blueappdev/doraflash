"use strict";

console.log('inputProcessing.js - begin');

var registeredInputProcessors = {};

// Class DefaultInputProcessor class
function DefaultInputProcessor() {
    console.log("DefaultInputProcessor");
    this.name = "default";
};

DefaultInputProcessor.prototype.register = function() {
    registeredInputProcessors[this.name] = this;
};

DefaultInputProcessor.prototype.reasonForInvalidPrecheck = function(event, str) {
    return "";
};

DefaultInputProcessor.prototype.getInputPlaceHolder = function() {
    return "";
};

DefaultInputProcessor.prototype.processInput = function(event) {
};

DefaultInputProcessor.prototype.processKeyPressed = function(event) {
};

//console.log((new DefaultInputProcessor()).register());
(new DefaultInputProcessor()).register();

// Class PinyinInputProcessor inherits from DefaultInputProcessor
function PinyinInputProcessor() {
    console.log("PinyinInputProcessor");
    DefaultInputProcessor.call(this);
    this.name = "pinyin";
};
PinyinInputProcessor.prototype = Object.create(DefaultInputProcessor.prototype);
PinyinInputProcessor.prototype.constructor = PinyinInputProcessor;

PinyinInputProcessor.prototype.processKeyPressed = function(event) {
    var target = event.target || event.srcElement;
    var replacedChar = 'v';
    var replacement = 'ü';
    var moveCursorBy = replacement.length - replacedChar.length;

    // event.which == 118 for Safari for ipad
    if (event.key == replacedChar || event.which == 118) {
        event.preventDefault();
        // IE
        if (document.selection) {
            // Determines the selected text. If no text selected, the location of the cursor in the text is returned
            var range = document.selection.createRange();
            // Place the replacement on the location of the selection, and remove the data in the selection
            range.text = replacement;
            // Chrome + FF
        } else if (target.selectionStart || target.selectionStart == '0') {
            var start = target.selectionStart;
            var end = target.selectionEnd;
            target.value = target.value.substring(0, start) + replacement
                + target.value.substring(end, target.value.length);
            target.selectionStart = start + moveCursorBy + 1;
            target.selectionEnd = start + moveCursorBy + 1;
        } else {
            target.value = target.value + replacement;
        }
        return false;
    }
};

PinyinInputProcessor.prototype.accentsMapping = [
    'AĀÁǍÀ',
    'aāáǎà',
    'EĒÉĚÈ',
    'eēéěè',
    'IĪÍǏÌ',
    'iīíǐì',
    'OŌÓǑÒ',
    'oōóǒò',
    'UŪÚǓÙ',
    'uūúǔù',
    'ÜǕǗǙǛ',
    'üǖǘǚǜ'
];

PinyinInputProcessor.prototype.allSyllables = [
    "ba", "pa", "ma", "fa", "da", "ta", "na", "la", "ga", "ka", "ha", "za", "ca",
    "sa", "zha", "cha", "sha", "a", "bo", "po", "mo", "fo", "o", "me", "de", "te",
    "ne", "le", "ge", "ke", "he", "ze", "ce", "se", "zhe", "che", "she", "re", 
    "e", "bai", "pai", "mai", "dai", "tai", "nai", "lai", "gai", "kai", "hai", 
    "zai", "cai", "sai", "zhai", "chai", "shai", "ai", "bei", "pei", "mei", "fei", 
    "dei", "tei", "nei", "lei", "gei", "kei", "hei", "zei", "zhei", "shei", "ei", 
    "bao", "pao", "mao", "dao", "tao", "nao", "lao", "gao", "kao", "hao", "zao", 
    "cao", "sao", "zhao", "chao", "shao", "rao", "ao", "pou", "mou", "fou", "dou", 
    "tou", "nou", "lou", "gou", "kou", "hou", "zou", "cou", "sou", "zhou", "chou", 
    "shou", "rou", "ou", "ban", "pan", "man", "fan", "dan", "tan", "nan", "lan", 
    "gan", "kan", "han", "zan", "can", "san", "zhan", "chan", "shan", "ran", "an", 
    "bang", "pang", "mang", "fang", "dang", "tang", "nang", "lang", "gang", "kang", 
    "hang", "zang", "cang", "sang", "zhang", "chang", "shang", "rang",  "ang",
    "ben", "pen", "men", "fen", "den", "nen", "gen", "ken", "hen", "zen", "cen", 
    "sen", "zhen", "chen", "shen", "ren", "en", "beng", "peng", "meng", "feng", 
    "deng", "teng", "neng", "leng", "geng", "keng", "heng", "zeng", "ceng", "seng", 
    "zheng", "cheng", "sheng", "reng", "eng", "dong", "tong", "nong", "long", "gong", 
    "kong", "hong", "zong", "cong", "song", "zhong", "chong", "rong", "bu", "pu", 
    "mu", "fu", "du", "tu", "nu", "lu", "gu", "ku", "hu", "zu", "cu", "su", "zhu", 
    "chu", "shu", "ru", "wu", "gua", "kua", "hua", "zhua", "chua", "shua", "rua", 
    "wa", "duo", "tuo", "nuo", "luo", "guo", "kuo", "huo", "zuo", "cuo", "suo", "zhuo", 
    "chuo", "shuo", "ruo",  "wo", "guai", "kuai", "huai", "zhuai", "chuai", "shuai", 
    "wai", "dui", "tui", "gui", "kui", "hui", "zui", "cui", "sui", "zhui", "chui", 
    "shui", "rui",  "wei", "duan", "tuan", "nuan", "luan", "guan", "kuan", "huan", 
    "zuan", "cuan", "suan", "zhuan", "chuan", "shuan", "ruan", "wan", "guang", "kuang", 
    "huang",  "zhuang", "chuang", "shuang", "wang", "dun", "tun", "nun", "lun", "gun", 
    "kun", "hun", "zun", "cun", "sun", "zhun", "chun", "shun", "run", "wen", "weng",
    "bi", "pi", "mi", "di", "ti", "ni", "li", "zi", "ci", "si", "zhi", "chi", 
    "shi", "ri", "ji", "qi", "xi", "yi", "dia",  "lia",  "jia", "qia", "xia", "ya",
    "bie", "pie", "mie", "die", "tie", "nie", "lie", "jie", "qie", "xie", "ye",
    "biao", "piao", "miao", "diao", "tiao", "niao", "liao", "jiao", "qiao", "xiao", 
    "yao", "miu", "diu", "niu", "liu", "jiu", "qiu", "xiu", "you", "bian", "pian", 
    "mian", "dian", "tian", "nian", "lian", "jian", "qian", "xian", "yan", "niang", 
    "liang", "jiang", "qiang", "xiang", "yang", "bin", "pin", "min", "nin", "lin", 
    "jin", "qin", "xin", "yin", "bing", "ping", "ming", "ding", "ting", "ning", "ling",  
    "jing", "qing", "xing", "ying", "jiong", "qiong", "xiong", "yong", "nü", "lü", "ju", 
    "qu", "xu", "yu", "nüe", "lüe", "jue", "que", "xue", "yue", "juan", "quan", "xuan", 
    "yuan", "jun", "qun", "xun", "yun", "banr", "pir", "mianr", "fur", "dianr", "dingr", 
    "tangr", "tuir", "nar", "nür", "ger", "ganr", "kour", "kongr", "hair", "haor", 
    "huar", "huor", "huir", "jinr", "xiar", "xianr", "zher", "shir", "shuir", "wanr", 
    "wor", "er"
];

PinyinInputProcessor.prototype.allFinals  = [
    "a", "o", "e", "i", "u", "ü",
    "ai", "ei", "ao", "ou", "an",
    "ang", "en", "eng", "ong",
    "ua", "uo", "uai", "ui", "uan",
    "an", "uang", "un", "en", "eng",
    "ia", "bie", "iao", "iu", "ian",
    "iang", "in", "ing", "iong", "ong", 
    "nüe", "ue", "anr", "ir", "ianr", "ur", 
    "ianr", "ingr", "angr", "uir", "ar", "ür", 
    "er", "anr", "our", "ongr", "air", "aor",
    "uar", "uor", "uir", "inr", "iar", "ianr", 
    "er", "ir", "uir", "anr",
    "or", "er"
];

/*
 * getBasicSyllable()
 *
 * Get the longest syllable from the argument.
 * No attempt is made to adjust for ambiguous cases.
 * Pinyin syllables can have up to six characters (e.g. chuang).
 */
PinyinInputProcessor.prototype.getBasicSyllable = function (str) {
    for(var i = 6; i > 0; i--) {
        var candidate = str.substring(0, i);
        var strippedCandidate = this.removeAccents(candidate.toLowerCase());
        if (this.allSyllables.includes(strippedCandidate)) {
            return candidate;
        }
    }
    return null;
}

/* 
 * getSyllable()
 *
 * Get a syllable from the argument and try to resolve ambiguous cases.
 * bangongshi needs special treatment of o
 */
PinyinInputProcessor.prototype.getSyllable = function (str) {
    var candidate = this.getBasicSyllable(str);
    console.log("Basic candidate %o", candidate);
    if (!candidate) {
        console.log("getSyllable() returns %o", candidate);
        return candidate;
    }
    console.log("check1");
    if (["n", "g", "r"].includes(candidate[candidate.length - 1])) {
        console.log("check2");
        var rest = str.substring(candidate.length);
        console.log("Rest from %o %o", candidate.length, rest);
        var nextSyllable = this.getBasicSyllable(rest);        
        console.log("Next1 %o", nextSyllable);
        if (! nextSyllable || this.removeAccents(nextSyllable.toLowerCase()) == "o") {
            console.log("check3");
            var rest = str.substring(candidate.length - 1);
            var nextSyllable = this.getBasicSyllable(rest);
            console.log("Next2 %o", candidate);
            if (nextSyllable) {
                candidate = candidate.substring(0, candidate.length - 1);
            }
        }
    }
    console.log("getSyllable() returns %o", candidate);
    return candidate;
}

PinyinInputProcessor.prototype.isPinyin = function (str) {
    var syllable = this.getSyllable(str);
    console.log("isPinyin.1: %o", syllable);
    while (syllable) {
        str = str.substring(syllable.length);

        syllable = this.getSyllable(str);
    }
    return (str == "");
}

PinyinInputProcessor.prototype.splitPinyin = function (str) {
    var syllables = [];
    var syllable = this.getSyllable(str);
    while (syllable) {
        syllables.push(syllable);
        str = str.substring(syllable.length);
        syllable = this.getSyllable(str);
    }
    return 'abc'; //syllables.join(" ");
}

PinyinInputProcessor.prototype.isPinyinVowel = function(ch) {
    for (var i = 0; i < this.accentsMapping.length; i++) {
        if (this.accentsMapping[i].indexOf(ch) >= 0) return true;
    }
    return false;
}

PinyinInputProcessor.prototype.findAccentsRow = function(ch) {
    for (var i = 0; i < this.accentsMapping.length; i++) {
        var row = this.accentsMapping[i];
        if (row.indexOf(ch) >= 0) return row;
    }
    return null;
}

PinyinInputProcessor.prototype.removeAccents = function(s) {
    var result = "";
    for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        var row = this.findAccentsRow(ch);
        var withoutAccent = row ? row[0] : ch;
        result += withoutAccent;
    }
    return result;
}

PinyinInputProcessor.prototype.addAccent = function(final, toneNumber) {
    console.log("addAccent final=%o", final);
    final = this.removeAccents(final);
    var positionOfToneCarrier;
    if (["iu", "ui" ].includes(final.toLowerCase()))
        positionOfToneCarrier = 1;
    else
        positionOfToneCarrier = final.indexOf("a");
        if (positionOfToneCarrier == -1) 
            positionOfToneCarrier = final.indexOf('o');
        if (positionOfToneCarrier == -1) 
            positionOfToneCarrier = final.indexOf('e');
        if (positionOfToneCarrier == -1) 
            positionOfToneCarrier = 0;
    var toneCarrier = final[positionOfToneCarrier];
    var row = this.findAccentsRow(toneCarrier);
    if (! row) return null;
    var accentedCharacter = row[toneNumber];
    return (final.substring(0, positionOfToneCarrier) 
        + accentedCharacter 
        + final.substring(positionOfToneCarrier+1));
}

PinyinInputProcessor.prototype.convertToneNumber = function(widget, toneNumber) {
    var s = widget.value;
    var start = widget.selectionStart;
    var end = widget.selectionEnd;
    var positionOfToneNumber = s.indexOf(toneNumber);
    if (positionOfToneNumber == -1) return; 
    // console.log("position of tone number %o is %o.", toneNumber, positionOfToneNumber);
    var endOfFinal = positionOfToneNumber - 1;
    if (endOfFinal < 0) return;
    var startOfFinal = endOfFinal;
    if (startOfFinal >= 0 && s[startOfFinal] == "r") startOfFinal--;
    if (startOfFinal >= 0 && s[startOfFinal] == "g") startOfFinal--;
    if (startOfFinal >= 0 && s[startOfFinal] == "n") startOfFinal--;
    while (startOfFinal >= 0 && this.isPinyinVowel(s[startOfFinal])) {
        startOfFinal--;
    }
    startOfFinal++;
    var oldFinal = this.removeAccents(s.substring(startOfFinal, endOfFinal+1));
    console.log("original oldFinal %o", oldFinal);
    while (oldFinal != "" && !this.allFinals.includes(oldFinal)) {
        startOfFinal++;
        oldFinal = this.removeAccents(s.substring(startOfFinal, endOfFinal+1));
    }
    console.log("adjusted oldFinal %o", oldFinal);
    var newFinal = this.addAccent(oldFinal, toneNumber);
    // console.log("newFinal %o", newFinal);
    if (!newFinal) return;

    var newValue = s.substring(0, startOfFinal) 
        + newFinal
        + s.substring(positionOfToneNumber + 1);

    widget.value = newValue;
    widget.selectionEnd = positionOfToneNumber;
}

PinyinInputProcessor.prototype.convertAccents = function(widget) {
    for (var toneNumber = 0; toneNumber <= 4; toneNumber++) {
        this.convertToneNumber(widget, toneNumber);
    }
}

PinyinInputProcessor.prototype.processInput = function(event) {
    // console.log("PinyinInputProcessor>>processInput");
    var widget = document.getElementById("answer");
    var actualAnswer = widget.value;
    if (actualAnswer === "") {
        $("#answer").removeClass("wrong");
    }
    var changedAnswer = actualAnswer;
    changedAnswer = changedAnswer.replace(/v/g,"ü");
    changedAnswer = changedAnswer.replace(/V/g,"Ü");
    if (actualAnswer !== changedAnswer) {
        var start = widget.selectionStart;
        var end = widget.selectionEnd;
        widget.value = changedAnswer;
        widget.selectionStart = start;
        widget.selectionEnd = end;
    }
    this.convertAccents(widget);
};

PinyinInputProcessor.prototype.getInputPlaceHolder = function() {
    return "<pinyin>";
};

PinyinInputProcessor.prototype.reasonForInvalidPrecheck = function(str) {
    // should call super
    if (!this.isPinyin(str)) return "Das ist doch kein Pinyin."
    return "";
};

(new PinyinInputProcessor()).register();

// Class ChineseInputProcessor inherits from DefaultInputProcessor
function ChineseInputProcessor() {
    console.log("ChineseInputProcessor");
    DefaultInputProcessor.call(this);
    this.name = "chinese";
};
ChineseInputProcessor.prototype = Object.create(DefaultInputProcessor.prototype);
ChineseInputProcessor.prototype.constructor = ChineseInputProcessor;

ChineseInputProcessor.prototype.processKeyPressed = function(event, widget) {
};

ChineseInputProcessor.prototype.reasonForInvalidPrecheck = function(str) {
    // should call super
    if (str.match(/[a-z]/i)) return "Eine Pinyin Antwort wurde eingegeben. Bitte Chinesisch eingeben."
    return "";
};

(new ChineseInputProcessor()).register();


console.log('inputProcessing.js - end');
