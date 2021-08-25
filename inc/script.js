/**  INFINITELY SCROLLING PAGE
 * 
 * 1. load x rows of y elements into wrapper
 * 2. check to see if bottom has been reached
 * 3. load additional x rows of y elements at end of wrapper
 * 
 * variables:
 * 1. rowNum: rows to be leaded each time
 * 2. colNum: elements/columns in each row
 * 3. api_url: source for the dummy data
 * 4. wrapperId: name of the element id of the wrapper
 * 5. infinite_scroll_wrapper: the page element in which all data will be loaded
 *
 * templates:
 * Rows, cards, images and titles will be loaded in by using templates from the HTML.
 * 
 * ON THE DUMMY DATA
 * the dummy data is data on various cryptocurrencies. the elements in each entry of the array are as follows:
 * [0] - id
 * [1] - uid
 * [2] - coin_name
 * [3] - acronym
 * [4] - logo
 * 
 * we will be displaying the name and logo of each coin in their element on the page
 * 
 * functions:
 * 1. loadData(n): calls n amount of entries from API database
 * 2. displayData(dataObject): puts data into visible elements into wrapper by use of templates
 * 3. bottomIsVisible(pageElement): checks to see if pageElement's bottom is in pageview
 * 
 */

const rowNum = 9;
const colNum = 3;
const api_url = "https://random-data-api.com/api/crypto_coin/random_crypto_coin";
const wrapperId = "infinite-scroll-wrapper";

const rowTemplate = document.getElementsByClassName("row")[0];
const cardTemplate = rowTemplate.getElementsByClassName("card")[0];
const imgTemplate = cardTemplate.getElementsByClassName("card__img")[0];
const titleTemplate = cardTemplate.getElementsByClassName("card__title")[0];

var infinite_scroll_wrapper = document.getElementById(wrapperId);

function loadData(n) {
	const target = api_url + "?size=" + n;
	
	fetch(target)
		.then(response => response.json())
		.then(data => displayData(data));
}

function displayData(dataObject) {
	for (var rows = 0; rows < rowNum; rows++) {
		var row = infinite_scroll_wrapper.appendChild(rowTemplate.cloneNode());
		
		for (var columns = 0; columns < colNum; columns++) {
			var arrayIndex = (rows*colNum)+columns;
			const cardObject = dataObject[arrayIndex];
			
			var card = row.appendChild(cardTemplate.cloneNode());
			var img = card.appendChild(imgTemplate.cloneNode());
			var title = card.appendChild(titleTemplate.cloneNode());
			img.src = cardObject.logo;
			title.innerHTML = cardObject.coin_name;
		}
	}
}

function bottomIsVisible(pageElement) {
	var elementDimensions = pageElement.getBoundingClientRect();
	var elementBottom = elementDimensions.bottom;
	return (window.innerHeight >= elementBottom && elementBottom > 0);
}
