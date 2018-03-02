// global variables
var map,selectedLayer,tableid,query;
var county_id = {};
var spazLegend = $('#spazLegend');
var roadLegend = $('#roadLegend');
var crashLegend = $('#crashLegend');
var styleid = 2;
var roadid = 0;

// 10 fusion tables
var crashes = "1WYNs_bniznkgQMwU-lhxstOJ7vlTvVggXSV4TMUh";
var pedbike_Superior = "1pp4Axxd5C8U7RByKuZsidxmSulBH7YSDTWn25ohQ";
var pedbike_NorthBay = "12Vn0EY7_LJm_kHKsjUnJO4luY-4cekMha6QCiPoG";
var pedbike_GMUS = "1pL3uVpWWEVwXZLUs-LvfSMFSBwd-KL94bT7qxUm9";
var pedroad_SuperNorthBay = "1xmTwYnMVqWloOCs2r4CaXLSmmSUAORhTbK4oHJN7";
var pedroad_GrandSW = "1M8aJiDnW-DYfP3JGfoWaKS2TtqakFrAGmzyu1az4";
var pedroad_UniMetro = "1MhIuLV6ryl1C6wcIhYqyLG7JkdSCu38Vq1lGO8w5";
var bikeroad_SuperNorthBay = "1jG6XplSByvnOTrKJsu240CvPj47fi-Buo5CG733v";
var bikeroad_GrandSW = "1uVriSHt8mBMmp2-M90TrXHpWeY0KKTuiogaq3p_4";
var bikeroad_UniMetro = "1KaSmG9GnL0svhfGWIOyg_PMJvBFCKp3bbwZSc1md";

//legend colors
var PRbins = [0.2, 1, 5, 12];
var PRcolours = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];

var PEbins = [4, 20, 80, 200];
var PEcolours = ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'];

var BRbins = [0.2, 1, 4, 9];
var BRcolours =  ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];

var BEbins = [4, 15, 45, 85];
var BEcolours = ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494'];

var pedbins = [14, 52, 87, 490];
var pedcols = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];

var bikebins = [7, 36, 66, 400];
var bikecols = ['#f1eef6','#d7b5d8','#df65b0','#dd1c77','#980043'];

var PIEbins = [8, 22, 31, 43];
var PIEcolours = ['#f1eef6','#bdc9e1','#74a9cf','#2b8cbe','#045a8d'];

var BIEbins = [11, 16, 35, 55];
var BIEcolours = ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'];

var NMRbins = [0.3, 2, 7, 16];
var NMRcolours = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

var NMEbins = [5, 30, 115, 265];
var NMEcolours = ['#feedde','#fdbe85','#fd8d3c','#e6550d','#a63603'];


//county grouping
var Superior = [3,13,33,41,43,53,61,71,83,95,97,103,109,131,153,-1],
    NorthBay = [1,7,9,19,29,31,39,47,55,69,79,89,101,113,119,129,135,137,141,143,165,
        11,17,35,49,51,57,63,73,87,111,145,147,151,155,157,-2,-4],
    GMUS = [5,15,67,81,85,105,107,117,121,123,127,133,139,
        99,125,163,
        37,45,59,65,75,91,93,115,161,
        21,23,25,27,77,149,159,-3,-5,-6,-7],
    SuperNorthBay = [3,13,33,41,43,53,61,71,83,95,97,103,109,131,153,
        1,7,9,19,29,31,39,47,55,69,79,89,101,113,119,129,135,137,141,143,165,
        11,17,35,49,51,57,63,73,87,111,145,147,151,155,157,-1,-2,-4],
    GrandSW = [5,15,67,81,85,105,107,117,121,123,127,133,139,
        21,23,25,27,77,149,159,-3,-5],
    UniMetro = [37,45,59,65,75,91,93,115,161,
        99,125,163,-6,-7];



//hide/show side menu
$(".menu-link").click(function(){
    $("#menu").toggleClass("active");
    $(".container").toggleClass("active");
});

