import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'dorito@abc.com',
    description: '이메일',
    required: true,
  })
  email: string;

  @ApiProperty({ example: 'dorito', description: '닉네임', required: true })
  nickname: string;
  @ApiProperty({ example: 'qwer1234', description: '비밀번호', required: true })
  password: string;
}
