let purchaseWindow = document.getElementById( "purchase-window" ); 
let screen1 = document.getElementById( "screen-1" );
let screen2 = document.getElementById( "screen-2" );
let screen3 = document.getElementById( "screen-3" ); 
let screenHeader = document.getElementsByClassName( "screen-header" );
let screenFooter = document.getElementsByClassName( "screen-footer" ); 
let adultPrice = document.getElementById( "adult-price" );
let youthPrice = document.getElementById( "youth-price" );
let childPrice = document.getElementById( "child-price" );
let lapChildPrice = document.getElementById( "lap-child-price" );
let transportationPrice = document.getElementById( "transportation-price" ); 
let earlyTransportation = document.getElementById( "early-transportation" ); 
let datePicker = document.getElementById( "dateInput" ); 
var el;
var element; 
var adultPriceInput = document.getElementById( "package-number-input1" );
var youthPriceInput = document.getElementById( "package-number-input2" );
var childPriceInput = document.getElementById( "package-number-input3" );
var lapChildPriceInput = document.getElementById( "package-number-input4" ); 
var transportationInput = document.getElementById( "transportation-spinner" );
var earlyTransportationInput; 
let participants = document.getElementById( "participants" ); 

//======================================================================////======================================================================//

//======================================================================////======================================================================//

const getHawaiiTime = function() {
	let hawaii_datetime_str = new Date().toLocaleString( "en-GB", {
		timeZone: "Pacific/Honolulu"
	}, {
		hour12: false
	} );
	dateArr = hawaii_datetime_str.split( ",", 2 );
	dateArr.shift();
	hawaii_datetime_str = dateArr[ 0 ].slice( 1 );
	hawaii_datetime_str = parseInt( hawaii_datetime_str );
	return hawaii_datetime_str;
}
const getTodaysDate = function() {
	let currentDate = new Date().toLocaleDateString( 'en-US', {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	} );
	console.log( currentDate );
	return currentDate;
}
//======================================================================////======================================================================//
var numberPlus = document.getElementsByClassName( "numberPlus" ),
	numberMinus = document.getElementsByClassName( "numberMinus" ),
	numberInput; 
