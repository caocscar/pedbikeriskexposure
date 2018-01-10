// global variables
var map;
var county_id = {};
var spazLegend = $('#spazLegend');
var roadLegend = $('#roadLegend');


//hide/show side menu
$(".menu-link").click(function(){
    $("#menu").toggleClass("active");
    $(".container").toggleClass("active");
});

//generate dropdown menu
var countOption = $('.old-select option').size();

function openSelect(){
    var heightSelect = $('.new-select').height();
    var j=1;
    $('.new-select .new-option').each(function(){
        $(this).addClass('reveal');
        $(this).css({
            'box-shadow':'0 1px 1px rgba(0,0,0,0.1)',
            'left':'0',
            'right':'0',
            'top': j*(heightSelect+1)+'px'
        });
        j++;
    });
}

function closeSelect(){
    var i=0;
    $('.new-select .new-option').each(function(){
        $(this).removeClass('reveal');
        if(i<countOption-3){
            $(this).css('top',0);
            $(this).css('box-shadow','none');
        }
        else if(i===countOption-3){
            $(this).css('top','3px');
        }
        else if(i===countOption-2){
            $(this).css({
                'top':'7px',
                'left':'2px',
                'right':'2px'
            });
        }
        else if(i===countOption-1){
            $(this).css({
                'top':'11px',
                'left':'4px',
                'right':'4px'
            });
        }
        i++;
    });
}

if($('.old-select option[selected]').size() === 1){
    $('.selection p span').html($('.old-select option[selected]').html());
}
else{
    $('.selection p span').html($('.old-select option:first-child').html());
}

$('.old-select option').each(function(){
    newValue = $(this).val();
    newHTML = $(this).html();
    $('.new-select').append('<div class="new-option" data-value="'+newValue+'"><p>'+newHTML+'</p></div>');
});

var reverseIndex = countOption;
$('.new-select .new-option').each(function(){
    $(this).css('z-index',reverseIndex);
    reverseIndex = reverseIndex-1;
});

closeSelect();


$('.selection').click(function(){
    $(this).toggleClass('open');
    if($(this).hasClass('open')===true){openSelect();}
    else{closeSelect();}
});

//generate radio slider
$('#radios').radiosToSlider();


// 10 fusion tables
var crashes = "1nkg4MnAolr8UEyzBFEnNyovEoEVJnSK_qZvHv6xj";
var pedbike_UP = "1-hG45XDxYXVXay6Rawwn_wdnJ0kxvxMKHB4zsu4n";
var pedbike_NLP = "1ep3obncnepmwZmsd6bW90Gi5YsuOn_2SFnfOEe-5";
var pedbike_SLP = "1XAXEliIqHYq_GJ2rLUtS00w4CVAU3bXTLYZ-qpOX";
var pedroad_UP = "14eKQojT991dai5TvIvJzAvu6AKDLoKI7VNF7S_A7"
var pedroad_North = "1BJKaPQQbg7XvM4KYu9RmbzWcvw3eaFfec7BSgby_"
var pedroad_South = "1nqaUzvbB45QTq1cj6KNQrKSUmSiZ6_GANl76H9JE"
var bikeroad_UP = "19U2mXFwBjrkkECtAfp1f3CGVhD1cmfKi_Z90eJpZ"
var bikeroad_North = "11WyCtfELo_D6cuLUi-UemJIcff-96FFCaqSnOtVQ"
var bikeroad_South = "1SL9-b8xpaLirz_wNHifOdSF0HC8C8uED9LepGOmO"

//legend colors
var PRbins = [0.5, 1, 5, 10];
var PRcolours = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];

var PEbins = [2, 20, 60, 234];
var PEcolours = ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'];

var BRbins = [0.5, 1, 5, 10];
var BRcolours = ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404'];

var BEbins = [0.5, 6, 20, 84];
var BEcolours = ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494'];

var pedbins = [14, 52, 87, 490];
var pedcols = ['#edf8e9','#bae4b3','#74c476','#31a354','#006d2c'];

