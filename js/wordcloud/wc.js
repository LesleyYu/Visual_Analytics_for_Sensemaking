// const WordCloud = require("./wordcloud");

// console.log("this is use word cloud.js");

let list = [];
let list3= []

async function getWordList() {
  
  // ----- method 1 -----
  // use word list from word frequency count:
  // const response = await fetch('../js/wordcloud/wordsFreq.json');

  // ----- method 2 -----
  // use word list from keywords extraction (NLP):
  const response = await fetch('../js/wordcloud/keywords.json');
  const data = await response.json();
  return data;

}

getWordList().then ( (data) => {
  const wordList = data;
  console.log(wordList);
  
  // convert Object `wordList` into `list`
  list = Object.entries(wordList);

  // ----- method 3 -----
  // backup data for word list
  list_lesMes = [
    ["Les Misérables", 30.1, "http://google.com?q=foo"],
    ["Victor Hugo", 20],
    ["Jean Valjean", 15],
    ["Javert", 15],
    ["Fantine", 15],
    ["Cosette", 15],
    ["Éponine", 12],
    ["Marius", 12],
    ["Enjolras", 12],
    ["Thénardiers", 10],
    ["Gavroche", 10],
    ["Bishop Myriel", 10],
    ["Patron-Minette", 10],
    ["God", 10],
    ["ABC Café", 8],
    ["Paris", 8],
    ["Digne", 8],
    ["Elephant of the Bastille", 9],
    ["silverware", 5],
    ["Bagne of Toulon", 5],
    ["loaf of bread", 5],
    ["Rue Plumet", 5],
    ["revolution", 5],
    ["barricade", 5],
    ["sewers", 4],
    ["Fex urbis lex orbis", 4],
  ];

  // !!!!!!!!! TO-DO    NLP word emotion
  function setFontColor() {
    console.log("this is setFontColor()");
    // (['#d0d0d0', '#e11', '#44f'])[Math.floor(Math.random() * 3)] // theme 1
  }

  // !!!!!!!!! TO-DO    NLP word emotion
  function setBGColor() {
    console.log("this is setBGColor()");
  }

  // optional. This is the default
  function setShape() {
    // Function for simple shapes can be generated manually with http://timdream.org/wordcloud2.js/shape-generator.html.
    var max = 1026;
    var leng = [
      290, 296, 299, 301, 305, 309, 311, 313, 315, 316, 318, 321, 325, 326, 327,
      328, 330, 330, 331, 334, 335, 338, 340, 343, 343, 343, 346, 349, 353, 356,
      360, 365, 378, 380, 381, 381, 381, 391, 394, 394, 395, 396, 400, 400, 408,
      405, 400, 400, 400, 401, 401, 403, 404, 405, 408, 410, 413, 414, 414, 415,
      416, 418, 420, 423, 425, 430, 435, 440, 446, 456, 471, 486, 544, 541, 533,
      532, 533, 537, 540, 537, 535, 535, 533, 546, 543, 539, 531, 529, 530, 533,
      529, 528, 529, 522, 521, 520, 509, 520, 520, 533, 522, 523, 526, 528, 527,
      532, 537, 539, 539, 540, 539, 538, 533, 532, 524, 523, 513, 503, 482, 467,
      443, 438, 435, 431, 429, 427, 426, 422, 422, 426, 426, 423, 419, 414, 410,
      407, 404, 401, 396, 393, 393, 395, 392, 389, 388, 383, 379, 378, 376, 375,
      372, 369, 368, 359, 343, 335, 332, 327, 323, 314, 308, 300, 294, 290, 288,
      289, 290, 282, 275, 269, 263, 257, 242, 244, 237, 235, 235, 232, 231, 225,
      224, 221, 219, 218, 218, 217, 217, 215, 215, 214, 214, 214, 214, 214, 215,
      215, 216, 213, 213, 212, 211, 209, 207, 205, 204, 206, 205, 205, 205, 205,
      204, 203, 203, 201, 200, 199, 197, 195, 193, 192, 192, 190, 189, 187, 186,
      186, 183, 183, 182, 182, 181, 179, 180, 179, 178, 178, 177, 177, 176, 176,
      176, 176, 175, 175, 175, 175, 175, 175, 174, 174, 175, 175, 175, 175, 176,
      177, 176, 177, 177, 177, 180, 179, 179, 180, 179, 179, 179, 178, 178, 178,
      178, 177, 178, 177, 179, 179, 179, 180, 180, 181, 181, 181, 183, 183, 184,
      184, 186, 187, 189, 189, 192, 195, 193, 194, 193, 194, 194, 191, 189, 196,
      195, 196, 199, 200, 201, 200, 200, 200, 200, 202, 203, 204, 205, 210, 210,
      210, 211, 210, 214, 218, 219, 226, 231, 233, 235, 235, 235, 235, 236, 238,
      240, 241, 243, 245, 246, 249, 249, 249, 255, 257, 264, 271, 272, 274, 275,
      276, 276, 278, 285, 292, 294, 296, 301, 304, 313, 320, 330, 333, 337, 342,
      345, 348, 352, 358, 363, 376, 386, 379, 386, 387, 387, 399, 402, 402, 410,
      415, 420, 425, 430, 429, 436, 435, 438, 442, 447, 451, 454, 455, 474, 477,
      481, 484, 492, 486, 488, 501, 509, 544, 553, 552, 553, 564, 579, 593, 600,
      627, 637, 644, 644, 643, 641, 640, 641, 641, 643, 643, 648, 651, 653, 659,
      671, 678, 685, 690, 698, 705, 711, 715, 722, 729, 738, 760, 770, 777, 780,
      788, 792, 796, 800, 803, 806, 808, 810, 809, 815, 819, 821, 823, 826, 828,
      830, 834, 838, 849, 854, 861, 884, 891, 909, 932, 996, 1026, 1016, 1011,
      1015, 1018, 999, 987, 827, 806, 779, 754, 734, 727, 700, 690, 686, 682, 677,
      675, 672, 668, 665, 664, 658, 641, 614, 610, 609, 609, 608, 596, 591, 583,
      577, 576, 570, 561, 553, 547, 539, 531, 526, 525, 524, 519, 513, 502, 484,
      480, 478, 470, 464, 458, 453, 450, 448, 448, 445, 441, 435, 431, 423, 420,
      411, 408, 405, 398, 388, 385, 385, 385, 383, 379, 372, 370, 369, 368, 366,
      367, 371, 370, 367, 365, 345, 343, 342, 340, 336, 334, 331, 329, 326, 323,
      323, 322, 321, 321, 319, 318, 315, 313, 312, 309, 308, 307, 306, 305, 304,
      303, 303, 302, 302, 300, 299, 299, 297, 296, 294, 292, 291, 290, 289, 290,
      291, 291, 289, 289, 285, 285, 286, 287, 287, 288, 288, 288, 288, 288, 289,
      288, 287, 279, 275, 273, 272, 272, 272, 274, 274, 274, 275, 275, 277, 281,
      284, 285, 286, 286, 286, 283, 280, 279, 279, 280, 281, 283, 284, 288, 291,
    ];

    return leng[((theta / (2 * Math.PI)) * leng.length) | 0] / max;
  }

  // set styles to words hovered
  function setHover(word) {
    if (word) {
      // console.log(word);
      // reset all of the spans
      $("span").css("border", "none"); //reset all of the spans to no border
      $("span").css("box-shadow", "none"); //reset all of the spans to no border
      
      var find = word[0]; // the word to be find
      if (find != null && find.length > 0) {

        //search every span for this content
        $("span:contains(" + find + ")").each(function () {
          // $(this).css('border', '0.5px double rgb(204, 194, 194, .2)');
          $(this).css("borderRadius", "5px");
          $(this).css("box-shadow", "0px 0px 0px 8px rgba(0,0,0,0.3)");
          $(this).css("transitionDuration", "0.25s");
        });

      }
    } 
    else {
      $("span").css("border", "none"); //reset all of the spans to no border
      $("span").css("box-shadow", "none"); //reset all of the spans to no border
    }
  }

  // click, and add this word to table
  function addToTable(word) {
    console.log(word[0] + ": " + word[1]);

    if (word) {
      const find = word[0]; // the word to be find
      const confmMsg = `Add ${find} as an attribute? `;

      // if the word exist, and user confirms
      if (find != null && find.length > 0 && confirm(confmMsg)) {
        // add this word to table
        addANewCol(find);
        // search every span for this content, hide it
        $("span:contains(" + find + ")").each(function () {
          $(this).css("display", "none");
        });
      }
    }
  }

  options = {
    // input words with frequency
    list: list,

    // sth like the margin
    gridSize: Math.round((22 * $("#my_canvas").width()) / 1024),

    // how big the words are  // 1.5
    weightFactor: 1.5,
    fontFamily: "Finger Paint, arial, sans-serif",

    // ----- display settings -----
    rotateRatio: 0.4, // Probability for the word to rotate (def:0.1)
    rotationSteps: 0,
    ellipticity: 0.5, // The aspect ratio of the entire word cloud distribution整个词云分布的长宽比
    shape: "pentagon",
    // function(theta) { setShape },

    // ----- color theme -----
    // can relate to nlp: analyse the color temperature
    color: "random-light",
    backgroundColor: "#333",

    // ----- interactive -----
    hover: function (item) {
      setHover(item);
    },
    click: function (item) {
      addToTable(item);
    },
  };

  WordCloud(document.getElementById("my_canvas"), options);
});







