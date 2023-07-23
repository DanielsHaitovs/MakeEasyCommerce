import { Injectable } from '@nestjs/common';
import { CreateEavDto } from './dto/create-eav.dto';
import { UpdateEavDto } from './dto/update-eav.dto';

@Injectable()
export class EavService {
  create(createEavDto: CreateEavDto) {
    return 'This action adds a new eav';
  }

  findAll() {
    return `This action returns all eav`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eav`;
  }

  update(id: number, updateEavDto: UpdateEavDto) {
    return `This action updates a #${id} eav`;
  }

  remove(id: number) {
    return `This action removes a #${id} eav`;
  }
}
