import { IsString, IsNotEmpty, IsDate, IsBoolean } from "class-validator";
import "./";

export class Todo {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;
}