var bikebins = [7, 36, 66, 400];
var bikecols = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];


//initial filter state
var countySelector = $('#county');
var spazChecker = $('label[for="spaz"]');
var spazSelector = $('.new-option');
var rankingSelector = $('#radios');

var roadChecker = $('label[for="road"]');
var roadSelector = $('.road.selector');
var crashChecker = $('label[for="crash"]');
var crashSelector = $('.crash.selector');


var selectedCounty = "Michigan";
countySelector.val(selectedCounty);

$('#spaz').prop("checked",false);
$('.riskex.spaz').show();

$('#road').prop("checked",true);
$('.riskex.road').hide();

$('#crash').prop("checked",true);
$('.riskex.crash').hide();

$('#school').prop("checked",true);
$('#bar').prop("checked",true);


var hideSpaz = $('#spaz').prop("checked");
var hideRoad = $('#road').prop("checked");
var hideCrash = $('#crash').prop("checked");

spazChecker.on("click",function () {
    hideSpaz = !hideSpaz;
    $('.riskex.spaz').slideToggle("fast");
});

roadChecker.on("click",function () {
    hideRoad = !hideRoad;
    $('.riskex.road').slideToggle("fast");
});

crashChecker.on("click",function () {
    hideCrash = !hideCrash;
    $('.riskex.crash').slideToggle("fast");
});

var styleid = 2;
var roadid = 0;

// Selection
spazSelector.click(function(){
    styleid = $(this).data('value');

    // Selection New Select
    $('.selection p span').html($(this).find('p').html());
    $('.selection').click();

    // Selection Old Select
    $('.old-select option[selected]').removeAttr('selected');
    $('.old-select option[value="'+styleid+'"]').attr('selected','');


});

$('#rb5').prop("checked",true);
$('#rb7').prop("checked",true);
rankingSelector.attr('data-value',99999);
$('.old-select option[value="'+styleid+'"]').prop("selected",true);




function initAutocomplete(){
    $.widget("ui.autocomplete", $.ui.autocomplete, {

        // extend default options
        options: {
            animation: '' // the CSS class (animation) that will be added to dropdown when opened
        },

        _suggest: function(items) {

            var self = this;


            var animationName = self.options.animation;

            if ( animationName === '' ) {

                // Invoke the parent widget's method.
                self._super(items);
                return;

            }

            // if another animation is running or has run
            if ( self.menu.element.hasClass('animated') ) {

                // last animation was completed
                if ( self.menu.element.data('animation_ended') ) {
                    self._super(items);

                } else {


                    var _super = self._super.bind(self, items);

                    self.menu.element
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).data('animation_ended', true);

                            // Invoke the parent widget's method.
                            _super();
                        });

                }

            } else {

                // Invoke the parent widget's method.
                self._super(items);

                self.menu.element
                    .data('animation_ended', false)
                    .addClass('animated ' + animationName)
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).data('animation_ended', true);
                    });

            }

        },

        _close: function(event) {

            var self = this;

            // Invoke the parent widget's method.
            self._super(event);

            if ( self.options.animation ) {
                self.menu.element.removeClass('animated ' + self.options.animation);
            }

        },

    });

