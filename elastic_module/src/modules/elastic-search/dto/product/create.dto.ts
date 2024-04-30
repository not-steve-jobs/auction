import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  psql_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  creator_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sale_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  extra_data: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  one_time_sale: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
}
