// in case localStorageDB doesn't work
$.getScript("../bower_components/localStorageDB",function(){
  localStorageDB();
});
var lib;
var rows = [		// store data in `rows`
	{Name: 'NYU', QS: '39', Location: '90', Tuition: '20000', Salary: '800', Staff: '4'},
	{Name: 'Columbia', QS: '22', Location: '90', Tuition: '19999', Salary: '900', Staff: '7'},
	{Name: 'UCL', QS: '8', Location: '85', Tuition: '10000', Salary: '1000', Staff: '12'},
	{Name: 'IC', QS: '7', Location: '85', Tuition: '12000', Salary: '1200', Staff: '6'},
	{Name: 'CMU', QS: '52', Location: '50', Tuition: '19000', Salary: '1900', Staff: '10'}
];
var fields = {};	// store feilds of this table

refresh_table();	// create the table, and populate with data
write_attrib();		// initialize the attributes in HTML table
write_values();		// initialize the attrib values in HTML table

// Creating and populating a table (in one go)
function refresh_table() {
	localStorage.clear();

	// Initialise. If the database doesn't exist, it is created
	// if (!lib.tableExists("schools")) {}		// doesn't work
	lib = new localStorageDB("library", localStorage);

	lib.createTableWithData("schools", rows);
	lib.commit();

	fields = lib.tableFields("schools");	// refresh fields
}


// -------- write data into HTML table --------
function write_attrib() {
	// get the first row of the table to store fields
	const row_attrib = document.querySelector("#dataField");
	for (var i = 1; i < fields.length ; i++) {
		const newth = document.createElement("th");
		const newinput = document.createElement("input");
		newinput.setAttribute("type", "text");
		newinput.setAttribute("name", "edit_attrib");
		newinput.setAttribute("data-id", "attrib"+i);
		newinput.setAttribute("value", fields[i]);
		newinput.setAttribute("size", "7");
		newth.appendChild(newinput);
		row_attrib.appendChild(newth);
	
		// When user changes attrib, Update attrib into database
		newinput.addEventListener('input', updateAttrib);
	}
	const lastth = document.createElement("th");
	const addNewCol = document.createElement("input");
	addNewCol.setAttribute( "type", "button");
	addNewCol.setAttribute( "value", "+ NEW");
	addNewCol.setAttribute( "id", "addNewCol");
	row_attrib.appendChild(addNewCol);

	// When user clicks the button `+ new col`, 
	addNewCol.addEventListener('click', addANewCol);
}

// Write Attribute Values
function write_values() {
	// write last row first, then append every row before it
	write_lastRow();
	// get first row (first node)
	const row_attrib = document.querySelector("#dataField");

	// append the rest of the rows after row_attrib
	const numRow = lib.rowCount("schools");
	for (var i = 0; i < numRow; i++) {
		// get the values in database, convert to lists
		const rowObj = lib.queryAll("schools")[i];
		const rowContent = Object.values(rowObj);
		// console.log(rowContent);	// (7) ['NYU', '39', '90', '20000', '800', '4', 1]
		const index = rowContent[fields.length-1];	// This is the index of every row (表第一列)

		write_row(rowContent, index, row_attrib );
	}
}

// update message lines
const notNumWarning = document.getElementById("notNumber");
const updateSuccess = document.getElementById("updateSuccess");