//            search box data source
    var countyNames = [
        "Michigan",
        "Alcona",
        "Alger",
        "Allegan",
        "Alpena",
        "Antrim",
        "Arenac",
        "Baraga",
        "Barry",
        "Bay",
        "Benzie",
        "Berrien",
        "Branch",
        "Calhoun",
        "Cass",
        "Charlevoix",
        "Cheboygan",
        "Chippewa",
        "Clare",
        "Clinton",
        "Crawford",
        "Delta",
        "Dickinson",
        "Eaton",
        "Emmet",
        "Genesee",
        "Gladwin",
        "Gogebic",
        "Grand Traverse",
        "Gratiot",
        "Hillsdale",
        "Houghton",
        "Huron",
        "Ingham",
        "Ionia",
        "Iosco",
        "Iron",
        "Isabella",
        "Jackson",
        "Kalamazoo",
        "Kalkaska",
        "Kent",
        "Keweenaw",
        "Lake",
        "Lapeer",
        "Leelanau",
        "Lenawee",
        "Livingston",
        "Luce",
        "Mackinac",
        "Macomb",
        "Manistee",
        "Marquette",
        "Mason",
        "Mecosta",
        "Menominee",
        "Midland",
        "Missaukee",
        "Monroe",
        "Montcalm",
        "Montmorency",
        "Muskegon",
        "Newaygo",
        "Oakland",
        "Oceana",
        "Ogemaw",
        "Ontonagon",
        "Osceola",
        "Oscoda",
        "Otsego",
        "Ottawa",
        "Presque Isle",
        "Roscommon",
        "Saginaw",
        "Sanilac",
        "Schoolcraft",
        "Shiawassee",
        "St. Clair",
        "St. Joseph",
        "Tuscola",
        "Van Buren",
        "Washtenaw",
        "Wayne",
        "Wexford"
    ];


    for (var i=0;i<countyNames.length;i++){
        if (i == 0){
            county_id[countyNames[i]]=0;
        } else {
            county_id[countyNames[i]]=2*i-1;
        }
    }

    countySelector.autocomplete({
        minLength: 0,
        source: function (request, response) {
            var matches = $.map(countyNames, function (acItem) {
                if (acItem.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
                    return acItem;
                }
            });
            response(matches);
        },
        focus: function( event, ui ) {
            countySelector.val( ui.item.value);
            return false;
        },
        // event triggered when drop-down option selected
        select: function( event, ui ) {
            countySelector.val( ui.item.value);
            selectedCounty = ui.item.value;
            updateMap();
            return false;
        },

        animation: "flipInX"
    });

    countySelector.keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
        }
    });

    countySelector.on('click focus', function() {
        this.value = '';
    });

    $('.ui-autocomplete').appendTo($('.nav'));
}



function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 42.25, lng: -83.7},
        mapTypeId: 'roadmap', // ['roadmap','satellite','hybrid','terrain'] are the 4 basemaps
    });
    // add fusion table layer

    pedbikelayerSLP = new google.maps.FusionTablesLayer({
        map: map,
        query: {select: 'geometry',
            from: pedbike_SLP,
            where: "PRrank > 0"},
        options: {styleId: 2,
            templateId: 2},
    });
    pedbikelayerNLP = new google.maps.FusionTablesLayer({
        map: map,
        query: {select: 'geometry',
            from: pedbike_NLP,
            where: "PRrank > 0"},
        options: {styleId: 2,
            templateId: 2},
    });
    pedbikelayerUP = new google.maps.FusionTablesLayer({
        map: map,
        query: {select: 'geometry',
            from: pedbike_UP,
            where: "PRrank > 0"},
        options: {styleId: 2,
            templateId: 2},
    });
    roadlayerSouth = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedroad_South},
        options: {styleId: 2,
            templateId: 2},
    });
    roadlayerNorth = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedroad_North},
        options: {styleId: 2,
            templateId: 2},
    });
    roadlayerUP = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedroad_UP},
        options: {styleId: 2,
            templateId: 2},
    });
    crashlayer = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: crashes},
        options: {styleId: 2,
            templateId: 2},
    });

    //init legend
    drawLegend(styleid,roadid);

    spazSelector.each(function (i,obj) {
        google.maps.event.addDomListener(obj, 'click', updateMap);
    });

    rankingSelector.each(function (i,obj) {
        google.maps.event.addDomListener(obj, 'click', updateMap);
    });

    roadSelector.each(function (i,obj) {
        google.maps.event.addDomListener(obj, 'click', updateMap);
    });

    crashSelector.each(function (i,obj) {
        google.maps.event.addDomListener(obj, 'click', updateMap);
    });

    google.maps.event.addDomListener(spazChecker[0], 'click',updateMap);
    google.maps.event.addDomListener(roadChecker[0], 'click',updateMap);
    google.maps.event.addDomListener(crashChecker[0], 'click', updateMap);

}