// input values are not strings or numbers, they are input
function numIncrement( numberInput, increase ) { 
	var myInputObject = document.getElementById( numberInput ); 
	if ( increase ) { 
		myInputObject.value++;
		localStorage.setItem( "" + myInputObject.getAttribute( "name" ) + "", myInputObject.value );
		//console.log(localStorage.getItem("" + myInputObject.getAttribute("name") + ""));
		 
	} else { 
		myInputObject.value--;
		localStorage.setItem( "" + myInputObject.getAttribute( "name" ) + "", myInputObject.value );
		//console.log(localStorage.getItem("" + myInputObject.getAttribute("name") + ""));
		 
	}; 
	if ( myInputObject.value > 999 ) {
		myInputObject.value = 999;
	};
	if ( myInputObject.value <= 0 ) {
		myInputObject.value = 0;
	};
}; 
//======================================================================////======================================================================//
function setscreen1( arg ) {
	packageObject = arg;
	var element = arg;
	//console.log(arg);
	 
	screen2.className = "";
	idToggle( "screen-1", "active" ); 
	var templateTitle = "<header>" + element.title + "</header>";
	screenHeader[ 0 ].innerHTML += templateTitle;
	//======================================================================//Datepicker//======================================================================//
	var dateToday = new Date();
	// list of specific disabled dates //
	disabledDates = element.disabled_date;
	for ( var i = 0; i < disabledDates.length; i++ ) {
		disabledDates[ i ] = disabledDates[ i ].replace( /\//g, '-' );
	};
	$( "#datepicker" ).datepicker( {
		minDate: dateToday, // dates before current day disabled //
		beforeShowDay: function( date ) { // disables dates based on disabledDates
			var disabledDatesString = jQuery.datepicker.formatDate( 'mm-dd-yy', date );
			return [ disabledDates.indexOf( disabledDatesString ) == -1 ]
		}
	} );
	$( "#dateInput" ).attr( "name", "" + element.datepicker_id + "" ); 
	if ( localStorage.getItem( "" + $( '#dateInput' ).attr( 'name' ) + "" ) ) {
		$( "#dateInput" ).prop( 'value', localStorage.getItem( element.datepicker_id ) ).trigger( 'change' );
		$( "#datepicker" ).datepicker( 'setDate', $( "#dateInput" ).val() );
	} else if ( element.dateSelected !== "" && element.dateSelected !== " " ) {
		var $date = element.dateSelected;
		$( "#dateInput" ).prop( 'value', $date ).trigger( 'change' );
		$( "#datepicker" ).datepicker( 'setDate', $date );
	} else { 
		$( '.ui-datepicker-current-day' ).removeClass( 'ui-datepicker-current-day' );
		$( '#dateInput' ).val( getTodaysDate() );
		$( '#datepicker' ).val( getTodaysDate() );
	}; 
	$( "#dateInput" ).change( function() {
		$( "#datepicker" ).datepicker( 'setDate', $( this ).val() ).trigger( 'change' );
	} ); 
	$( "#datepicker" ).change( function() {
		if ( $( "#dateInput" ).val() !== disabledDates ) {
			$( "#dateInput" ).prop( 'value', $( this ).val() );
			localStorage.setItem( "" + $( '#dateInput' ).attr( 'name' ) + "", "" + $( '#dateInput' ).val() + "" );
		};
	} );
	//======================================================================////======================================================================//
	let _dateError = document.getElementsByClassName( 'date-error' )[ 0 ];
	let _datePick = document.getElementById( "datepicker" );
	let _dateInpt = document.getElementById( "dateInput" ); 
	//_datePick.onchange = function () {
	//    console.log("CHANGE")
	//    if (_dateInpt.value.trim().length === 0) {
	//        _dateError.className = "date-error";
	//        console.log(this.value);
	//    } else {
	//        _dateError.className = "date-error hidden";
	//    }
	//};
	 
	screenFooter[ 0 ].innerHTML += '<button type="button" id="screen1btn" class="yellow-button">continue</button>'; 
	document.getElementById( "screen1btn" ).addEventListener( "click", function() {
		if ( datePicker.value.trim().length === 0 || datePicker.value === null || datePicker.value === undefined ) {
			/*dateError.className = "date-error";*/
		} else {
			/*_dateError.className = "date-error hidden";*/
			setscreen2( element );
		}
	} );
}; 
//======================================================================////======================================================================//
//======================================================================////======================================================================//
var termsCheck;
var participantInput;
var packageObject; 
function setscreen2( arg ) {
	let el = arg;
	packageObject = el;
	screen1.className = ""; 
	idToggle( "screen-2", "active" );
	for ( var i = 0; i < screenHeader.length; i++ ) {
		screenHeader[ i ].innerHTML = "";
	};
	for ( var i = 0; i < screenFooter.length; i++ ) {
		screenFooter[ i ].innerHTML = "";
	}; 
	screenHeader[ 1 ].innerHTML += "<header>" + el.title + "</header>";
	adultPrice.innerHTML = "<span>" + el.adult_price + "</span>";
	youthPrice.innerHTML = "<span>" + el.youth_price + "</span>";
	childPrice.innerHTML = "<span>" + el.child_price + "</span>";
	lapChildPrice.innerHTML = "<span>" + el.lap_child_price + "</span>"; 
	transportationPrice.innerHTML = "<span>" + el.transportation_price + "</span>"; 
	adultPriceInput.setAttribute( "name", "" + el.adult_price_id + "" );
	youthPriceInput.setAttribute( "name", "" + el.youth_price_id + "" );
	childPriceInput.setAttribute( "name", "" + el.child_price_id + "" );
	lapChildPriceInput.setAttribute( "name", "" + el.lap_child_id + "" ); 
	transportationInput.setAttribute( "name", "" + el.package_transportation + "" );  
	/*======================================================================================*/
	/*======================================================================================*/
	/*======================================================================================*/
	   
	var transportationInputName;
	var earlyTransportationName;
	var transportationInputName = transportationInput.getAttribute( "name" ); 
	var pickupDate = document.getElementById( 'dateInput' ).value;
	var dateBefore;
	var dateAfter; 
	dateBefore = pickupDate.split( "/" );
	dateBefore[ 1 ] = dateBefore[ 1 ] - 1;
	dateBefore = dateBefore.join( "/", "," ); 
	dateAfter = pickupDate.split( "/" );
	dateAfter[ 1 ] = dateAfter[ 1 ] + 1;
	dateAfter = dateAfter.join( "/", "," ); 
	var hasEarly = el.has_early_pickup; 
	const setUpEarlyTransport = function() {
		earlyTransportation.innerHTML += "<span>Need early transportation?</span>"
		earlyTransportationInput = document.createElement( "input" );
		earlyTransportationInput.setAttribute( "type", "checkbox" );
		earlyTransportationInput.setAttribute( "name", "" + el.early_pickup_package + "" );
		earlyTransportationInput.setAttribute( "id", "early-checkbox" );
		earlyTransportation.appendChild( earlyTransportationInput );  
		var earlyTransportationName = earlyTransportation.getAttribute( "name" ); 
		if ( hasEarly === true && !localStorage.getItem( earlyTransportationName ) ) {
			earlyTransportationInput.checked = el.early_pickup_checked;
			earlyTransportationInput.value = el.early_pickup_checked;
		} else if ( localStorage.getItem( earlyTransportationName ) ) {
			//console.log("local storage checkbox ",el.early_pickup_checked);
			earlyTransportationInput.checked = JSON.parse( localStorage.getItem( earlyTransportationName ) );
			earlyTransportationInput.value = JSON.parse( localStorage.getItem( earlyTransportationName ) );
		} else {
			earlyTransportationInput.checked = false;
			earlyTransportationInput.value = false;
		};
		earlyTransportationInput.onclick = function() {
			if ( earlyTransportationInput.checked === true ) {
				earlyTransportationInput.value = true;
				localStorage.setItem( earlyTransportationName, true );
			} else {
				earlyTransportationInput.value = false;
				localStorage.setItem( earlyTransportationName, false );
			};
		};
	}; 
	if ( pickupDate === getTodaysDate() ) {
		if ( getHawaiiTime() < 12 ) {
			hasEarly = false;
		} else {
			hasEarly = false;
			document.getElementById( "transportation" ).innerHTML = ' ';
		};
	} else if ( dateBefore === getTodaysDate() && getHawaiiTime() < 18 ) { 
		setUpEarlyTransport(); 
	} else if ( pickupDate !== getTodaysDate() && pickupDate !== dateAfter ) { 
		setUpEarlyTransport(); 
	} else {
		console.log( "time paradox" ); 
		hasEarly = false; 
	};
	/*======================================================================================*/
	/*======================================================================================*/
	/*======================================================================================*/
	 
	var $adultInputName = adultPriceInput.getAttribute( "name" );
	var $youthInputName = youthPriceInput.getAttribute( "name" );
	var $childInputName = childPriceInput.getAttribute( "name" );
	var $lapChildInputName = lapChildPriceInput.getAttribute( "name" ); 
	if ( el.lap_child_quantity > 0 && el.lap_child_quantity !== 0 && !localStorage.getItem( "" + $lapChildInputName + "" ) ) {
		lapChildPriceInput.value = el.lap_child_quantity;
	} else if ( localStorage.getItem( "" + $lapChildInputName + "" ) ) {
		lapChildPriceInput.value = localStorage.getItem( "" + $lapChildInputName + "" );
	} else {
		lapChildPriceInput.value = 0;
	};
	if ( el.adult_price_quantity > 0 && el.adult_price_quantity !== 0 && !localStorage.getItem( "" + $adultInputName + "" ) ) {
		adultPriceInput.value = el.adult_price_quantity;
	} else if ( localStorage.getItem( "" + $adultInputName + "" ) ) {
		adultPriceInput.value = localStorage.getItem( "" + $adultInputName + "" );
	} else {
		adultPriceInput.value = 0;
	}; 
	if ( el.youth_price_quantity.length > 0 && el.youth_price_quantity !== 0 && !localStorage.getItem( "" + $youthInputName + "" ) ) {
		youthPriceInput.value = el.youth_price_quantity;
	} else if ( localStorage.getItem( "" + $youthInputName + "" ) ) {
		youthPriceInput.value = localStorage.getItem( "" + $youthInputName + "" );
		//console.log(localStorage.getItem("" + $youthInputName + ""));
	} else {
		youthPriceInput.value = 0;
	}; 
	if ( el.child_price_quantity > 0 && el.child_price_quantity !== 0 && !localStorage.getItem( "" + $childInputName + "" ) ) {
		childPriceInput.value = el.child_price_quantity;
	} else if ( localStorage.getItem( "" + $childInputName + "" ) ) {
		childPriceInput.value = localStorage.getItem( "" + $childInputName + "" );
		//console.log(localStorage.getItem("" + $childInputName + ""));
	} else {
		childPriceInput.value = 0;
	}; 
	if ( el.transportation_seats !== false && el.transportation_seats > 0 && el.transportation_seats !== 0 && !localStorage.getItem( "" + transportationInputName + "" ) ) {
		transportationInput.value = el.transportation_seats;
	} else if ( localStorage.getItem( "" + transportationInputName + "" ) ) {
		transportationInput.value = localStorage.getItem( "" + transportationInputName + "" );
	} else {
		transportationInput.value = 0;
	}; 
	//======================================================================////======================================================================//
	//======================================================================////======================================================================//
	 
	let participants = document.getElementById( "participants" );
	participantInput = document.createElement( "input" );
	participantInput.setAttribute( "class", "participant-input" );
	participantInput.setAttribute( "name", el.participant_input_name );
	participantInput.setAttribute( "placeholder", "participants names" );
	participants.appendChild( participantInput ); 
	if ( el.participantNamesAges.length > 0 && el.participantNamesAges.length !== 0 && !localStorage.getItem( "" + el.participant_input_name + "" ) ) {
		participantInput.setAttribute( "value", el.participantNamesAges );
		participantInput.innerText = el.participantNamesAges;
	} else if ( localStorage.getItem( "" + el.participant_input_name + "" ) ) {
		participantInput.value = localStorage.getItem( "" + el.participant_input_name + "" );
		participantInput.innerText = localStorage.getItem( "" + el.participant_input_name + "" );
	} else {
		participantInput.value = '';
	}; 
	screenFooter[ 1 ].innerHTML += '<div id="terms-conditions">' + '<input type="checkbox" id="terms-check">' + '<p>by checking this I acknowledge I have read the <a href="privacy.htm" target="_blank">privacy policy</a></p>' + '</div>'
	screenFooter[ 1 ].innerHTML += '<button type="button" id="screen2back" class="yellow-button">back</button>';
	screenFooter[ 1 ].innerHTML += '<button type="submit" name="submit" value="Book Now" class="yellow-button" id="checkout" disabled/>checkout</a>'; 
	document.getElementById( "screen2back" ).addEventListener( "click", function() {
		localStorage.setItem( "" + el.participant_input_name + "", "" + participantInput.value + "" );
		participants.innerHTML = "";
		earlyTransportation.innerHTML = "";
		setscreen1( el );
	} ); 

	var $checkout = document.getElementById( "checkout" ); 
	document.getElementById( "terms-check" ).addEventListener( "change", function() {
		if ( this.checked ) {
			$checkout.disabled = false;
		} else {
			$checkout.disabled = true;
		}
	} )
  $checkout.onclick = function(){
		console.log( "adultPriceValue " + adultPriceValue + " youthPriceValue " + youthPriceValue + " childPriceValue " + childPriceValue + " lapChildPriceValue " + lapChildPriceValue + " transportationPriceValue " + transportationPriceValue + "" );

    if ( adultPriceValue === "0" || youthPriceValue === "0" || childPriceValue === "0" || lapChildPriceValue === "0" || transportationPriceValue === "0" ) {
      alert("pleasse select a price");
      return false;
    }
  }
}; 
//======================================================================////======================================================================//
//======================================================================////======================================================================//

function resetPurchaseUi() { 
	idToggle( "purchase-window", "active" ); 
	screen1.className = "";
	screen2.className = ""; 
	datePicker.setAttribute( "name", "" ); 
	for ( var i = 0; i < screenHeader.length; i++ ) {
		screenHeader[ i ].innerHTML = "";
	};
	for ( var i = 0; i < screenFooter.length; i++ ) {
		screenFooter[ i ].innerHTML = "";
	}; 
	localStorage.setItem( packageObject.lap_child_id, lapChildPriceInput.value );
	localStorage.setItem( packageObject.adult_price_id, adultPriceInput.value );
	localStorage.setItem( packageObject.youth_price_id, youthPriceInput.value );
	localStorage.setItem( packageObject.child_price_id, childPriceInput.value ); 
	localStorage.setItem( packageObject.package_transportation, transportationInput.value ); 
	//console.log(localStorage.getItem,packageObject.package_transportation);
	 
	var numberSpinner = document.getElementsByClassName( "numberSpinnerInput" ); 
	for ( var i = 0; i < numberSpinner.length; i++ ) {
		numberSpinner[ i ].value = 0;
	};
	$( "#dateInput" ).attr( 'value', '' );
	$( "#datepicker" ).datepicker( "destroy" ); 
	if ( participantInput !== undefined ) {
		localStorage.setItem( "" + packageObject.participant_input_name + "", "" + participantInput.value + "" );
		//console.log(localStorage.getItem("" + packageObject.participant_input_name + ""));
		participants.innerHTML = "";
	}; 
	let earlyCheckbox = document.getElementById( "early-checkbox" ) 
	if ( packageObject.has_early_pickup === true && earlyCheckbox !== null ) {
		localStorage.setItem( packageObject.early_pickup_package, earlyCheckbox.checked );
		earlyTransportation.innerHTML = "";
	};
}; 
//======================================================================////======================================================================//
//======================================================================////======================================================================//
