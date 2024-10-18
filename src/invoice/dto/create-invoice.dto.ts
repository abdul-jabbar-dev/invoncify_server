import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";

// Prepayment DTO
class PrePaymentDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}

// Products DTO
class ProductsDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
}

// Client DTO
class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class CreateInvoiceDto {
  @IsNotEmptyObject()
  @IsNotEmpty()
  @ValidateIf((obj) => typeof obj.client === "object")
  @Type(() => CreateClientDto)
  @ValidateNested()
  @IsObject()
  client: CreateClientDto;

  @IsOptional()
  @ValidateIf((obj) => typeof obj.client === "string")
  @IsString()
  @IsNotEmpty()
  clientStng?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductsDto)
  readonly products: ProductsDto[];

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PrePaymentDto)
  readonly prepayments: PrePaymentDto[] | null;
}