function updateMap(){
    if (hideSpaz) {
        pedbikelayerSLP.setMap(null);
        pedbikelayerNLP.setMap(null);
        pedbikelayerUP.setMap(null);
        styleid = 0;
    }else{
        pedbikelayerSLP.setMap(map);
        pedbikelayerNLP.setMap(map);
        pedbikelayerUP.setMap(map);
        styleid = $('.old-select option[selected="selected"]').val();
    }

    if (hideRoad) {
        roadlayerSouth.setMap(null);
        roadlayerNorth.setMap(null);
        roadlayerUP.setMap(null);
        roadid = 0;
    }else{
        roadlayerSouth.setMap(map);
        roadlayerNorth.setMap(map);
        roadlayerUP.setMap(map);
        roadid = $('.road.selector:checked').val();
    }

    if(hideCrash){
        crashlayer.setMap(null);
    } else {
        crashlayer.setMap(map);
    }

    console.log(styleid);

    var ranking = rankingSelector.attr("data-value");

    var rankcol = (styleid == 2) ? "PRrank > 0 AND PRrank":
            (styleid == 3) ? "BRrank > 0 and BRrank":
            (styleid == 4) ? "PErank" : "BErank";

    var county = county_id[selectedCounty];
    county = (county == 0) ? ">"+county : "="+county;

    var crash = $('.crash.selector:checked').val();

    pedbikelayerSLP.setOptions({
        query: {select: 'geometry',
            from: pedbike_SLP,
            where: "fips" + county + " AND " + rankcol + " <= " + ranking},
        styleId: styleid
    });
    pedbikelayerNLP.setOptions({
        query: {select: 'geometry',
            from: pedbike_NLP,
            where: "fips" + county + " AND " + rankcol + " <= " + ranking},
        styleId: styleid
    });
    pedbikelayerUP.setOptions({
        query: {select: 'geometry',
            from: pedbike_UP,
            where: "fips" + county + " AND " + rankcol + " <= " + ranking},
        styleId: styleid
    });


    roadlayerSouth.setOptions({
        query: {select: 'geometry',
            from: (roadid == 1) ? pedroad_South : bikeroad_South,
            // from: eval(roadType+"road_South"),
            where: "fips " + county},
    });
    roadlayerNorth.setOptions({
        query: {select: 'geometry',
            from: (roadid == 1) ? pedroad_North : bikeroad_North,
            // from: eval(roadType+"road_North"),
            where: "fips " + county},
    });
    roadlayerUP.setOptions({
        query: {select: 'geometry',
            from: (roadid == 1) ? pedroad_UP : bikeroad_UP,
            // from: eval(roadType+"road_UP"),
            where: "fips " + county},
    });



    crashlayer.setOptions({
        query: {select: 'geometry',
            from: crashes,
            where: "fips " + county + " AND " + crash + " =1"},
    });


    //update legend
    drawLegend(styleid,roadid);

}

function drawLegend(styleid,rd){
    if (styleid == 0 && rd == 0){
        spazLegend.hide();
        roadLegend.hide();
    } else if (styleid == 0){
        spazLegend.hide();
        roadLegend.show();
        drawroadLegend(rd);
    } else if (rd == 0){
        spazLegend.show();
        roadLegend.hide();
        drawSpazLegend(styleid);
    } else {
        spazLegend.show();
        roadLegend.show();
        drawroadLegend(rd);
        drawSpazLegend(styleid);
    }
}

