import { Mapper, MappingProfile, createMap, forMember , mapFrom} from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto, CreateTaskResponseDto } from "../dto/create-task.dto";
import { Task } from "../entities/task.entity";

@Injectable()
export class GetTaskMappingProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Task, CreateTaskResponseDto, forMember(dest => dest.description, mapFrom((src) => src.description.content)));
        };
    }


}