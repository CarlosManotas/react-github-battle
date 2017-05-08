(function(){

		var figuras = $(document).find("main");
		console.log(figuras);

		figuras.on('mouseenter' , "figure" , function(ev ){
			addClass( ev, this, 'in' );
		});
		figuras.on('mouseleave' , "figure" , function(ev){
			addClass( ev, this, 'out' );
		});
	
	var getDirection = function (ev, obj) {
	    var w = obj.offsetWidth,
	        h = obj.offsetHeight,
	        x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
	        y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
	        d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;

	    return d;
	};
	var addClass = function ( ev, obj, state ) {
		    var direction = getDirection( ev, obj ),
		        class_suffix = "";

		    obj.className = "";

		    switch ( direction ) {
		        case 0 : class_suffix = '-top';    break;
		        case 1 : class_suffix = '-right';  break;
		        case 2 : class_suffix = '-bottom'; break;
		        case 3 : class_suffix = '-left';   break;
		    }

		    obj.classList.add( state + class_suffix );
	};



})();
