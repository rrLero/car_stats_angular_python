"use strict";
require('angular');
require('angular-ui-router');
require('angular-cookies');
require('angular-local-storage');

require('./src/carStats.module.js');
require('./src/common/common.module.js');
require('./src/public/public.module.js');

require('./src/public/public.routes.js');

require('./src/admin/login/login.controller.js');
require('./src/admin/login/log-out.component.js');

require('./src/common/loading/loading.component.js');
require('./src/common/loading/tokenHttpInterceptor.js');
require('./src/common/loading/loading.interceptor.js');

require('./src/public/noteInList/notes.controller.js');
require('./src/public/noteInList/oneCarNote.controller.js');
require('./src/public/noteInList/editNote.controller.js');
require('./src/public/noteInList/addnote.controller.js');

require('./src/public/carInList/cars.controller.js');
require('./src/public/carInList/EditCarController.js');
require('./src/public/carInList/addCarController.js');

require('./src/common/notesListService.js');
require('./src/common/carsListService.js');
require('./src/admin/services/login.service.js');
require('./src/admin/services/current-user.service.js');
require('./src/admin/services/authredirector.service.js');
