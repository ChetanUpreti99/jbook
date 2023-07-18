import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middlewares/persist-middleware";

import reducers from "./reducers";

export const store = legacy_createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));

