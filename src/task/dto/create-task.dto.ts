import { AutoMap } from "@automapper/classes";

export class CreateTaskDto {
    @AutoMap()
    title: string;
    @AutoMap()
    description: string;

    @AutoMap(() => [String])
    tags: string[];
}

export class CreateTaskResponseDto extends CreateTaskDto {
    @AutoMap()
    id: string
}

