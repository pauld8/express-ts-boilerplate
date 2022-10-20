/**
 * Bootstrap App
 */
import 'reflect-metadata';

import App from './loaders/App';
import NativeEvent from './exceptions/NativeEvent';
import { Container } from 'typedi';
import { useContainer } from 'routing-controllers';

useContainer(Container);

/**
 * Run the Database pool
 */
App.loadDatabase();

/**
 * Run the Mssql service if enabled
 */
App.loadMssql();

/**
 * Loads the Queue Monitor iff enabled
 */
// App.loadQueue();

/**
 * Run the Server on Clusters
 */
App.loadServer();

/**
 * Catches the process events
 */
NativeEvent.process();
