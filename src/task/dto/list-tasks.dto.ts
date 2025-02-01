export class ListTasksDto {
    tasks: ListTaskItemDto[]
}

export class ListTaskItemDto {
    id: number
    title: string;
    description: string;
    tags: string[];
}
