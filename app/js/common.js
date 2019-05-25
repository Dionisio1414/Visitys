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
	
	
	$mainSlider.on('init', function(e, slick) {
		var prev = $('.slider-custom-arrows .prev').attr('aria-disabled');
		if(prev) {
			$('.slider-custom-arrows .prev').css('opacity', .5);
		}
	});
	
	$mainSlider.slick({
		slidesToShow: 1,
		dots: false,
		arrows: true,
		prevArrow: $('.slider-custom-arrows .prev'),
		nextArrow: $('.slider-custom-arrows .next'),
		infinite: false,
		draggable: false
	})
	.on("afterChange", function(e, slick, currentSlide, nextSlide) {
		if(currentSlide === 0) {
			$('.slider-custom-arrows .prev').css({opacity: .5})	
		} else {
			$('.slider-custom-arrows .prev').css({opacity: 1})	
		}
		
		if(slick.$slides.length - 1 == currentSlide) {
			$('.slider-custom-arrows .next').css({opacity: .5})		
		} else {
			$('.slider-custom-arrows .next').css({opacity: 1})	
		}
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
	
	$('.main__right-part .slider__calculator .calc.multiselects .select-country .dropdown ul li input+label').click(function() {
		var $input = $(this).closest('.dropdown').siblings('input'),
			$spanValue,
			$test = ++$flag%2,
			$lenList;
		if($test) {
			$lenList = 0;
			$(this).siblings('input').prop('checked', true);
			$(this).addClass('checked');
			$('.main__right-part .slider__calculator .calc.multiselects .select-country .dropdown ul li label ').each(function(i, item) {
				if(item.className === 'checked') {
					$lenList++;
				}
			});
		} else {
			$(this).siblings('input').prop('checked', false);
			$(this).removeClass('checked');
		}
		
		if($lenList == 1) {
			$spanValue = $(this).find('span').text();
			$input.val($spanValue);
		} else if(typeof $lenList == "undefined") {
			$input.val('Страна посетителей');
		} else {
			$input.val("Выбрано " + $lenList + " страны");
		}	
	});
	
	$('.main__right-part .slider__calculator .calc.multiselects .select-interests .dropdown ul li input+label').click(function() {
		var $input = $(this).closest('.dropdown').siblings('input'),
			$spanValue,
			$test = ++$flag%2,
			$lenList;
		if($test) {
			$lenList = 0;
			$(this).siblings('input').prop('checked', true);
			$(this).addClass('checked');
			$('.main__right-part .slider__calculator .calc.multiselects .select-interests .dropdown ul li label ').each(function(i, item) {
				if(item.className === 'checked') {
					$lenList++;
				}
			});
		} else {
			$(this).siblings('input').prop('checked', false);
			$(this).removeClass('checked');
		}
		
		if($lenList == 1) {
			$spanValue = $(this).find('span').text();
			$input.val($spanValue);
		} else if(typeof $lenList == "undefined") {
			$input.val('Интересы посетителей');
		} else {
			$input.val("Выбрано " + $lenList + " услуги");
		}	
	});
	
	$('.main__right-part .slider__calculator .calc.deadlines>div .dropdown ul li a').click(function(e) {
		e.preventDefault();
		$(this).closest('.dropdown').siblings('input').val($(this).text().trim());
	});
	
	$('.main__left-part .main-selects .row-select .col-select .select-currency .dropdown ul li a').click(function(e) {
		e.preventDefault();
		$(this).closest('.dropdown').siblings('input').val($(this).text().trim());
	});
	
	$('.main__left-part .main-selects .row-select .col-select .select-countr .dropdown ul li a').click(function() {
		var $input = $(this).closest('.dropdown').siblings('input'),
			$imgSrc = $(this).find('img').attr('src'),
			$text = $(this).find('span').text().trim(),
			$inputIcon = $(this).closest('.dropdown').siblings('.icons').find('.icon').find('img');
			
		$input.val($text);
		$inputIcon.attr('src', $imgSrc);
	});
	
	$('.main__left-part .main-selects .row-select .col-select .select-languages .dropdown ul li a').click(function() {
		var $input = $(this).closest('.dropdown').siblings('input'),
			$imgSrc = $(this).find('img').attr('src'),
			$text = $(this).find('span').text().trim(),
			$inputIcon = $(this).closest('.dropdown').siblings('.icons').find('.icon').find('img');
			
		$input.val($text);
		$inputIcon.attr('src', $imgSrc);
	});
	
	$('.modal-form .content .select-countr .dropdown ul li a').click(function() {
		var $input = $(this).closest('.dropdown').siblings('input'),
			$imgSrc = $(this).find('img').attr('src'),
			$text = $(this).find('span').text().trim(),
			$inputIcon = $(this).closest('.dropdown').siblings('.icons').find('.icon').find('img');
			
		$input.val($text);
		$inputIcon.attr('src', $imgSrc);
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
		var $tabContent = $(this).closest('.tab-list').parent().next().find('.tab-content');
        $(this).parent().addClass('active').siblings().removeClass('active');
        $tabContent.removeClass('active').eq($(this).parent().index()).addClass('active');	
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
