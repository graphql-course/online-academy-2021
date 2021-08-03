"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_json_1 = __importDefault(require("./courses.json"));
const students_json_1 = __importDefault(require("./students.json"));
const data = {
    courses: courses_json_1.default,
    students: students_json_1.default
};
exports.default = data;
