"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../data"));
const queryResolvers = {
    Query: {
        hello() {
            return "Hola a todo el mundo";
        },
        helloWithName(_, args, __, info) {
            console.log(info);
            return `Hola ${args.name}`;
        },
        peopleNumber() {
            return 1;
        },
        students() {
            return {
                status: true,
                message: 'Lista correctamente cargada',
                list: data_1.default.students
            };
        },
        student(_, args) {
            const student = data_1.default.students.filter((value) => value.id === args.id)[0];
            return {
                status: student === undefined ? false : true,
                message: student === undefined ?
                    `Estudiante ${args.id} no se ha encontrado` :
                    `Estudiante ${args.id} se ha encontrado`,
                item: student === undefined ? null : student,
            };
        },
        courses() {
            return {
                status: true,
                message: 'Lista correctamente cargada',
                list: data_1.default.courses
            };
        },
        course(_, args) {
            const course = data_1.default.courses.filter((value) => value.id === args.id)[0];
            return {
                status: course === undefined ? false : true,
                message: course === undefined ?
                    `Curso ${args.id} no se ha encontrado` :
                    `Curso ${args.id} se ha encontrado`,
                item: course === undefined ? null : course,
            };
        },
    },
};
exports.default = queryResolvers;
