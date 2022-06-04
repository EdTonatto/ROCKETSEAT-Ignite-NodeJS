interface Course{
    name: string;
    duration?: number;
    educator: string;
}

class CreateCourseService {
    execute({name, educator, duration = 4}: Course){
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService;