import '../../css/common.css';
import '../../css/style.css';
import '../../css/public.css';

require('./carStats.module');
require('./common/common.module');
require('./public/public.module');

require('./public/public.routes');

require('./admin/login/login.controller');
require('./admin/login/log-out.component');

require('./common/loading/tokenHttpInterceptor');
require('./common/loading/loading.interceptor');
require('./common/loading/loading.component');

require('./public/noteInList/notes.controller');
require('./public/noteInList/oneCarNote.controller');
require('./public/noteInList/editNote.controller');
require('./public/noteInList/addnote.controller');

require('./public/carInList/cars.controller');
require('./public/carInList/EditCarController');
require('./public/carInList/addCarController');

require('./common/notesListService');
require('./common/carsListService');
require('./admin/services/login.service');
require('./admin/services/current-user.service');
require('./admin/services/authredirector.service');
