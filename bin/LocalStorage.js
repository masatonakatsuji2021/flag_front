"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LocalStorage_instances, _LocalStorage__get, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (_a = class LocalStorage {
        constructor() {
            _LocalStorage_instances.add(this);
            this.__name = "flag";
            const app = use("app/config/app");
            if (app.localStorage) {
                if (app.localStorage.name) {
                    this.__name = app.localStorage.name;
                }
            }
        }
        read(name) {
            var buff = __classPrivateFieldGet(this, _LocalStorage_instances, "m", _LocalStorage__get).call(this);
            if (buff[name]) {
                return buff[name];
            }
            else {
                return buff;
            }
        }
        write(name, value) {
            var buff = __classPrivateFieldGet(this, _LocalStorage_instances, "m", _LocalStorage__get).call(this);
            buff[name] = value;
            localStorage.setItem(this.__name, JSON.stringify(buff));
            return this;
        }
        delete(name) {
            var buff = __classPrivateFieldGet(this, _LocalStorage_instances, "m", _LocalStorage__get).call(this);
            delete buff[name];
            localStorage.setItem(this.__name, JSON.stringify(buff));
            return this;
        }
    },
    _LocalStorage_instances = new WeakSet(),
    _LocalStorage__get = function _LocalStorage__get() {
        var buff = localStorage.getItem(this.__name);
        return JSON.parse(buff);
    },
    _a);
