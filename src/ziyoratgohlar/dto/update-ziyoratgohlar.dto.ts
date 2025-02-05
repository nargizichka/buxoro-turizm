import { PartialType } from '@nestjs/mapped-types';
import { CreateZiyoratgohDto } from './create-ziyoratgohlar.dto';

export class UpdateZiyoratgohlarDto extends PartialType(CreateZiyoratgohDto) {}
