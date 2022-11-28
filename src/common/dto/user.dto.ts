import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

export class UserDto extends JoinRequestDto {
  @ApiProperty({ description: '아이디', required: true, example: 1 })
  id: number;

  @ApiProperty({
    description: '이메일',
    required: true,
    example: 'dorito@abc.com',
  })
  email: string;
}