function drawSpazLegend(styleid){
    if (styleid==2){
        var colorScale = d3.scaleThreshold().domain(PRbins).range(PRcolours);
        var title = "Pedestrian Risk";
    } else if (styleid==3){
        var colorScale = d3.scaleThreshold().domain(BRbins).range(BRcolours);
        var title = "Bike Risk";
    } else if (styleid==4){
        var colorScale = d3.scaleThreshold().domain(PEbins).range(PEcolours);
        var title = "Pedestrian Exposure";
    } else if (styleid==5){
        var colorScale = d3.scaleThreshold().domain(BEbins).range(BEcolours);
        var title = "Bike Exposure";
    }
    d3.select("#spazLegend").select("svg").remove();
    var legendsvg = d3.select("#spazLegend").append("svg");
    legendsvg.append("g")
        .attr("class","dynamicLegend")
        .attr("transform", "translate(5,15)");

    var legendOptions = d3.legendColor()
        .labelFormat(d3.format(""))
        .title(title)
        .labels(generateSpazLabels)
        .shapeWidth(20)
        .scale(colorScale);
    legendsvg.select('.dynamicLegend').call(legendOptions);
    legendsvg.select('.legendCells').attr('transform','translate(0, 10)')

}

function drawroadLegend(roadid){
    if (roadid==1){
        var colorScale = d3.scaleThreshold().domain(pedbins).range(pedcols);
        var title = "Pedestrian - Road";
    } else if (roadid==2){
        var colorScale = d3.scaleThreshold().domain(bikebins).range(bikecols);
        var title = "Bike - Road";
    }
    d3.select("#roadLegend").select("svg").remove();
    var legendsvg = d3.select("#roadLegend").append("svg");
    legendsvg.append("g")
        .attr("class","dynamicLegend")
        .attr("transform", "translate(5,15)");
    var legendOptions = d3.legendColor()
        .labelFormat(d3.format(""))
        .title(title)
        .labels(generateRoadLabels)
        .shape("line")
        .shapeWidth(20)
        .scale(colorScale);
    legendsvg.select('.dynamicLegend').call(legendOptions);
    legendsvg.select('.legendCells').attr('transform','translate(0, 18)')

}

function generateSpazLabels(legendOpts){
    if (styleid==2){
        var max=50;
    } else if (styleid==3){
        var max = 50;
    } else if (styleid==4){
        var max = 2400;
    } else if (styleid==5){
        var max = 1100;
    }
    if (legendOpts.i === 0 ) {
        return legendOpts.generatedLabels[legendOpts.i]
            .replace('NaN to', '0 to');
    } else if (legendOpts.i === legendOpts.genLength - 1) {
        return legendOpts.generatedLabels[legendOpts.i]
            .replace(' to NaN', ' to '+max);
    }
    return legendOpts.generatedLabels[legendOpts.i];
}

function generateRoadLabels(legendOpts){
    if (roadid==1){
        var max =1100;
    } else if (roadid==2){
        var max=900;
    }
    if (legendOpts.i === 0 ) {
        return legendOpts.generatedLabels[legendOpts.i]
            .replace('NaN to', '0 to');
    } else if (legendOpts.i === legendOpts.genLength - 1) {
        return legendOpts.generatedLabels[legendOpts.i]
            .replace(' to NaN', ' to '+max);
    }
    return legendOpts.generatedLabels[legendOpts.i];
}

function show_intro() {
    if (localStorage.getItem('intro_shown')) {
        // already shown
        return
    }
    localStorage.setItem('intro_shown', true);
    intro = introJs();
    intro.setOption('tooltipPosition', 'auto');
    intro.setOption('disableInteraction', true);
    intro.setOptions({
        steps: [
            {
                intro: "Welcome to the MDOT Pedestrian-Road Project page, which visualizes risk/exposure and crash points distributions."
            },
            {
                element:"#step1",
                intro: "Click here to open up the side menu which allows you to search for locations and adjust variables.",
            },
            {
                element:"#step2",
                intro: "The legend indicates that the darker the color the higher the risk/exposure value.",
            },
        ]
    });
    intro.start()
}


$(window).load(function() {
        initMap();
        initAutocomplete();
        show_intro();
});