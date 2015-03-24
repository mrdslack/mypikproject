var bulklistApp = angular.module('bulklistApp', []);

bulklistApp.controller('bulkListCtrl', function($scope, $http){
    $scope.bulks = [];
    var getBulksLink = 'http://db-estate.services.dev.vendelevas.dev3.pikweb.net/api/objects/?method=getBulkList&block_id=eabaeb9-9df2-2e6c-8476-c0ededf8503a&site=pikru&private_key=uXd3YY4!lptkarvQG8roywJW&format=json&domain=localhost%3A63342';

    // запрос списка
    $http.get(getBulksLink).success(function(data) {
        $scope.bulks = data;

    //объект с ценами

        $scope.minimums = {
            minPriceFlats: null,
            minPriceFlats1: null,
            minPriceFlats2: null,
            minPriceFlats3: null,
            minPriceFlats4: null,
            minPriceFlatsSP: null,
            minPriceCommercial: null,
            minPriceCars: null
        };


        for (i = 0; i < $scope.bulks.length; i++) {

            //Заглушка, пока у венделева сломались картинки
            $scope.bulks[i].preview = 'http://2.db-estate.cdn.pik-service.ru/attachment_pikru/0/972FC13E-DC93-E311-8208-001EC9D56418/kope_parus_006_800x600_15aae06b60d7d6da6ac1c2c7940_be3fe44d6f5179f3caba5cee47b4fe57_0x200.jpg';

            //Выборка минимальных цен в новый объект

            if($scope.bulks[i].type == 100000000 && ($scope.bulks[i].minprice != 0 && (!$scope.minimums.minPriceFlats
                || $scope.minimums.minPriceFlats > $scope.bulks[i].minprice))) {
                $scope.minimums.minPriceFlats = $scope.bulks[i].minprice;
            }
            if($scope.bulks[i].minprice_1 && (!$scope.minimums.minPriceFlats1
                || $scope.minimums.minPriceFlats1 > $scope.bulks[i].minprice_1)) {
                $scope.minimums.minPriceFlats1 = $scope.bulks[i].minprice_1;
            }
            if($scope.bulks[i].minprice_2 && (!$scope.minimums.minPriceFlats2
                || $scope.minimums.minPriceFlats2 > $scope.bulks[i].minprice_2)) {
                $scope.minimums.minPriceFlats2 = $scope.bulks[i].minprice_2;
            }
            if($scope.bulks[i].minprice_3 && (!$scope.minimums.minPriceFlats3
                || $scope.minimums.minPriceFlats3 > $scope.bulks[i].minprice_3)) {
                $scope.minimums.minPriceFlats3 = $scope.bulks[i].minprice_3;
            }
            if($scope.bulks[i].minprice_4 && (!$scope.minimums.minPriceFlats4
                || $scope.minimums.minPriceFlats4 > $scope.bulks[i].minprice_4)) {
                $scope.minimums.minPriceFlats4 = $scope.bulks[i].minprice_4;
            }
            if($scope.bulks[i].type == 100000003 && ($scope.bulks[i].minprice != 0 && (!$scope.minimums.minPriceCommercial
                || $scope.minimums.minPriceCommercial > $scope.bulks[i].minprice))) {
                $scope.minimums.minPriceCommercial = $scope.bulks[i].minprice;
            }
            if($scope.bulks[i].type == 100000004 && ($scope.bulks[i].minprice != 0 && (!$scope.minimums.minPriceCars
                || $scope.minimums.minPriceCars > $scope.bulks[i].minprice))) {
                $scope.minimums.minPriceCars = $scope.bulks[i].minprice;
            }

            //быдлорешение вывода иконок. Позже создать директиву для этого


            if (!$scope.bulks[i].interior) {
                $scope.bulks[i].interiorIco = 'http://www.pik.ru/images/realty/icons/decore_off.png';
                $scope.bulks[i].interiorTxt = 'Нет отделки';
            } else {
                $scope.bulks[i].interiorIco = 'http://www.pik.ru/images/realty/icons/decore_on.png';
                $scope.bulks[i].interiorTxt = 'Есть отделка';
            }

            if (!$scope.bulks[i].ipoteka) {
                $scope.bulks[i].ipotekaIco = 'http://www.pik.ru/images/realty/icons/hypotec_off.png';
                $scope.bulks[i].ipotekaTxt = 'Нет ипотеки';

            } else {
                $scope.bulks[i].ipotekaIco = 'http://www.pik.ru/images/realty/icons/hypotec_on.png';
                $scope.bulks[i].ipotekaTxt = 'Есть ипотека';
            }

            if (!$scope.bulks[i].discount) {
                $scope.bulks[i].discountIco = 'http://www.pik.ru/images/realty/icons/action_off.png';
                $scope.bulks[i].discountTxt = 'Нет акции';
            } else {
                $scope.bulks[i].discountIco = 'http://www.pik.ru/images/realty/icons/action_on.png';
                $scope.bulks[i].discountTxt = 'Есть акция';
            }

            if (!$scope.bulks[i].payment) {
                $scope.bulks[i].paymentIco = 'http://www.pik.ru/images/realty/icons/clock_off.png';
                $scope.bulks[i].paymentTxt = 'Нет рассрочки';
            } else {
                $scope.bulks[i].paymentIco = 'http://www.pik.ru/images/realty/icons/clock_on.png';
                $scope.bulks[i].paymentTxt = 'Есть рассрочка';
            }

            if ($scope.bulks[i].building_status == 100000000) {
                $scope.bulks[i].building_statusIco = 'http://yaroslavl.pik.ru/images/realty/icons/plan.png';
                $scope.bulks[i].building_statusTxt = 'Не идет строительство';

            } else if ($scope.bulks[i].building_status == 100000001) {
                $scope.bulks[i].building_statusIco = 'http://yaroslavl.pik.ru/images/realty/icons/underConstruction.png';
                $scope.bulks[i].building_statusTxt = 'Идет строительство';

            } else if ($scope.bulks[i].building_status == 100000002) {
                $scope.bulks[i].building_statusIco = 'http://yaroslavl.pik.ru/images/realty/icons/occupy.png';
                $scope.bulks[i].building_statusTxt = 'Заселение';

            } else {
                $scope.bulks[i].building_statusIco = 'http://www.pik.ru/images/realty/icons/built.png';
                $scope.bulks[i].building_statusTxt = 'Дом построен';
            }

            if (!$scope.bulks[i].parking) {
                $scope.bulks[i].ParkingIco = 'http://www.pik.ru/images/realty/icons/cars_off.png';
                $scope.bulks[i].ParkingTxt = 'Нет машиномест';
            } else {
                $scope.bulks[i].ParkingIco = 'http://www.pik.ru/images/realty/icons/cars_on.png';
                $scope.bulks[i].ParkingTxt = 'Есть машиноместа';
            }

        }

    });

    // показывать цену больше чем
    $scope.flatsWithPrice = function(prop, val){
        return function(item){
            return item[prop] > val;
        }
    };
    //фильтрация на тип недвиги
    $scope.realtyTypeFilter = {};
    $scope.setType = function(type) {
    	$scope.realtyTypeFilter.type = type
    };
    //проверка на активный фильтр
    $scope.isActive = function(type){
        return $scope.realtyTypeFilter.type == type;
    };



});
