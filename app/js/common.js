$(function() {
	var $mainSlider = $('.main__right-part .slider'),
		$rangeSlider = $('.main__right-part .slider__calculator .calc.range .range-slider'),
		$selectCountry = $('.main__right-part .slider__calculator .calc.multiselects .select-country .icons'),
		$selectInterests = $('.main__right-part .slider__calculator .calc.multiselects .select-interests .icons'),
        $selectCountr = $('.modal-form .content .select-countr .icons'),
		$dropdownsSelect = $('.main__right-part .slider__calculator .dropdown'),
		$datepickers = $('.main__right-part .slider__calculator .calc.deadlines .datepicker #datepicker'),
		$monthSelects = $('.main__right-part .slider__calculator .calc.deadlines .month .icons'),
		$flag = 0,
		$overflowContainer = $('.main__right-part .slider__description .overflow-container'),
		$cellsTable = $('.main__right-part .slider__calculator .calc.table-time table tbody tr td'),
        $hdrMnu = $('.main__left-part header nav ul li a'),
        $modalClose = $('.modal-form .modal-close'),
        $modalOverlay = $('.modal-overlay'),
		$mainSelects = $('.main__left-part .main-selects .row-select .col-select .slct .icons');
	
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
	
//	$overflowContainer.niceScroll({
//		cursoropacitymin: 1,
//        cursorborderradius: "4px",
//        background: "transparet",
//        cursorwidth: "15px",
//        cursorborder: "none",
//        cursorcolor: "#56CCF2",
//        autohidemode: "leave"
//	});
    
	
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
	
    $selectCountr.click(function() {
        $(this).find('.arrow').toggleClass('open');
        $(this).siblings('.dropdown').slideToggle();
    });
    
	$mainSelects.click(function() {
		$(this).find('.arrow').toggleClass('open');
        $(this).siblings('.dropdown').slideToggle();
	});
	
	$('.main__right-part .slider__calculator .calc.multiselects .select-country .dropdown ul li input+label, .main__right-part .slider__calculator .calc.multiselects .select-interests .dropdown ul li input+label').click(function() {
		var $input = $(this).siblings('input'),
			$spanValue = $(this).text(),
			$test = ++$flag%2;
		console.log($input);
		if($test) {
			$(this).siblings('input').prop('checked', true);
			$(this).addClass('checked');
		} else {
			$(this).siblings('input').prop('checked', false);
			$(this).removeClass('checked');
		}
	});
	
	$cellsTable.mousedown(function() {
		$(this).toggleClass('table-selected');
		$(this).on('mouseenter', function() {
			$(this).toggleClass('table-selected');
		});
	})
	.mouseup(function() {
		$(this).off('mouseenter');
	});
    
    $hdrMnu.click(function(e) {
        e.preventDefault();
        var $href = $(this).attr('href');
        $($href).addClass('active');
        $('.modal-overlay').css('display', 'block').animate({
            opacity: 1
        }, 350);
    });
	
    $modalClose.click(function() {
        $(this).parent().removeClass('active');
        $('.modal-overlay').animate({
            opacity: 0
        }, 350, function() {
            $(this).css('display', 'none');
        });
    });
    
    $modalOverlay.click(function() {
        $(this).siblings('.modal-form').removeClass('active');
        $modalOverlay.animate({
            opacity: 0
        }, 350, function() {
            $(this).css('display', 'none');
        });
    });
    
    $('.modal-form .modal-tabs ul li a').click(function(e) {
        e.preventDefault();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.modal-form .modal-main-tab').removeClass('active').eq($(this).parent().index()).addClass('active');
    });
    
    
    $('.modal-main-tab .tab-list ul li a').click(function(e) {
        e.preventDefault();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.modal-form .modal-main-tab .tab-content').removeClass('active').eq($(this).parent().index()).addClass('active');
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