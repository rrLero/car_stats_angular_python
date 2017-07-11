angular
    .module('public')
    .config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];

function routeConfig($stateProvider) {
    // Routes
    $stateProvider
        .state('public', {
            abstract: true,
            templateUrl: 'src/app/public/public.html',
        })
        .state('public.home', {
            url: '/',
            templateUrl: 'src/app/public/home/home.html'
        })
        .state('public.carsList', {
            url: '/carsList',
            templateUrl: 'src/app/public/carInList/car-in-list.html',
            controller: 'CarsController',
            controllerAs: 'carsCtrl',
        })
        .state('public.notesList', {
            url: '/notesList',
            templateUrl: 'src/app/public/noteInList/note-in-list.html',
            controller: 'NotesController',
            controllerAs: 'notesCtrl',
        })
        .state('public.oneCarNotes', {
            url: '/carsList/{id}/notes',
            templateUrl: 'src/app/public/noteInList/one-car-note.html',
            controller: "OneCarNoteController",
            controllerAs: 'noteCtrl',
            resolve: {
                notes: ['notesListService', '$stateParams', function(notesListService, $stateParams) {
                    return notesListService.getOneCarNote($stateParams.id);
                }],
                cars: ['carsListService', '$stateParams', function(carsListService, $stateParams) {
                    return carsListService.getCarsList();
                }],
                id: ['$stateParams', function($stateParams) {
                    return $stateParams.id;
                }]
            }
        })
        .state('public.addCar', {
            url: '/addCar',
            templateUrl: 'src/app/public/carInList/addCar.html',
            controller: 'AddCarController',
            controllerAs: 'car',
        })
        .state('public.addNotes', {
            url: '/addNote',
            templateUrl: 'src/app/public/noteInList/addNote.html',
            controller: 'AddNoteController',
            controllerAs: 'note',
            resolve: {
                cars: ['carsListService', function(carsListService) {
                    return carsListService.getCarsList();
                }]
            }
        })
        .state('public.editCar', {
            url: '/editCar/{id}',
            templateUrl: 'src/app/public/carInList/editCar.html',
            controller: 'EditCarController',
            controllerAs: 'car',
            resolve: {
                cars: ['carsListService', function(carsListService) {
                    return carsListService.getCarsList();
                }],
                id: ['$stateParams', function($stateParams) {
                    return $stateParams.id;
                }]
            }
        })
        .state('public.editNotes', {
            url: '/editNotes/{id}',
            templateUrl: 'src/app/public/noteInList/editNotes.html',
            controller: 'EditNoteController',
            controllerAs: 'note',
            resolve: {
                notes: ['notesListService', function(notesListService) {
                    return notesListService.getNotesList();
                }],
                id: ['$stateParams', function($stateParams) {
                    return $stateParams.id;
                }],
                cars: ['carsListService', function(carsListService) {
                    return carsListService.getCarsList();
                }]
            }
        })
        .state('public.login', {
            url: '/login',
            templateUrl: 'src/app/admin/login/login.html',
            controller: 'LoginController',
            controllerAs: '$ctrl',
        });
}
