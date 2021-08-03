"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./../data"));
const typesResolver = {
    Data: {
        __resolveType(obj) {
            if (obj.name) {
                return 'Student';
            }
            if (obj.title) {
                return 'Course';
            }
            return null;
        },
    },
    Student: {
        courses: (root) => {
            return data_1.default.courses.filter((course) => root.courses.indexOf(course.id) > -1);
        },
    },
    Course: {
        path: (root) => `https://udemy.com/course${root.path}`,
        students: (root) => {
            return data_1.default.students.filter((student) => student.courses.indexOf(root.id) > -1);
        },
    },
};
exports.default = typesResolver;