function write_row(rowContent, index, row_attrib) {
	const newrow = document.createElement("tr");

	// write into the table in DOMs
	// a. index
	const newth = document.createElement("th");
	newth.innerHTML = index;	// because the last in the list is the index
	newrow.appendChild(newth);
	// b. attribute values
	for (var j = 1; j < fields.length; j++) {
		const newth = document.createElement("th");
		const newinput = document.createElement("input");
		newinput.setAttribute("type", "text");
		newinput.setAttribute("value", rowContent[j - 1]);
		newinput.setAttribute("name", "edit_value");
		newinput.setAttribute("data-attribName", fields[j]);	// !!!!! needs to be updated when attrib name changes
		newinput.setAttribute("data-itemIndex", index);
		newinput.setAttribute("size", "7");

		newth.appendChild(newinput);
		newrow.appendChild(newth);

		// prevent non-numeric input
		cleanNum = function(e) {
			e.preventDefault();
			var pastedText = '';
			if (window.clipboardData && window.clipboardData.getData) { // IE
				pastedText = window.clipboardData.getData('Text');
			} else if (e.clipboardData && e.clipboardData.getData) {
				pastedText = e.clipboardData.getData('text/plain');
			}
			console.log(this);
			this.value = pastedText.replace(/\D/g, '');
		};
		if (j > 1) {
			newinput.addEventListener("keypress", function(evt) {		// not running
				// console.log(evt);
				if (evt.which < 48 || evt.which > 57) {
					evt.preventDefault();
					if (notNumWarning) {
						notNumWarning.textContent = "Please enter a number 👻 ";
						updateSuccess.textContent = "";
						alert("Oops! Please enter a number 👻 ");
					}
				}
			});
		
			cleanNum;
			newinput.onpaste = cleanNum;
		}

		// When user changes attrib value, Update value into database
		newinput.addEventListener('input', updateValue);
	}
	const lastth = document.createElement("th");
	lastth.setAttribute("id", "lastCol"+index);
	newrow.appendChild(lastth);
	
		// // delete button (deletes current row)
		// // --------- not finished ---------
		// // don't add into table. Create separate element, then use css to set a relative position
		// const thForBtn = document.createElement("input");
		// thForBtn.setAttribute("type", "button");
		// thForBtn.setAttribute("value", "Delete");
		// newrow.appendChild(thForBtn);

	row_attrib.parentNode.insertBefore(newrow, row_attrib.parentNode.lastChild);
}

function write_lastRow() {
	const row_attrib = document.querySelector("#dataField");

	// the last "+ NEW" row of the table
	const newrow = document.createElement("tr");
	// a. "add new" button
	const newth = document.createElement("th");
	const addNewRow = document.createElement("input");
	addNewRow.setAttribute( "type", "button" );
	addNewRow.setAttribute( "value", "+ NEW" );
	addNewRow.setAttribute( "id", "addNewRow" );
	newth.appendChild(addNewRow);
	newrow.appendChild(newth);
	
	// When user clicks the button `+ new row`, 
	addNewRow.addEventListener('click', addANewRow);

	// b. other blank grids
	for (var j = 1; j < fields.length + 1; j++) {
		const newth = document.createElement("th");
		const newlabel = document.createElement("label");
		newlabel.setAttribute("value", "&nbsp;");
		newth.appendChild(newlabel);
		newrow.appendChild(newth);
	};
	row_attrib.parentNode.appendChild(newrow);
}



// -------- Handling User Updates --------

// Immutably Rename Object Keys
// https://medium.com/front-end-weekly/immutably-rename-object-keys-in-javascript-5f6353c7b6dd
const renameKeys = (keysMap, obj) => Object.keys(obj).reduce((acc, key) => ({ ...acc, ...{ [keysMap[key] || key]: obj[key] }}), {});

// -------- re-write new data into HTML table --------
function add_attrib(word) {
	const numOfCol = fields.length;	// number of columns
	const numOfRow = rows.length;	// number of rows

	// first row: add grid for attribute
	const addNewCol = document.getElementById("addNewCol");
	const newth = document.createElement("th");
	const newinput = document.createElement("input");
	newinput.setAttribute("type", "text");
	newinput.setAttribute("name", "edit_attrib");
	newinput.setAttribute("data-id", "attrib"+(numOfCol-1));
	(word == "[object PointerEvent]") ?
	newinput.setAttribute("value", "newAttrib") :
	newinput.setAttribute("value", word);
	newinput.setAttribute("size", "6");
	newth.appendChild(newinput);
	addNewCol.parentNode.insertBefore(newth, addNewCol);
	newinput.addEventListener('input', updateAttrib);		// listen to user, update data

	// rest of the rows: add grids for attrib values
	for (var i = 0; i < numOfRow; i++) {
		const currRow = document.getElementById(`lastCol${i+1}`)
		const newth = document.createElement("th");
		const newinput = document.createElement("input");
		newinput.setAttribute("type", "text");
		newinput.setAttribute("value", "");
		newinput.setAttribute("name", "edit_value");
		newinput.setAttribute("data-attribName", "newAttrib");
		newinput.setAttribute("data-itemIndex", i+1);
		newinput.setAttribute("size", "7");
		newth.appendChild(newinput);
		currRow.parentNode.insertBefore(newth, currRow);
		newinput.addEventListener('input', updateValue);	// listen to user, update data
		// console.log(currRow);
	}
	
	// last row: the bottom right corner grid
	const addNewRow = document.getElementById("addNewRow");
	const newth1 = document.createElement("th");
	addNewRow.parentNode.parentNode.appendChild(newth1);
	
}

