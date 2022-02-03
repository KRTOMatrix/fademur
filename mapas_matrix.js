///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [37.470076674327615, -4.05854426397085],
		zoom: 8,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});




///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h2>Barómetro de la Violencia de Género de Andalucía 2021';
	 return div;
	};
	title2.addTo(map);
//Logo barómetro	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div','info1');
	 div.innerHTML +=
 	 '<a><img src="images/LOGO_FADEMUR.jpg" width="156px" height="48px" ></img></a>';
	 return div;
	};
	title1.addTo(map);  
	
//Logo Matrix	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info3');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="90px" height="50px"  ></img></a>';
	 return div;
	};
	title3.addTo(map);


//Logo barómetro	
var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/LOGO_ANDALUCIA.png" width="225px" height="120px" ></img></a>';
	 return div;
	};
	title4.addTo(map);  

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
//Capas Google



///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////















//estilo y popups de periodo a
function getColor1(a) {
	return a <1 ? '#ffff00' :
	a <3 ? '#ffc800' :
	a <5 ? '#ff9600' :
	a <10? '#ff5000' :
	a <17? '#d90019' :
	a 
		'#ffffff';
	

	'green';
};

function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.dra_pA),
		weight: 0.5,
		opacity: 0.60,
		color: 'black',
		dashArray: '1',
		fillOpacity: 1
	};

};

function popup1(feature, layer) {

	layer.bindTooltip("<div style='column-count:2' id='custom'>"
             +"<strong>Riesgo: </strong>"+  
			feature.properties.dra_pA.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Partido judicial: </strong>"+
			feature.properties.PARTIDO_JU+
			"<br><strong>Municipios: <br></strong>"+ 
			feature.properties.municipios.split(';').slice().sort().join("<br>").fontsize(1),
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',}+
			"</div>");
};

var geojson1 = L.geoJson(tabla, {
	style: style1,
	onEachFeature: popup1
});


//estilo y popups de periodo b

function getColor2(a) {
	return a <1 ? '#ffff00' :
	a <3 ? '#ffc800' :
	a <5 ? '#ff9600' :
	a <10? '#ff5000' :
	a <17? '#d90019' :
	a 
		'#ffffff';
	

	'green';
};

function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.dra_pB),
		weight: 0.5,
		opacity: 0.60,
		color: 'black',
		dashArray: '1',
		fillOpacity: 1
	};

};

function popup2(feature, layer) {

	layer.bindTooltip("<div style='column-count:2' id='custom'>"
             +"<strong>Riesgo: </strong>"+  
			feature.properties.dra_pB.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Partido judicial: </strong>"+
			feature.properties.PARTIDO_JU+
			"<br><strong>Municipios: <br></strong>"+ 
			feature.properties.municipios.split(';').slice().sort().join("<br>").fontsize(1),
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',}+
			"</div>");
};

var geojson2 = L.geoJson(tabla, {
	style: style2,
	onEachFeature: popup2
});



//estilo y popups de diferencias entre periodos
function getColor3(a) {
	return a > 4 ? '#ca0d00' :
	a > 2 ? '#d84b41' :
	a > 1 ? '#e68983' :
	a > 0.25? '#f3c7c4' :
	a > -0.26 ? '#f8f8f8' :
	a > -1.1 ? '#828282' :
	a > -2.8 ? '#505050' :

	'#ffffff';
};


function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.DIF),
		weight: 0.5,
		opacity: 0.60,
		color: 'black',
		dashArray: '1',
		fillOpacity: 1
	};

};

function popup3(feature, layer) {

	layer.bindTooltip("<div style='column-count:2' id='custom'>"
             +"<strong>Diferencias de riesgo: </strong>"+  
			feature.properties.DIF.toFixed(1).toString().replace(".", ",")+
			"‰<br><strong>Partido judicial: </strong>"+
			feature.properties.PARTIDO_JU+
			"<br><strong>Municipios: <br></strong>"+ 
			feature.properties.municipios.split(';').slice().sort().join("<br>").fontsize(1),
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',}+
			"</div>");
};

var geojson3 = L.geoJson(tabla, {
	style: style3,
	onEachFeature: popup3
});



//situación detallada
function getColor4(a) {
	return a == "Crítica" ? '#e30000' :
	a == "Grave" ? '#ff7f00' :
	a == "En deterioro" ? '#e6e600' :
	a == "En observación" ? '#f3e8e1' :
	a 
		'#f3e8e1';

};


