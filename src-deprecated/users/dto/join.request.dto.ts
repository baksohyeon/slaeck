import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Users } from 'src-deprecated/entities/users.entity';

export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {
  @ApiProperty({
    example: 'dorito@abc.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'dorito', description: '닉네임', required: true })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ example: 'qwer1234', description: '비밀번호', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
