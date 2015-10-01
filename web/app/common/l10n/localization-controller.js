(function () {

    angular.module('carwash.common').controller('carwash.common.l10n.localizationController', function ($translate, $scope, $translatePartialLoader) {

        $scope.changeLangauge = function (cultureSpecificLanguage) {
            //$translate.refresh();
            /*var registeredParts = $translatePartialLoader.getRegisteredParts();
             console.log(registeredParts);
             for (var i = 0; i < registeredParts.length; ++i) {
             $translatePartialLoader.deletePart(registeredParts[i],true);
             }*/
            $translate.use(cultureSpecificLanguage);
            /* for (var i = 0; i < registeredParts.length; ++i) {
             $translatePartialLoader.addPart(registeredParts[i]);
             }*/
            $translate.refresh();
        };
    });
})();