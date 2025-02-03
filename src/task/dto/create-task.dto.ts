export class CreateTaskDto {
    title: string;
    description: string;
    tags: string[];
}

export class CreateTaskResponseDto {
    task: CreateTaskDto
}

