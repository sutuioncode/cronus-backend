import { CreateTaskDto } from "../src/task/dto/create-task.dto";

export const testTasks: CreateTaskDto[] = [
    {
        title: "Plan weekend trip",
        description: "Research destinations, book accommodations, and create an itinerary.",
        tags: ["travel", "planning", "weekend"]
    },
    {
        title: "Organize closet",
        description: "Sort clothes by season, donate unused items, and rearrange shelves.",
        tags: ["organization", "home", "cleaning"]
    },
    {
        title: "Learn TypeScript",
        description: "Complete an online course on TypeScript and build a small project.",
        tags: ["learning", "programming", "TypeScript"]
    },
    {
        title: "Cook a new recipe",
        description: "Try making a dish from a different cuisine, like Thai or Italian.",
        tags: ["cooking", "food", "experiment"]
    },
    {
        title: "Write a blog post",
        description: "Draft and publish an article about productivity tips for remote work.",
        tags: ["writing", "blogging", "productivity"]
    },
    {
        title: "Exercise for 30 minutes",
        description: "Go for a run, do yoga, or follow a workout video.",
        tags: ["fitness", "health", "exercise"]
    },
    {
        title: "Call a friend",
        description: "Catch up with a friend you haven't spoken to in a while.",
        tags: ["social", "communication", "friendship"]
    },
    {
        title: "Read a book",
        description: "Spend an hour reading a novel or non-fiction book.",
        tags: ["reading", "learning", "relaxation"]
    },
    {
        title: "Fix the leaky faucet",
        description: "Repair or replace the faucet in the kitchen to stop the leak.",
        tags: ["home repair", "DIY", "plumbing"]
    },
    {
        title: "Create a budget",
        description: "Track expenses, set financial goals, and plan for savings.",
        tags: ["finance", "planning", "budgeting"]
    }
];