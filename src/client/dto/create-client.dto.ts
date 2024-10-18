import { IsEmail, IsEnum, IsString } from "class-validator";
import { Client, RClient } from "src/types/user";

export class CreateClientDataDto implements Omit<Client, "parentId"> {
  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(["client"])
  role: "client";
}

export class CreateClientDto implements RClient {

  @IsString()
  id: string;

  @IsString()
  parentId: string;

  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(["client"])
  role: "client";
}
