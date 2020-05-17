import DomElement from './servises/DomElement.js';
import WebStorage from './servises/WebStorage.js';
import Remote from './servises/Remote.js';
import Delivery from './controller/Delivery.js';

new Delivery(new Remote(), new WebStorage(), new DomElement());