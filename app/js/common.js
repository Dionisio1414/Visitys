$(function() {
	var $mainSlider = $('.main__right-part .slider'),
		$rangeSlider = $('.main__right-part .slider__calculator .calc.range .range-slider'),
		$selectCountry = $('.main__right-part .slider__calculator .calc.multiselects .select-country .icons'),
		$selectInterests = $('.main__right-part .slider__calculator .calc.multiselects .select-interests .icons'),
		$dropdownsSelect = $('.main__right-part .slider__calculator .dropdown'),
		$datepickers = $('.main__right-part .slider__calculator .calc.deadlines .datepicker #datepicker'),
		$monthSelects = $('.main__right-part .slider__calculator .calc.deadlines .month .icons'),
		$flag = 0;
	
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
	
	$('.main__right-part .slider__calculator .calc.range>div:nth-child(2) .labels-slide > div:first-child span').text($rangeSlider.slider('values', 0) + " тысяч");	
	$('.main__right-part .slider__calculator .calc.range>div:nth-child(2) .labels-slide > div:last-child span').text($rangeSlider.slider('values', 1) + " млн");
	
//	var parseDigit = parseInt($('.main__right-part .slider__calculator .calc.range>div:nth-child(2) .labels-slide > div:last-child span').text());
//	console.log(Math.round(parseDigit).toFixed(2));
	
	
	$dropdownsSelect.niceScroll({
        cursoropacitymin: 1,
        cursorborderradius: "4px",
        background: "transparet",
        cursorwidth: "15px",
        cursorborder: "none",
        cursorcolor: "#56CCF2",
        autohidemode: "leave"
    });
	
	$datepickers.datepicker({
		buttonText: "Select date"
	});
	
	$datepickers.val(new Date().toLocaleDateString());
	
	$selectCountry.click(function(e) {
		$(this).find('.arrow').toggleClass('open');
		$(this).siblings('.dropdown').slideToggle();
	});
	
	$selectInterests.click(function(e) {
		$(this).find('.arrow').toggleClass('open');
		$(this).siblings('.dropdown').slideToggle();
	});
		
	$monthSelects.click(function() {
		$(this).find('.arrow').toggleClass('open');
		$(this).siblings('.dropdown').slideToggle();
	});
	
	$('.main__right-part .slider__calculator .calc.multiselects .select-country .dropdown ul li input+label, .main__right-part .slider__calculator .calc.multiselects .select-interests .dropdown ul li input+label').click(function() {
		var $inputValue = $(this).siblings('input'),
			$spanValue = $(this).text(),
			$test = ++$flag%2;
		if($test) {
			$(this).siblings('input').prop('checked', true);
			$(this).addClass('checked');
		} else {
			$(this).siblings('input').prop('checked', false);
			$(this).removeClass('checked');
		}
	});
	
		
});

function declension(num, expressions) {
    var result;
    count = num % 100;
    if (count >= 5 && count <= 20) {
        result = expressions['2'];
    } else {
        count = count % 10;
        if (count == 1) {
            result = expressions['0'];
        } else if (count >= 2 && count <= 4) {
            result = expressions['1'];
        } else {
            result = expressions['2'];
        }
    }
    return result;
}


console.log(declension(21, ['страна', 'страны', 'стран']));