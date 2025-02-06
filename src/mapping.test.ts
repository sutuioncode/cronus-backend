import { createMap, createMapper } from "@automapper/core"
import { CreateTaskDto } from "./task/dto/create-task.dto"
import { Task } from "./task/entities/task.entity"
import { classes } from "@automapper/classes";

export const mapper = createMapper({
    strategyInitializer: classes(),
});

describe("Automapper", () => {
    it("should Map task and CreateTaskDto", () => {
        createMap(mapper, Task, CreateTaskDto)
        const task = new Task()
        task.title = "Task Title"
        task.id = 5,
        task.tags = ['tk', 'tz']

        const dto = mapper.map(task, Task, CreateTaskDto)

        expect(dto).toMatchObject(task)
    })
})