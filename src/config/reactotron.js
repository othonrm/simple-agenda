import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
// import sagaPlugin from 'reactotron-redux-saga';

if (process.env.NODE_ENV) {
    const tron = Reactotron.configure()
        .use(reactotronRedux())
        // .use(sagaPlugin())
        .connect();

    tron.clear();

    console.tron = tron;

    const log = console.log;

    console.log = args => { log(args); tron.log(args) };
}
