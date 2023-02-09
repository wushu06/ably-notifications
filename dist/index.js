Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Ably = require('ably');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var Ably__namespace = /*#__PURE__*/_interopNamespace(Ably);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var initialized = false;
var createTokenRequest = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (initialized) {
            return [2 /*return*/];
        }
        return [2 /*return*/, axios__default["default"].post(props.url, null, { headers: { 'Authorization': "Bearer ".concat(props.token) } })
                .then(function (response) {
                return response.data;
            })["catch"](function (err) {
                return err;
            })];
    });
}); };
var settingUpAbly = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Ably__namespace.Realtime({
                authCallback: function (tokenParams, callback) { return __awaiter(void 0, void 0, void 0, function () {
                    var tokenRequest, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, createTokenRequest(props)];
                            case 1:
                                tokenRequest = _a.sent();
                                callback(null, tokenRequest);
                                initialized = true;
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                callback(error_1, null);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }
            })];
    });
}); };
var connectToAbly = function (ably, user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ably.connection.once('connected')];
            case 1:
                _a.sent();
                return [2 /*return*/, ably.channels.get("private:App.User.".concat(user.id))];
        }
    });
}); };
var listenToChannel = function (channel, setMessage) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, channel.subscribe('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', function (message) {
                    setMessage(message);
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var handleRealTimeNotifications = function (props, setMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var ably, channel, message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, settingUpAbly(props)];
            case 1:
                ably = _a.sent();
                return [4 /*yield*/, connectToAbly(ably, props.user)];
            case 2:
                channel = _a.sent();
                return [4 /*yield*/, listenToChannel(channel, setMessage)];
            case 3:
                message = _a.sent();
                return [2 /*return*/, {
                        ably: ably,
                        message: message,
                        error: null
                    }];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, { ably: null, message: null, error: error_2 }];
            case 5: return [2 /*return*/];
        }
    });
}); };

var useState = React__namespace.useState, useEffect = React__namespace.useEffect;
var useRealTimeNotification = function (props) {
    var _a = useState({}), value = _a[0], setValue = _a[1];
    var _b = useState({}), message = _b[0], setMessage = _b[1];
    useEffect(function () {
        if (!props.user) {
            return;
        }
        var ably = null;
        handleRealTimeNotifications(props, setMessage)
            .then(function (data) {
            setValue(data);
            ably = data.ably;
        })["catch"](function (e) { return setValue(e); });
        return function () {
            ably && ably.close();
        };
    }, [props.user]);
    return [message, value];
};

exports.useRealTimeNotification = useRealTimeNotification;
//# sourceMappingURL=index.js.map
