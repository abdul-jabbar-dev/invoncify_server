import { IsEmail, IsOptional, IsString, } from "class-validator";
 
import { User } from "src/types/user";

export class CreateUserDto implements Omit<User, "role"> {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsString()
  photoURL?: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  role = "user" as const;
}
