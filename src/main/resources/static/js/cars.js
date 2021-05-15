function carFilter(elementId) {
	let val = document.getElementById(elementId).value;

	let csrfHeader = document.head.querySelector('meta[name=\'_csrf_header\']').content;
	let csrfToken = document.head.querySelector('meta[name=\'_csrf\']').content;

	console.log(csrfHeader + ":" + csrfToken);
	
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/ajax/car-filter');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader(csrfHeader, csrfToken);
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState != 4) {
			return;
		}
		
		if(xhr.status != 200) {
			alert('Ajax request error');
		} else {
			let response = xhr.responseText;
			
			if(response.length > 0) {
				filterTable(JSON.parse(response));
			}
			
			console.log(response);
		}
	}
	
	xhr.send("q=" + val);
}

function filterTable(data) {
	
	document.querySelectorAll('#carList tr').forEach(function(el, i){
		if(!el.classList.contains('column-header')) {
			el.remove();
		}
	});
	
	let table = document.getElementById('carList');
	
	data.forEach(function(el, i){
		let tr = document.createElement('tr');
		
		tr.appendChild(createCell(el.brand.name));
		tr.appendChild(createCell(el.name));
		tr.appendChild(createCell(el.productionDateFormat));
		tr.appendChild(createCell(el.price));
		
		table.appendChild(tr);
	});
}


function createCell(text) {
	let td = document.createElement('td');
	td.innerText = text;
	return td;
}