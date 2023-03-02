import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsBoolean } from "class-validator";
import "./";

export class TodoDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;
}
