import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBlockDto {
    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}