//dropdown components
var dropy = {
    $dropys: null,
    openClass: 'open',
    selectClass: 'selected',
    init: function(){
        var self = this;

        self.$dropys = $('.dropy');
        self.eventHandler();
    },
    eventHandler: function(){
        var self = this;

        // Opening a dropy
        self.$dropys.find('.dropy__title').click(function(){
            self.$dropys.removeClass(self.openClass);
            $(this).parents('.dropy').addClass(self.openClass);
        });

        // Click on a dropy list
        self.$dropys.find('.dropy__content ul li a').click(function(){
            var $that = $(this);
            var $dropy = $that.parents('.dropy');
            var $input = $dropy.find('input');
            var $title = $(this).parents('.dropy').find('.dropy__title span');

            // Remove selected class
            $dropy.find('.dropy__content a').each(function(){
                $(this).removeClass(self.selectClass);
            });

            // Update selected value
            $title.html($that.html());
            $input.val($that.attr('data-value')).trigger('change')
            if (inArray($input.val(), ["2","3","4","5","6","7"])){
                if ($input.val()==6){
                    $('#variable').html("PIE");
                } else if ($input.val()==7){
                    $('#variable').html("BIE");
                } else {
                    $('#variable').html($that.html());
                }
            }

            function inArray(target, array)
            {
                for(var i = 0; i < array.length; i++)
                {
                    if(array[i] === target)
                    {
                        return true;
                    }
                }
                return false;
            }


            // If back to default, remove selected class else addclass on right element
            if($that.hasClass('dropy__header')){
                $title.removeClass(self.selectClass);
                $title.html($title.attr('data-title'));
            }
            else{
                $title.addClass(self.selectClass);
                $that.addClass(self.selectClass);
            }

            // Close dropdown
            $dropy.removeClass(self.openClass);
        });

        // Close all dropdown onclick on another element
        $(document).bind('click', function(e){
            if (! $(e.target).parents().hasClass('dropy')){ self.$dropys.removeClass(self.openClass); }
        });
    }
};

//generate radio slider
$('#radios').radiosToSlider();


//initial filter state
var countySelector = $('#county');
var spazChecker = $('label[for="spaz"]');
var spazSelector = $('.spaz-selector');
var rankingSelector = $('#radios');
var roadChecker = $('label[for="road"]');
var roadSelector = $('.road.selector');
var crashChecker = $('label[for="crash"]');
var crashSelector = $('.crash.selector');
var locationChecker = $('label[for="location"]');
var locationSelector = $('.location.selector');
var layerSelector = $('.layer-selector');
var spazToggle = $('#spaz');
var roadToggle = $('#road');
var crashToggle = $('#crash');
var locationToggle = $('#location');
var spazFilters = $('.riskex.spaz');
var roadFilters = $('.riskex.road');
var crashFilters = $('.riskex.crash');
var locationFilters = $('.riskex.location');

var selectedCounty = "Washtenaw";
countySelector.val(selectedCounty);

spazToggle.prop("checked",false);
spazFilters.show();

roadToggle.prop("checked",true);
roadFilters.hide();

crashToggle.prop("checked",true);
crashFilters.hide();

locationToggle.prop("checked",true);
locationFilters.hide();


var hideSpaz = spazToggle.prop("checked");
var hideRoad = roadToggle.prop("checked");
var hideCrash = crashToggle.prop("checked");
var hideLocation = locationToggle.prop("checked");

spazChecker.on("click",function () {
    hideSpaz = !hideSpaz;
    spazFilters.slideToggle("fast");
});

roadChecker.on("click",function () {
    hideRoad = !hideRoad;
    roadFilters.slideToggle("fast");
});

crashChecker.on("click",function () {
    hideCrash = !hideCrash;
    crashFilters.slideToggle("fast");
});


locationChecker.on("click",function () {
    hideLocation = !hideLocation;
    locationFilters.slideToggle("fast");
});

var initialPAZ = spazSelector.filter("[data-value='" + styleid + "']");
initialPAZ.addClass("selected");
$('.dropy__title.spaz span').html(initialPAZ.html());
$('#variable').html(initialPAZ.html());
$('input#paz').val(styleid);

$('#rb5').prop("checked",true);
rankingSelector.attr('data-value',99999);
var ranking = rankingSelector.attr("data-value");
fillRank();

//make sure at least one checkbox is checked
crashSelector.prop("checked",true);

crashSelector.each(function() {
    $(this).data("originallyChecked", $(this).is(":checked"));
});

crashSelector.click(function () {
    var stateChange = !($(this).data("originallyChecked") === $(this).is(":checked"));
    var removedCB;
    if(stateChange){
        removedCB=$(this);
    }

    var checked = $('.crash.selector:checked').length>0;
    if (!checked){
        alert("Please select at least one crash type.");
        removedCB.prop("checked",true)
    }
});