function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.sit_tet),
		weight: 0.5,
		opacity: 0.60,
		color: 'black',
		dashArray: '1',
		fillOpacity: 1
	};

};

function popup4(feature, layer) {

	layer.bindTooltip("<div style='column-count:2' id='custom'>"
             +"<strong>Situación: </strong>"+  
			feature.properties.sit_tet.toString().replace(".", ",")+'  (' +feature.properties.situacion.toString()+')'+
			"<br><strong>Riesgo: </strong>"+
			feature.properties.dra_pB.toFixed(1).toString().replace(".", ",")+ '‰' +
			"<br><strong>Cambio: </strong>"+  
			feature.properties.dra_text.toString()+'  (' +feature.properties.DIF.toFixed(1).toString().replace(".",",")+'%)'+	
			"<br><strong>Partido judicial: </strong>"+
			feature.properties.PARTIDO_JU+
			"<br><strong>Municipios: <br></strong>"+ 
			feature.properties.municipios.split(';').slice().sort().join("<br>").fontsize(1),
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',}+
			"</div>");
};

var geojson4 = L.geoJson(tabla, {
	style: style4,
	onEachFeature: popup4
});



/*
//estilo mapa Cambio

function getColor4(a) {
	return a == 'Crecimiento muy alto' ? '#D7696A' :
	a == 'Crecimiento alto' ? '#FCC664' :
	a == 'Crecimiento moderado'? '#F8F266' :
	a == 'Decrecimiento'? '#B2D88F': 
	'#C2523C';
};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.Cambio_def),
		weight: 0.5,
		opacity: 0.60,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.COD_PJ) {
		layer.bindTooltip("<div id='custom'>"
             +"<strong>Cambio: </strong>"+  
			feature.properties.Cambio_def+
			"<br><strong>Partido judicial: </strong>"+
			feature.properties.PARTIDO_JU+
			"<br><strong>Municipios: <br></strong>"+  
			feature.properties.NAME_MUNIC.split(';').slice().sort().join("<br>").fontsize(1)+"</div>",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};



var geojson4 = L.geoJson(tabla_vio, {
	style: style4,
	onEachFeature: popup4
});




//estilo y popups de situación detallada
function getColor5(a) {
	return a == 'C-4' ? '#E46464' :
	a == 'C-3'? '#E88888' :
	a == 'C-2'? '#EBACAC': 
	a == 'C-1' ? '#EECFD0' :
    a == 'G-4' ? '#F29136' :
	a == 'G-3' ? '#F2AF70' :
	a == 'G-2'? '#F2CDA9' :
	a == 'G-1'? '#F2EBE2': 
	a == 'D-2' ? '#FAE94C' :
	a == 'D-1' ? '#F9EF93' :
	a == 'D-0'? '#F9F6DA' :
	a == 'O-3'? '#9EF29E':
    a == 'O-2' ? '#BDF5BE' :
	a == 'O-1' ? '#DCF9DD' :
	a == 'O-0'? '#FBFCFC' :
	'green';

};
function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.Sit_Detall.toString()),
		weight: 0.5,
		opacity: 0.60,
		color: '#000000',
		dashArray: '1',
		fillOpacity: 1
	};

};
function popup5(feature, layer) {

	if (feature.properties && feature.properties.COD_PJ) {
		layer.bindTooltip("<div id='custom'>"
            +"<strong>Situación: </strong>"+  
			 feature.properties.S_D_SP+
		    "<br><strong>Tasa: </strong>"+  
			 feature.properties.Vio_14_18.toString().replace('.',',')+
			 "<br><strong>Cambio: </strong>"+  
			 feature.properties.Cambio+
			"<br><strong>Partido judicial: </strong>"+
			feature.properties.PARTIDO_JU+
			"<br><strong>Municipios: <br></strong>"+ 
			feature.properties.NAME_MUNIC.split(';').slice().sort().join("<br>").fontsize(1)+"</div>",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson5 = L.geoJson(tabla_vio, {
	style: style5,
	onEachFeature: popup5
});
*/

var mapa1 = L.layerGroup([geojson1]);
var mapa2 = L.layerGroup([geojson2]).addTo(map);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);





var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de violencia de género ',
	children: [
	    { label: "Riesgo de violencia de género. Periodo 2016-2020",layer: mapa2},
	    { label: "Riesgo de violencia de género. Periodo 2011-2015",layer: mapa1},
	    
		{ label: "Diferencia de riesgo de violencia de género entre periodos",layer: mapa3},
	    { label: "Situación detallada de violencia de género",layer: mapa4},
		//{ label: "Situación detallada de la violencia machista",layer: mapa4}
		
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
			]
};	


