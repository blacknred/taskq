import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateSagaDto } from './create-saga.dto';

export class UpdateSagaDto extends PartialType(
  OmitType(CreateSagaDto, ['workspaceId']),
) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;
}