//make sure at least one checkbox is checked
locationSelector.prop("checked",true);

locationSelector.each(function() {
    $(this).data("originallyChecked", $(this).is(":checked"));
});

locationSelector.click(function () {
    var stateChange = !($(this).data("originallyChecked") === $(this).is(":checked"));
    var removedCB;
    if(stateChange){
        removedCB=$(this);
    }

    var checked = $('.location.selector:checked').length>0;
    if (!checked){
        alert("Please select at least one point of interest.");
        removedCB.prop("checked",true)
    }
});


function initAutocomplete(mapCenter){
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
        "Superior - MDOT region",
        "North - MDOT region",
        "Grand - MDOT region",
        "Bay - MDOT region",
        "Southwest - MDOT region",
        "University - MDOT region",
        "Metro - MDOT region",
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
        "St. Clair",
        "St. Joseph",
        "Sanilac",
        "Schoolcraft",
        "Shiawassee",
        "Tuscola",
        "Van Buren",
        "Washtenaw",
        "Wayne",
        "Wexford",
    ];


    for (var i=0;i<countyNames.length;i++){
        if (i<7){
            county_id[countyNames[i]]=-(i+1);
        } else {
            county_id[countyNames[i]] = 2 * (i - 7) + 1;
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
            if (~selectedCounty.indexOf("MDOT")){
                map.setZoom(10);
                var region = selectedCounty.replace(" - MDOT region","");
                center = mapCenter[region];
            } else {
                map.setZoom(11);
                center = mapCenter[selectedCounty];
            }
            mapCenterCoords = new google.maps.LatLng(center[1], center[0]);
            map.panTo(mapCenterCoords);
            return false;
        },

        animation: "flipInX"
    });

    countySelector.keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
        }
    });

    countySelector.on('focus', function() {
        this.value = '';
    });

    $('.ui-autocomplete').appendTo($('.nav'));
}

