"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SessionStorage_instances, _SessionStorage__get, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (_a = class SessionStorage {
        constructor() {
            _SessionStorage_instances.add(this);
            this.__name = "flag";
            const app = use("app/config/app");
            if (app.sessionStorage) {
                if (app.sessionStorage.name) {
                    this.__name = app.sessionStorage.name;
                }
            }
        }
        read(name) {
            var buff = __classPrivateFieldGet(this, _SessionStorage_instances, "m", _SessionStorage__get).call(this);
            if (buff[name]) {
                return buff[name];
            }
            else {
                return buff;
            }
        }
        write(name, value) {
            var buff = __classPrivateFieldGet(this, _SessionStorage_instances, "m", _SessionStorage__get).call(this);
            buff[name] = value;
            sessionStorage.setItem(this.__name, JSON.stringify(buff));
            return this;
        }
        delete(name) {
            var buff = __classPrivateFieldGet(this, _SessionStorage_instances, "m", _SessionStorage__get).call(this);
            delete buff[name];
            sessionStorage.setItem(this.__name, JSON.stringify(buff));
            return this;
        }
    },
    _SessionStorage_instances = new WeakSet(),
    _SessionStorage__get = function _SessionStorage__get() {
        var buff = sessionStorage.getItem(this.__name);
        return JSON.parse(buff);
    },
    _a);
