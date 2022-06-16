import { Injectable } from '@nestjs/common';
import { CustomHttp } from 'common/infra/http/custom.http';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(protected readonly customHttp: CustomHttp) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.customHttp.request({
        method: 'PUT',
        url: `${process.env.CLIENT_SERVICE_URL}/users/${id}`,
        data: updateUserDto,
      });

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
