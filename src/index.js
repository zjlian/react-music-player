import React from 'react';
import {render} from 'react-dom';
import 'normalize.css';

import Root, {App} from './root.js';

document.bgColor = '#F9F9F9';
render(<Root />, document.getElementById('root'));