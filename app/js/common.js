$(function() {
	var $mainSlider = $('.main__right-part .slider'),
		$rangeSlider = $('.main__right-part .slider__calculator .calc.range .range-slider'),
		$selectCountry = $('.main__right-part .slider__calculator .calc.multiselects .select-country .icons'),
		$selectInterests = $('.main__right-part .slider__calculator .calc.multiselects .select-interests .icons'),
		$dropdownsSelect = $('.main__right-part .slider__calculator .calc.multiselects .dropdown');
	
	$mainSlider.slick({
		slidesToShow: 1,
		dots: false,
		arrows: true,
		prevArrow: $('.slider-custom-arrows .prev'),
		nextArrow: $('.slider-custom-arrows .next'),
		infinite: false,
		draggable: false
	});
	
	$rangeSlider.slider({
		range: true,
		min: 0,
		max: 10000000,
		values: [0, 10000000],
		step: 1000,
		stop: function(e, ui) {
			$('input#result').val($(this).slider('values', 0));
		},
		slide: function(e, ui) {
			$('input#result').val($(this).slider('values', 0));
		}
	});
	
	$('input#result').val($rangeSlider.slider('values', 0));
	$('input#result').on('change paste input', function() {
		$(this).val(this.value.replace(/[^0-9\-]/, ''));
	});
	
	$('input#result').on('change', function() {
		var $valueResult = $(this).val();
		var $minVal = $rangeSlider.slider('values', 0);
		var $maxVal = $rangeSlider.slider('values', 1);
		
//		if(parseInt($minVal) > parseInt($maxVal)) {
//			$minVal = $maxVal;
//			$rangeSlider.slider('values', 0, $minVal);
//		}
//		
//		if($maxVal > 10000000) {
//			$maxVal = 10000000;
//			$(this).val(10000000);
//		}
		
		$rangeSlider.slider('values', 0, $valueResult);
	});
	
	$dropdownsSelect.niceScroll({
        cursoropacitymin: 1,
        cursorborderradius: "4px",
        background: "transparet",
        cursorwidth: "15px",
        cursorborder: "none",
        cursorcolor: "#56CCF2",
        autohidemode: "leave"
    });
	
	
	$selectCountry.click(function(e) {
		$(this).find('.arrow').toggleClass('open');
		$(this).siblings('.dropdown').slideToggle();
	});
	
	$selectInterests.click(function(e) {
		$(this).find('.arrow').toggleClass('open');
		$(this).siblings('.dropdown').slideToggle();
	});
		
		
});
	
	
	