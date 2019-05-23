//
// Configuration
//

// ms to wait after dragging before auto-rotating
var rotationDelay = 3000
// scale of the globe (not the canvas element)
var scaleFactor = 0.9
// autorotation speed
var degPerSec = 6
// start angles
var angles = {
    x: -20,
    y: 40,
    z: 0
}
// colors
var colorWater = '#01061D'
var colorLand = '#000'
var colorGraticule = '#000'
var colorCountry = '#7DF0F6'


//
// Handler
//

function enter(country) {
    var country = countryList.find(function(c) {
        return c.id === country.id
    })

    current.text(country && country.name || '')
}

function leave(country) {
    current.text('')
}

//
// Variables
//

var current = d3.select('#current')
var canvas = d3.select('#globe')
var context = canvas.node().getContext('2d')
var water = {
    type: 'Sphere'
}
var projection = d3.geoOrthographic().precision(0.1)
var graticule = d3.geoGraticule10()
var path = d3.geoPath(projection).context(context)
var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
var r0 // Projection rotation as Euler angles at start.
var q0 // Projection rotation as versor at start.
var lastTime = d3.now()
var degPerMs = degPerSec / 1000
var width, height
var land, countries
var countryList
var autorotate, now, diff, roation
var currentCountry

/*zoom function*/
function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
            elem.addEventListener("mousewheel", handler);
        } else {
            elem.addEventListener("MozMousePixelScroll", handler);
        }
    } else { // IE8-
        text.attachEvent("onmousewheel", handler);
    }
}
$('.btn-minus').on({
    click: function() {
        scaleFactor -= 0.1;
        scale()
    }
})
$('.btn-plus').on({
    click: function() {
        scaleFactor += 0.1;
        scale()
    }
})
addOnWheel(globe, function(e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    // отмасштабируем при помощи CSS
    if (delta > 0) scaleFactor += 0.1;
    else scaleFactor -= 0.1;

    scale()
    // отменим прокрутку
    e.preventDefault();
});


//
// Functions
//

function setAngles() {
    var rotation = projection.rotate()
    rotation[0] = angles.y
    rotation[1] = angles.x
    rotation[2] = angles.z
    projection.rotate(rotation)
}

function scale() {
    if (document.documentElement.clientWidth <= 767) {
        width = document.documentElement.clientWidth
    } else {
        width = document.documentElement.clientWidth / 2
    }
    height = document.documentElement.clientHeight
    canvas.attr('width', width).attr('height', height)
    projection
        .scale((scaleFactor * Math.min(width, height)) / 2)
        .translate([width / 2, height / 2])
    render()
}

/*function startRotation(delay) {
  autorotate.restart(rotate, delay || 0)
}

function stopRotation() {
  autorotate.stop()
}*/

function dragstarted() {
    v0 = versor.cartesian(projection.invert(d3.mouse(this)))
    r0 = projection.rotate()
    q0 = versor(r0)
    /*stopRotation()*/
}

function dragged() {
    var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this)))
    var q1 = versor.multiply(q0, versor.delta(v0, v1))
    var r1 = versor.rotation(q1)
    projection.rotate(r1)
    render()
}

function dragended() {
    /* startRotation(rotationDelay)*/
}

function render() {
    context.clearRect(0, 0, width, height)
    fill(water, 'transparent')
    fillImg(land, 'transparent')
    //stroke(graticule, colorGraticule)
    if (currentCountry) {
        fillCountries(currentCountry, colorCountry)
    }
    stroke(countries, '#01061D')
}
var img = new Image();
img.src = 'https://frasers-riviere.com/wp-content/uploads/2019/02/stars-bkg.jpg'

function fillCountries(obj, color) {
    context.beginPath()
    path(obj)
    context.fillStyle = color
    context.fill()
    context.strokeStyle = '#000'
    context.stroke()
}

function fill(obj, color) {
    context.beginPath()
    path(obj)
    context.shadowColor = '#7DF0F6'
    context.shadowBlur = 15
    context.fillStyle = color
    context.fill()
}