var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Riesgo de violencia de género. Periodo 2011-2015'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style1,
			layer: geojson1,
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto estimado mediante un modelo de regresión de Poisson desde la tasa anual promedio de denuncias de violencia de género por partido judicial.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  'Unidades : ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {	
	/*				return a == "Nulo o muy bajo" ? '#ffff00' :
	a == "Bajo" ? '#ffc800' :
	a == "Moderado" ? '#ff9600' :
	a == "Intenso" ? '#ff5000' :
	a == "Extremo" ? '#d90019' :
	a 
		'#ffffff'
*/
	            label:"<h5>"+  'Nulo o muy bajo (<1)'+"<\h5>",html: '',style: {'background-color': '#ffff00','width': '40px','height': '14px'}}, {

	            label:"<h5>"+  'Bajo (de 1 a 3)'+"<\h5>",html: '',style: {'background-color': '#ffc800','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Moderado (de 3 a 5)'+"<\h5>",html: '',style: {'background-color': '#ff9600','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Intenso (de 5 a 10)'+"<\h5>",html: '',style: {'background-color': '#ff5000','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Extremo (10 a 16,5)'+"<\h5>",html: '',style: {'background-color': '#d90019','width': '40px','height': '14px'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Consejo General del Podel Judicial (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);



//periodo b

var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Riesgo de violencia de género. Periodo 2016-2020'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style2,
			layer: geojson2,
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto estimado mediante un modelo de regresión de Poisson desde la tasa anual promedio de denuncias de violencia de género por partido judicial.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  'Unidades : ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {	
	/*				return a == "Nulo o muy bajo" ? '#ffff00' :
	a == "Bajo" ? '#ffc800' :
	a == "Moderado" ? '#ff9600' :
	a == "Intenso" ? '#ff5000' :
	a == "Extremo" ? '#d90019' :
	a 
		'#ffffff'
*/
	            label:"<h5>"+  'Nulo o muy bajo (<1)'+"<\h5>",html: '',style: {'background-color': '#ffff00','width': '40px','height': '14px'}}, {

	            label:"<h5>"+  'Bajo (de 1 a 3)'+"<\h5>",html: '',style: {'background-color': '#ffc800','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Moderado (de 3 a 5)'+"<\h5>",html: '',style: {'background-color': '#ff9600','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Intenso (de 5 a 10)'+"<\h5>",html: '',style: {'background-color': '#ff5000','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Extremo (10 a 16,5)'+"<\h5>",html: '',style: {'background-color': '#d90019','width': '40px','height': '14px'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Consejo General del Podel Judicial (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

			}]

		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);


	//periodo b


	/*				return a == "Nulo o muy bajo" ? '#ffff00' :
	a == "Bajo" ? '#ffc800' :
	a == "Moderado" ? '#ff9600' :
	a == "Intenso" ? '#ff5000' :
	a == "Extremo" ? '#d90019' :
	a 
		'#ffffff'
*/
var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Diferencia de riesgo de violencia de género entre los periodos 2011-2015 y 2016-2020'+"<\h3>",
		image:'<img src="images/LOGO_GEN.png"',
			style: style3,
			layer: geojson3,
			elements: [{

				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Riesgo absoluto estimado mediante un modelo de regresión de Poisson desde la tasa anual promedio de denuncias de violencia de género por partido judicial de ambos periodos.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  'Unidades : ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {	
	            label:"<h5>"+  'Decrecimiento alto (-3,0  — -1,1)'+"<\h5>",html: '',style: {'background-color': '#505050','width': '40px','height': '14px'}}, {
	            label:"<h5>"+  'Decrecimiento moderado (3,0 — -0,26)'+"<\h5>",html: '',style: {'background-color': '#828282','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Estable (-0,25 — 0,25)'+"<\h5>",html: '',style: {'background-color': '#f8f8f8','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Crecimiento moderado (0,26 — 1,0)'+"<\h5>",html: '',style: {'background-color': '#f3c7c4','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Crecimiento alto (1,1 — 2,0)'+"<\h5>",html: '',style: {'background-color': '#e68983','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Crecimiento intenso (2,1 — 4,0)'+"<\h5>",html: '',style: {'background-color': '#d84b41','width': '40px','height': '14px'}}, {
				label:"<h5>"+  'Crecimiento extremo (4,1 — 9,0)'+"<\h5>",html: '',style: {'background-color': '#ca0d00','width': '40px','height': '14px'}}, {

				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del Consejo General del Podel Judicial (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			

/*function getColor1(a) {
	return a > 4 ? '#ca0d00' :
	a > 2 ? '#d84b41' :
	a > 1 ? '#e68983' :
	a > 0.25? '#f3c7c4' :
	a > -0.26 ? '#f8f8f8' :
	a > -1.1 ? '#828282' :
	a > -2.8 ? '#505050' :

	'#ffffff';
};*/
			}]

}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);















	var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Situación detallada de violencia de género por partidos judiciales'+"<\h3>",
			style: style4,
			layer: geojson4,
			elements: [{

                label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
                label:"<h4>"+  'Clasificación de partidos judiciales según su riesgo de violencia de género (R) en el periodo 2016-2020, estimado desde la tasa anual promedio de denuncias, y el cambio relativo del riesgo (CRR) respecto al periodo 2011-2015. Se indica el número de factores de riesgo relevantes identificados mediante un modelo de regresión de Poisson en cada partido judicial <br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:'<img src="images/grupo4.png",></img><br>',
				IMG:"<h3>"+  'Unidades : ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del  Consejo  General del Poder Judicial (2020).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
    map.addControl(htmlLegend4);

/*
	// leyenda cambio


		var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Cambio de la violencia machista por partidos judiciales'+"<\h3>",
			style: style4,
			layer: geojson4,
			elements: [{

                label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
                label:"<h4>"+  'Cambio relativo de la tasa anual promedio de denuncias por violencia de género del periodo 2009-2013 al periodo 2014-2018.<br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h3>"+  '<strong>Clases de cambio'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h4>"+  'Crecimiento muy alto'+"<\h4>",html: '',style: {'background-color': '#D7696A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  'Crecimiento alto'+"<\h4>",html: '',style: {'background-color': '#FCC664','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crecimiento moderado'+"<\h4>",html: '',style: {'background-color': '#F8F266','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Decrecimiento'+"<\h4>",html: '',style: {'background-color': '#B2D88F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del  Consejo del Poder Judicial (2019).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);




	// leyenda situación detallada

		var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Situación detallada de la violencia machista por partidos judiciales'+"<\h3>",
			style: style5,
			layer: geojson5,
			elements: [{

                label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
                label:"<h4>"+  'Tasa anual promedio de denuncias por violencia de género. Periodo 2014-2018<br> y cambio relativo respecto al periodo previo (2009-2013).El número de factores de riesgo presentes se indica mediante un código de 0 a 4'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<h5>"+'<br>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, { 
				label:"<div style='width': '40px','height': '14px,img src='images/LOGO_GEN.PNG'></div>",
				label:"<h4>"+  'Crítica (C-4'+"<\h4>",html: '',style: {'background-color': '#E46464','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  'Crítica (C-3)'+"<\h4>",html: '',style: {'background-color': '#E88888','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crítica (C-2)'+"<\h4>",html: '',style: {'background-color': '#EBACAC','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crítica (C-1)'+"<\h4>",html: '',style: {'background-color': '#EECFD0','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Grave (G-4)'+"<\h4>",html: '',style: {'background-color': '#F29136','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  'Grave (G-3)'+"<\h4>",html: '',style: {'background-color': '#F2AF70','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Grave (G-2)'+"<\h4>",html: '',style: {'background-color': '#F2CDA9','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Grave (G-1)'+"<\h4>",html: '',style: {'background-color': '#F2EBE2','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'En deterioro (D-2)'+"<\h4>",html: '',style: {'background-color': '#FAE94C','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  'En deterioro (D-1)'+"<\h4>",html: '',style: {'background-color': '#F9EF93','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'En deterioro (D-0)'+"<\h4>",html: '',style: {'background-color': '#F9F6DA','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'En observación (O-3)'+"<\h4>",html: '',style: {'background-color': '#9EF29E','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {	
				label:"<h4>"+  'En observación (O-2)'+"<\h4>",html: '',style: {'background-color': '#BDF5BE','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
			    label:"<h4>"+  'En observación (O-1)'+"<\h4>",html: '',style: {'background-color': '#DCF9DD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'En observación (O-0)'+"<\h4>",html: '',style: {'background-color': '#FBFCFC','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia con datos del  Consejo del Poder Judicial (2019) y factores de riesgo socio-territoriales derivados de un modelo de regresión específico de Cataluña.<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);
*/
//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});

	//autor: Juan Carlos Hernández Alcalde, diseñador de aplicaciones webmapping para Fundación Matrix