import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";

export const automapperModule = AutomapperModule.forRoot({
    strategyInitializer: classes(),
})