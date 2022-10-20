import { Application } from 'express';

// import CORS from './CORS';
// import Http from './Http';
// import Views from './Views';
// import Statics from './Statics';
// import CsrfToken from './CsrfToken';
// import StatusMonitor from './StatusMonitor';

import Env from '../loaders/Env';
import Cors from './Cors';
import Http from './Http';

class Kernel {
  public static init(_express: Application): Application {
    // Check if CORS is enabled
    if (Env.config().isCORSEnabled) {
      // Mount CORS middleware
      _express = Cors.mount(_express);
    }

    // Mount basic express apis middleware
    _express = Http.mount(_express);

    // Mount view engine middleware
    // _express = Views.mount(_express);

    // Mount csrf token verification middleware
    // _express = CsrfToken.mount(_express);

    // Mount statics middleware
    // _express = Statics.mount(_express);

    // Mount status monitor middleware
    // _express = StatusMonitor.mount(_express);

    return _express;
  }
}

export default Kernel;