function initMap(center) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center:center,
        mapTypeId: 'roadmap',
    });
    // add fusion table layer
    crashlayer = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: crashes},
        options: {styleId: 2,
            templateId: 2},

    });
    pedbikelayerGMUS = new google.maps.FusionTablesLayer({
        map: map,
        query: {select: 'geometry',
            from: pedbike_GMUS,
            where: "PRrank > 0 and fips = 161"},
        options: {styleId: 2,
            templateId: 2},
    });
    pedbikelayerNorthBay = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedbike_NorthBay},
        options: {styleId: 2,
            templateId: 2},
    });
    pedbikelayerSuperior = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedbike_Superior},
        options: {styleId: 2,
            templateId: 2},
    });
    roadlayerUniMetro = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedroad_UniMetro},
        options: {styleId: 2,
            templateId: 2},
    });
    roadlayerGrandSW = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedroad_GrandSW},
        options: {styleId: 2,
            templateId: 2},
    });
    roadlayerSuperNorthBay = new google.maps.FusionTablesLayer({
        query: {select: 'geometry',
            from: pedroad_SuperNorthBay},
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

    locationSelector.each(function (i,obj) {
        google.maps.event.addDomListener(obj, 'click', updateMap);
    });

    layerSelector.each(function (i,obj) {
        google.maps.event.addDomListener(obj, 'click', updateMap);
    });

    google.maps.event.addDomListener(spazChecker[0], 'click',updateMap);
    google.maps.event.addDomListener(roadChecker[0], 'click',updateMap);
    google.maps.event.addDomListener(crashChecker[0], 'click', updateMap);
    google.maps.event.addDomListener(locationChecker[0], 'click', updateMap);

}

function updateMap() {
    var countyfips = county_id[selectedCounty];
    var countyFilter;
    if (~selectedCounty.indexOf("MDOT")) {
        countyFilter = "Rid = " + countyfips * (-1);
    } else {
        countyFilter = "fips = " + countyfips;
    }

    if (hideSpaz) {
        pedbikelayerSuperior.setMap(null);
        pedbikelayerNorthBay.setMap(null);
        pedbikelayerGMUS.setMap(null);
        styleid = 0;
    } else {
        if (~GMUS.indexOf(countyfips)) {
            pedbikelayerGMUS.setMap(map);
            pedbikelayerNorthBay.setMap(null);
            pedbikelayerSuperior.setMap(null);
        } else if (~NorthBay.indexOf(countyfips)) {
            pedbikelayerNorthBay.setMap(map);
            pedbikelayerGMUS.setMap(null);
            pedbikelayerSuperior.setMap(null);
        } else if (~Superior.indexOf(countyfips)) {
            pedbikelayerSuperior.setMap(map);
            pedbikelayerGMUS.setMap(null);
            pedbikelayerNorthBay.setMap(null);
        }
        styleid = $('input#paz').val();
    }

    if (hideRoad) {
        roadlayerUniMetro.setMap(null);
        roadlayerGrandSW.setMap(null);
        roadlayerSuperNorthBay.setMap(null);
        roadid = 0;
    } else {
        roadid = $('.road.selector:checked').val();
        if (~UniMetro.indexOf(countyfips)) {
            roadlayerUniMetro.setMap(map);
            roadlayerGrandSW.setMap(null);
            roadlayerSuperNorthBay.setMap(null);
        } else if (~GrandSW.indexOf(countyfips)) {
            roadlayerGrandSW.setMap(map);
            roadlayerUniMetro.setMap(null);
            roadlayerSuperNorthBay.setMap(null);
        } else if (~SuperNorthBay.indexOf(countyfips)) {
            roadlayerSuperNorthBay.setMap(map);
            roadlayerUniMetro.setMap(null);
            roadlayerGrandSW.setMap(null);
        }
    }

    if (hideCrash && hideLocation) {
        crashlayer.setMap(null);
    } else {
        crashlayer.setMap(map);
    }

    ranking = rankingSelector.attr("data-value");
    fillRank();

    var rankcol = (styleid == 2) ? "PRrank" :
        (styleid == 3) ? "BRrank" :
            (styleid == 4) ? "PErank" :
                (styleid == 5) ? "BErank" :
                    (styleid == 6) ? "PIErank" :
                        (styleid == 7) ? "BIErank" :
                            (styleid == 8) ? "NMRrank" : "NMErank";

    var county_ranking_filter = countyFilter + " AND " + rankcol + " >0 AND " + rankcol + " <= " + ranking;

    var poiType = [];
    if (!hideCrash) {
        crashSelector.each(function () {
            if (this.checked) {
                poiType.push("'" + this.value + "'")
            }
        });
    }
    if (!hideLocation) {
        locationSelector.each(function () {
            if (this.checked) {
                poiType.push("'" + this.value + "'")
            }
        });
    }

    var poiFilter = " AND type IN (" + poiType.join(",") + ")";

    drawPointLegend(poiType);

    pedbikelayerGMUS.setOptions({
        query: {
            select: 'geometry',
            from: pedbike_GMUS,
            where: county_ranking_filter
        },
        styleId: styleid,
        templateId: 2,
    });
    pedbikelayerNorthBay.setOptions({
        query: {
            select: 'geometry',
            from: pedbike_NorthBay,
            where: county_ranking_filter
        },
        styleId: styleid,
        templateId: 2,
    });
    pedbikelayerSuperior.setOptions({
        query: {
            select: 'geometry',
            from: pedbike_Superior,
            where: county_ranking_filter
        },
        styleId: styleid,
        templateId: 2
    });
    roadlayerUniMetro.setOptions({
        query: {
            select: 'geometry',
            from: (roadid == 1) ? pedroad_UniMetro : bikeroad_UniMetro,
            where: countyFilter
        },
    });
    roadlayerGrandSW.setOptions({
        query: {
            select: 'geometry',
            from: (roadid == 1) ? pedroad_GrandSW : bikeroad_GrandSW,
            where: countyFilter
        },
    });
    roadlayerSuperNorthBay.setOptions({
        query: {
            select: 'geometry',
            from: (roadid == 1) ? pedroad_SuperNorthBay : bikeroad_SuperNorthBay,
            where: countyFilter
        },
    });

    crashlayer.setOptions({
        query: {
            select: 'geometry',
            from: crashes,
            where: countyFilter + poiFilter
        }
    });

    drawLegend(styleid, roadid);

//    generate query
    selectedLayer = $('input#layer').val();
    if (selectedLayer == "paz") {
        if (~NorthBay.indexOf(countyfips)) {
            tableid = pedbike_NorthBay;
        } else if (~GMUS.indexOf(countyfips)) {
            tableid = pedbike_GMUS;
        } else {
            tableid = pedbike_Superior
        }
        query = "SELECT * FROM " + tableid + " WHERE " + county_ranking_filter + " ORDER BY " + rankcol;
    } else if (selectedLayer == "road") {
        if (roadid == 1) {
            if (~SuperNorthBay.indexOf(countyfips)) {
                tableid = pedroad_SuperNorthBay;
            } else if (~GrandSW.indexOf(countyfips)) {
                tableid = pedroad_GrandSW;
            } else {
                tableid = pedroad_UniMetro;
            }
        } else if (roadid == 2) {
            if (~SuperNorthBay.indexOf(countyfips)) {
                tableid = bikeroad_SuperNorthBay;
            } else if (~GrandSW.indexOf(countyfips)) {
                tableid = bikeroad_GrandSW;
            } else {
                tableid = bikeroad_UniMetro;
            }
        } else if (roadid == 0) {
            tableid = "";
        }
        query = "SELECT * FROM " + tableid + " WHERE " + countyFilter;
    } else if (selectedLayer == "point") {
        tableid = crashes;
        query = "SELECT * FROM " + tableid + " WHERE " + countyFilter + poiFilter;
    }
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
    } else if (styleid==6){
        var colorScale = d3.scaleThreshold().domain(PIEbins).range(PIEcolours);
        var title = "PIE";
    }  else if (styleid==7){
        var colorScale = d3.scaleThreshold().domain(BIEbins).range(BIEcolours);
        var title = "BIE";
    } else if (styleid==8){
        var colorScale = d3.scaleThreshold().domain(NMRbins).range(NMRcolours);
        var title = "Non-Motorized Risk";
    } else if (styleid==9){
        var colorScale = d3.scaleThreshold().domain(NMEbins).range(NMEcolours);
        var title = "Non-Motorized Exposure";
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
    legendsvg.select('.legendCells').attr('transform','translate(0, 10)');
    var titleW = $('#spazLegend text.legendTitle')[0].getBBox().width;
    var cellW = $('#spazLegend g.legendCells')[0].getBBox().width;
    if (titleW>cellW){
        var legendW = titleW;
    } else {
        var legendW = cellW;
    }
    $('#spazLegend').width(legendW+8);

}

function drawPointLegend(poi){
    if (poi.length==0){
        crashLegend.hide();
    } else {
        var legendData=[["Pedestrian Crash","img/pedestrian.png"],["Bike Crash","img/bike.png"],
            ["School","img/schools.png"],["Bar","img/bars.png"]];
        crashLegend.show();
        d3.select("#crashLegend").select("svg").remove();
        var legendsvg = d3.select("#crashLegend").append("svg");
        var legend = legendsvg.append("g")
            .attr("class","dynamicLegend")
            .attr("transform", "translate(5,15)");


        var legendTitle = legend.append("text").attr("class","legendTitLe").text("Locations");

        var legendCells = legend.append("g").attr("class","legendCells");

        var cellH = 108;
        var cellPadding = 5;
        var paddingTop = 8;
        var cellNum = legendData.length;
        var iconH = (cellH+cellPadding)/cellNum-cellPadding;


        var legendRect = legendCells.selectAll("g")
            .data(legendData)
            .enter()
            .append("g")
            .attr("transform", function(d,i){
                if (d[0]==="Bar"){
                    return "translate(0,"+ (paddingTop +i * (cellPadding+iconH)) + ')';
                } else {
                    return "translate("+ (-iconH/8) + "," + (paddingTop +i * (cellPadding+iconH)) + ')';
                }

            });

        legendRect.append('svg:image')
            .attr("xlink:href",  function(d) {return  d[1]})
            .attr("height",function (d) {
                return iconH;
            })
            .attr("width",function (d) {
                if (d[0]==="Bar"){
                    return iconH*2/3;
                } else {
                    return iconH;
                }
            });

        legendRect.append("text")
            .attr("x",function (d) {
                if (d[0]=="Bar"){
                    return iconH-3;
                }
                return iconH;

            })
            .attr("y",iconH/2+cellPadding)
            .text(function (d) {
                return d[0];
            });

        var titleW = legendTitle.node().getBBox().width;
        var cellW = legendCells.node().getBBox().width;
        if (titleW>cellW){
            var legendW = titleW;
        } else {
            var legendW = cellW;
        }

        crashLegend.width(legendW+5);
        if (!hideSpaz || !hideRoad) {
            $('#crashLegend').css('border-left', 'solid 1px black');
        } else {
            $('#crashLegend').css('border-left', 'none');
        }

    }
}

function drawroadLegend(roadid){
    if (roadid==1){
        var colorScale = d3.scaleThreshold().domain(pedbins).range(pedcols);
        var title = "Pedestrian Exposure";
    } else if (roadid==2){
        var colorScale = d3.scaleThreshold().domain(bikebins).range(bikecols);
        var title = "Bike Exposure";
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
    legendsvg.select('.legendCells').attr('transform','translate(0, 18)');
    var titleW = $('#roadLegend text.legendTitle')[0].getBBox().width;
    var cellW = $('#roadLegend g.legendCells')[0].getBBox().width;
    if (titleW>cellW){
        var legendW = titleW;
    } else {
        var legendW = cellW;
    }
    $('#roadLegend').width(legendW+8);
    if (!hideSpaz) {
        $('#roadLegend').css('border-left', 'solid 1px black');
    } else {
        $('#roadLegend').css('border-left', 'none');
    }
}

function generateSpazLabels(legendOpts){
    if (styleid==2){
        var min = 0.1;
        var max = 50;
    } else if (styleid==3){
        var min = 0.1;
        var max = 50;
    } else if (styleid==4){
        var min = 1;
        var max = 2400;
    } else if (styleid==5){
        var min = 1;
        var max = 1100;
    } else if (styleid==6){
        var min = 0;
        var max = 75;
    } else if (styleid==7){
        var min = 0;
        var max = 99;
    } else if (styleid==8){
        var min = 0.1;
        var max = 70;
    } else if (styleid==9){
        var min = 1;
        var max = 3500;
    }
    if (legendOpts.i === 0 ) {
        return legendOpts.generatedLabels[legendOpts.i]
            .replace('NaN to', min + ' to');
    } else if (legendOpts.i === legendOpts.genLength - 1) {
        return legendOpts.generatedLabels[legendOpts.i]
            .replace(' to NaN', ' to '+ max);
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

function fillRank() {
    if (ranking == 99999){
        $('#variable_rank').html("all");
    } else if (ranking==100){
        $('#variable_rank').html("top 100");
    } else if (ranking==25){
        $('#variable_rank').html("top 25");
    } else {
        $('#variable_rank').html("top 10");
    }
}

function getData() {
    if (selectedLayer=="paz"){
        if(hideSpaz){
            alert("Please turn on the PAZ layer to export data.")
        }
    } else if (selectedLayer=="road"){
        if(hideRoad){
            alert("Please turn on the road layer to export data.")
        }
    } else if (selectedLayer=="point") {
        if (hideCrash && hideLocation) {
            alert("Please turn on at least one point layer to export data.")
        }
    } else {
        alert("Please select a layer.")
    }
    $.ajax({
        type:"GET",
        url:"https://www.googleapis.com/fusiontables/v2/query?sql="+query+"&alt=csv&&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ",
        success:function (data) {
            var location;
            if (~selectedCounty.indexOf("MDOT")){
                location = selectedCounty.replace(" - MDOT region","");
            } else {
                location = selectedCounty;
            }
            var filename = location+"_"+selectedLayer+".csv";
            var blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        },
        statusCode:{
            503:function (xhr) {
                alert("File size is too big to download. Please access fusion table directly at https://fusiontables.google.com/DataSource?docid="+tableid);
            },
            400:function (xhr) {
                console.log("invalid query");
            },
            501:function (xhr) {
                console.log("empty query");
            }
        }
    });
}

function ready(error,counties,mdot) {
    if(error) { console.log(error); }
    var mapCenter = {};
    var countyFeatures = counties.features;
    var MDOTFeatures = mdot.features;
    countyFeatures.forEach(function (county) {
        mapCenter[county.properties.NAME] = d3.geoCentroid(county);
    });
    MDOTFeatures.forEach(function (region) {
        mapCenter[region.properties.REG_NAME] = d3.geoCentroid(region);
    });
    var center = mapCenter[selectedCounty];
    var mapCenterCoords = new google.maps.LatLng(center[1], center[0]);

    show_intro();
    dropy.init();
    initMap(mapCenterCoords);
    initAutocomplete(mapCenter);
    $("#download").on("click",getData)

}

d3.queue()
    .defer(d3.json,"data/counties.json")
    .defer(d3.json,"data/MDOT_Regions_simplified.json")
    .await(ready);

