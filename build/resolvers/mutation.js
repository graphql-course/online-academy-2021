"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./../data"));
const mutationResolvers = {
    Mutation: {
        addCourse(_, args) {
            if (data_1.default.courses.filter((courseItem) => courseItem.title === args.course.title).length > 0) {
                return {
                    status: false,
                    message: `Ya existe el curso ${args.course.title}. Prueba con otro por favor`
                };
            }
            const idValue = +data_1.default.courses[data_1.default.courses.length - 1].id + 1;
            args.course.id = String(idValue);
            data_1.default.courses.push(args.course);
            return {
                status: true,
                message: `Curso con título ${args.course.title} añadido correctamente`,
                item: args.course
            };
        },
        updateCourse(_, args) {
            if (data_1.default.courses.filter((courseItem) => courseItem.id === args.course.id).length === 0) {
                return {
                    status: false,
                    message: `NO existe el curso ${args.course.title}. Prueba con otro por favor para actualizar.`
                };
            }
            for (let i = 0; i < data_1.default.courses.length; i++) {
                if (data_1.default.courses[i].id === args.course.id) {
                    data_1.default.courses[i] = args.course;
                    break;
                }
            }
            return {
                status: true,
                message: `Actualizado correctamente ${args.course.title}`,
                item: args.course
            };
        },
        deleteCourse(_, args) {
            let deleteItem = false;
            for (let i = 0; i < data_1.default.courses.length; i++) {
                if (data_1.default.courses[i].id === args.id) {
                    data_1.default.courses.splice(i, 1);
                    deleteItem = true;
                    break;
                }
            }
            return {
                status: deleteItem,
                message: deleteItem ? 'Eliminado' : 'No se ha eliminado nada'
            };
        }
    }
};
exports.default = mutationResolvers;