// 1. update attribute names
function updateAttrib(){
	const newAttrib = this.value;		// user input
	const attribIndex = parseInt(this.dataset.id[6]);		// log the ID of the attribute updated
	const oldAttrib = fields[attribIndex];

	// use `new_rows` to store data with new attrbute names temporarily
	var new_rows = [];
	for (var i=0; i<rows.length; i++ ) {
		var obj = rows[i];
		// store new fields in `keysMap`
		const keysMap = new Object();
		for (var j=1; j<fields.length; j++) {
			const fieldName = fields[j];
			j == attribIndex ? keysMap[fieldName] = newAttrib : keysMap[fieldName] = fieldName;
		}
		obj = renameKeys(keysMap, obj);
		new_rows.push(obj);
	}
	rows = new_rows;
	refresh_table();
	// rewrite_attrib();

	// in HTML, update every element with current `data-attribName`
	itemsChangeAttrib = document.querySelectorAll(`[data-attribName='${oldAttrib}']`);
	// console.log(itemsChangeAttrib[0]);
	for (var i=0; i<itemsChangeAttrib.length; i++) {
		itemsChangeAttrib[i].setAttribute("data-attribName", newAttrib);
	}
}

// 2. update item attribute values
function updateValue() {
	const newVal = this.value;	// user input
	const index = this.dataset.itemindex;		// log the item index updated
	const attrib = this.dataset.attribname;	// log the attribute name updated

	if (isNaN) {
		if (notNumWarning) {
			notNumWarning.textContent = ""
			updateSuccess.textContent = "Updated!"
		}
		// update dataset
		lib.update("schools", {ID:index}, function(item) {
			item[attrib] = newVal;
			return item;
		});
	}
	// console.log(lib.queryAll("schools"));		// test if it works.	// Yes, it works.
}


// if user changes txt in input, adjust the width
// ---------------------- to do ----------------------
// https://stackoverflow.com/questions/3392493/adjust-width-of-input-field-to-its-input


// 3. add new item (new row)
// 		append a new item in dataset and HTML table
function addANewRow() {
	const newItem = new Object();
	for (var i = 1; i<fields.length; i++) {
		const newAttrib = fields[i];
		newItem[newAttrib] = "";
	}
	rows.push(newItem);
	refresh_table();		
	// create new table everytime instead of using `lib.insert`
	// to keep `rows` the same as the dataset lib. because `rows` are needed in `updateAttrib()` function
	// console.log(lib.queryAll("schools"));

	const row_attrib = document.querySelector("#dataField");	// first node
	const len = rows.length;
	const rowObj = lib.queryAll("schools")[len-1];
	const rowContent = Object.values(rowObj);		// get content to be written
	const index = rowContent[fields.length-1];	// This is the index of every row (表第一列)
	write_row(rowContent, index, row_attrib );
}

// 4. add new attribute (new col)
function addANewCol(word) {
	const len = lib.queryAll("schools").length;
	const new_rows = [];
	for (var i=0; i<len; i++) {
		const currRow = rows[i];
		(word == '[object PointerEvent]') ?
			currRow.newAttrib = "" :
			currRow.newAttrib = word;
		new_rows.push(currRow);
		// console.log(`word is: ${word}`);
	}
	rows = new_rows;
	refresh_table();
	// console.log(rows);

	add_attrib(word);
}

const saveCSV = document.getElementsByClassName("saveToCSV");
for (var i = 0; i < saveCSV.length; i++) {
	saveCSV[i].addEventListener("click", saveData);
}

var csv = [];

// convert: json to csv
function saveData() {
	const replacer = (key, value) => value == null ? '' : -1 // specify how to handle null values here
	const replaceID = (key, value) => key === "ID" ? '' : value
	const header = Object.keys(rows[0])
	csv = [
		header.join(','), // header row first
		...rows.map(row => {
			return header.map(fieldName => (row[fieldName])).join(',');
		})
	].join('\r\n')
	
	console.log(csv)

}


// delete this table
// lib.dropTable("schools");