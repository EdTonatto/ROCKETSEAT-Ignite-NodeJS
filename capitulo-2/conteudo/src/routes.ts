import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';

export function createCourse(request: Request, response: Response){
    CreateCourseService.execute({
        duration: 10,
        name: "NodeJS", 
        educator: "Educator Name"
    });

    CreateCourseService.execute({
        name: "NodeJS - Turma 2", 
        educator: "Educator Name"
    });

    return response.send();
}