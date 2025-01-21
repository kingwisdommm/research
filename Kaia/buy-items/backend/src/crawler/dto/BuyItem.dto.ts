// src/contract/dto/buy-items.dto.ts
import { IsNotEmpty, IsArray, IsNumber, Min, IsString } from 'class-validator';

export class BuyItemsDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  itemIds: number[];

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  amounts: number[];

  @IsNotEmpty()
  @IsNumber()
  expirationTime: number;

  @IsNotEmpty()
  @IsString()
  signature: string;
}
