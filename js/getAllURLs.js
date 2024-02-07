// deprecated. use python manually
var dataContent;

$("#showURL").click(function() {

  var dataAddr = "../data/01.json"
  var request = new XMLHttpRequest();
  request.open("get", dataAddr);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      dataContent = JSON.parse(request.responseText);

      generateURL(dataContent);
    }
  }
})

function generateURL(dataContent) {
  // ..
}


function populateURL(obj) {
  var counter = 0;
  $.each(dataContent, function(infoIndex, info) {
    // create a new <label> and <p> for each url address
    var URLdiv = document.createElement("div");
    var URLindex = document.createElement("label");
    var URLitem = document.createElement("p");
    // each has a unique counter
    URLdiv.id = 'URLdiv' + (++counter);
    URLindex.id = 'URLlabel' + (counter);
    URLitem.id = 'URL' + (counter);

    // URL content
    URLindex.innerHTML += "No. " + (parseInt(infoIndex)+1) + "<br>";
    URLitem.innerHTML += "" + info["url"];

    // put onto html
    const urlList = document.querySelector("#URLlist");
    URLdiv.appendChild(URLindex);
    URLdiv.appendChild(URLitem);
    urlList.appendChild(URLdiv);
  })
}