function fillImg(obj, color) {
    if (document.documentElement.clientWidth <= 767) {
        width = document.documentElement.clientWidth
    } else {
        width = document.documentElement.clientWidth / 2
    }
    height = document.documentElement.clientHeight
    context.beginPath()
    path(obj)
    context.save();
    context.clip()
    context.drawImage(img, 0, 0, width, height)
    context.fill()
    context.stroke()
    context.restore()
}

function stroke(obj, color) {
    context.beginPath()
    path(obj)
    context.shadowColor = '#7DF0F6'
    context.shadowBlur = 0
    context.strokeStyle = '#000'
    context.stroke()
}

function rotate(elapsed) {
    now = d3.now()
    diff = now - lastTime
    if (diff < elapsed) {
        rotation = projection.rotate()
        rotation[0] += diff * degPerMs
        projection.rotate(rotation)
        render()
    }
    lastTime = now
}

function loadData(cb) {
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json', function(error, world) {
        if (error) throw error
        d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv', function(error, countries) {
            if (error) throw error
            cb(world, countries)
        })
    })
}

// https://github.com/d3/d3-polygon
function polygonContains(polygon, point) {
    var n = polygon.length
    var p = polygon[n - 1]
    var x = point[0],
        y = point[1]
    var x0 = p[0],
        y0 = p[1]
    var x1, y1
6    var inside = false67\
    for (var i = 0; i < n; ++i) {
        p = polygon[i], x1 = p[0], y1 = p[1]
        if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
        x0 = x1, y0 = y1
    }
    return inside
}

function mousemove() {
    var c = getCountry(this)
    console.log(c)
    if (!c) {
        if (currentCountry) {
            leave(currentCountry)
            currentCountry = undefined
            render()
        }
        return
    }
    if (c === currentCountry) {
        return
    }
    currentCountry = c
    render()
    enter(c)
}

function getCountry(event) {
    var pos = projection.invert(d3.mouse(event))
    return countries.features.find(function(f) {
        return f.geometry.coordinates.find(function(c1) {
            return polygonContains(c1, pos) || c1.find(function(c2) {
                return polygonContains(c2, pos)
            })
        })
    })
}

//
// Initialization
//

setAngles()


/*select list*/
var countryTooltip = d3.select("body").append("div").attr("class", "countryTooltip"),
    countryList1 = d3.select("main").append("select").attr("name", "countries");




canvas
    .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )
    .on('mousemove', mousemove)

loadData(function(world, cList) {
    land = topojson.feature(world, world.objects.land)
    countries = topojson.feature(world, world.objects.countries)
    countryList = cList

    /*select list*/
    var countryById = {}
    countries_list = topojson.feature(world, world.objects.countries).features

    cList.forEach(function(d) {
        countryById[d.id] = d.name;
        option = countryList1.append("option");
        option.text(d.name);
        option.property("value", d.id);
    });



    d3.select("select").on("change", function() {
        var focusedCountry = country(countries_list, this.value)
        projection.rotate();
        console.log(focusedCountry)
        

        var c = focusedCountry
        console.log(c);
        if (!c) {
            if (currentCountry) {
                leave(currentCountry)
                currentCountry = undefined
                render()
            }
            return
        }
        if (c === currentCountry) {
            return
        }
        currentCountry = c
        render()
        enter(c);

        // p = d3.geo.centroid(focusedCountry);

        /*(function transition() {
        d3.transition()
        .duration(2500)
        .tween("rotate", function() {
          var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
          return function(t) {
            projection.rotate(r(t));
          };
        })
        })();*/

    })

    function country(cnt, sel) {
        for (var i = 0, l = cnt.length; i < l; i++) {
          console.log(cnt[i].id +", id: " + sel)
            if (cnt[i].id == sel) {
                return cnt[i];
            }
        }
    }


    window.addEventListener('resize', scale)
    scale()
    //autorotate = d3.timer(rotate)
})