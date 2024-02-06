import { IsNotEmpty } from "class-validator";

export class RegisterDTO {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}