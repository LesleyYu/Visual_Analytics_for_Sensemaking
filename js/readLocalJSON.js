
var dataContent;

$("#showURL").click(function() {

  var dataAddr = "../data/01.json"
  var request = new XMLHttpRequest();
  request.open("get", dataAddr);
  request.send(null);
  request.onload = function () {
    if (request.status == 200) {
      dataContent = JSON.parse(request.responseText);

      populateURL(dataContent);
    }
  }

  // // Solution 1

  //   //使用getJSON读取 data/01.json 文件中的数据
  // $.getJSON("./data/01.json", function(dataContent) {
  //   // console.log(dataContent);
  //           //获取jsonTip的div
  //   var $urlList = $("#URLlist");
  //           //存储数据的变量 
  //   var itemList = "";
  //           //清空内容 
  //   $urlList.empty();
  //           //将获取到的json格式数据遍历到div中
  //   $.each(dataContent, function(infoIndex, info) {
  //     itemList += "No. " + (parseInt(infoIndex)+1) + "<br>";
  //     itemList += "url: " + info["url"] + "<br>";
  //     itemList += "<hr>"
  //   })
  //           //显示处理后的数据 
  //   $urlList.html(itemList);
  // })

})

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