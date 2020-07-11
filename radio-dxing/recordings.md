---
layout: page
title: Radio recordings
include_tabulator_libs: true
---
<br>
<div id="recordings-table"></div>

<script type = "text/javascript">


	document.addEventListener('DOMContentLoaded', () => {
		const recTableDivId = 'recordings-table';
		document.getElementById(recTableDivId).innerHTML = 'Fetching recordings...';

		db.collection("recordings").get().then((querySnapshot) => {
			let tabledata = querySnapshot.docs.map(doc => doc.data());

			let table = new Tabulator('#' + recTableDivId, {
				data : tabledata, 
				layout:"fitData", 
				headerSort: false,
				cellHozAlign:"center",
				columns:[ 
					{title:"Name", field:"broadcaster", headerSort : true},
					{title:"Frequency <br> (Khz)", field: "frequencyKhz", headerSort : true},
					{title:"Start Time", field: "startTime", headerSort : true},
					{title:"Location", field:"rlocation", formatter: function(cell, formatterParams, onRendered) {
						let loc = cell.getValue();
						return `<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${loc.Pc},${loc.Vc}">Locate in the map</a>`;
						}
					},
					
					{title:"Listen", field:"mp3Url", formatter: function(cell, formatterParams, onRendered) {
							
							return `<audio controls preload="none"><source src="${cell.getValue()}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
						}
					},
					{title:"Mode", field:"mode"},
					{title:"Receiver", field:"receiver"},
					{title:"Antenna", field:"antenna"},
				],
				rowClick : function(e, row) { 
					// alert("Row " + row.getData().id + " Clicked!!!!");
				}
			});

			var cols = document.getElementsByClassName('tabulator-col-title');
			for(i = 0; i < cols.length; i++) {
				cols[i].style.textAlign = 'center';
			}
		});

	});
</script>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js"></script>

<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js"></script>

<script>


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDjsyy4RUwHigzh5AjqYzpbqhFG4I9XHqo",
    authDomain: "radio-dxing-app.firebaseapp.com",
    databaseURL: "https://radio-dxing-app.firebaseio.com",
    projectId: "radio-dxing-app",
    storageBucket: "radio-dxing-app.appspot.com",
    messagingSenderId: "565086534206",
    appId: "1:565086534206:web:6f729a1b299ad1dc87ef6f",
    measurementId: "G-NT6GVTWK6P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
	var db = firebase.firestore();
	
  
</script>