// ------- solution 2 (doesn't work) ------- for method 1
// // function readTextFile(addr) {
// //   // $.ajax({ async: false, });
// //   var req = new XMLHttpRequest();
// //   req.overrideMimeType("application/json");
// //   req.open("GET", addr, true);
// //   req.onreadystatechange = function() {
// //       if (req.readyState === 4 && req.status == "200") {
// //           // callback(req.responseText);
// //           list = JSON.parse(req.responseText);
// //           console.log(list);
// //       }
// //   }
// //   req.send(null);
// // }
// // // usage:
// // readTextFile("../js/wordcloud/wordsFreq.json");

// // function httpRequest(addr, reqType, asyncProc) {
// //   var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
// //   if (asyncProc) { 
// //     req.onreadystatechange = function() { 
// //       if (this.readyState == 4) {
// //         asyncProc(this);          // error: asyncProc is not a function
// //         console.log(this);
// //       } 
// //     };
// //   }

// //   req.overrideMimeType("application/json");
// //   req.open(reqType, addr, !(!asyncProc));
// //   req.send(null);
// //   return req;
// // }
// // httpRequest("../js/wordcloud/wordsFreq.json", "GET",  "HEAD");

// ------- solution 1 (doesn't work) ------- for method 1
// // // // 啊啊啊啊啊啊啊啊啊啊为什么这里list赋值了但是wordcloud里面还是没有东西！ 
// // // // deprecated
// // // var dataContent;

// // // var dataAddr = "../js/wordcloud/wordsFreq.json"
// // // var request = new XMLHttpRequest();
// // // request.open("get", dataAddr);
// // // request.send(null);
// // // request.onload = function () {
// // //   if (request.status == 200) {
// // //     dataContent = JSON.parse(request.responseText);
// // //     // console.log(dataContent);
// // //     populateList(dataContent);
// // //   }
// // // }

// // // function populateList(obj) {
// // //   $.each(dataContent, function(infoIndex, info) {
// // //     listItem = [infoIndex, info];
// // //     list.push(listItem);
// // //   })
// // //   // console.log(list);
// // // }