import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindGroupDto } from './dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupDocument } from './schema/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  public async create(createGroupDto: CreateGroupDto) {
    const group: Group = new this.groupModel(createGroupDto);

    try {
      return await this.groupModel.create(group);
    } catch (err) {
      throw new Error(String(err));
    }
  }

  public async findAll(query: FindGroupDto) {
    try {
      return await this.groupModel.find(query);
    } catch (err) {
      throw new Error(String(err));
    }
  }

  public async findOne(query: FindGroupDto) {
    try {
      return await this.groupModel.findOne(query);
    } catch (err) {
      throw new Error(String(err));
    }
  }

  public async update(updateGroupDto: UpdateGroupDto) {
    const _id: string = updateGroupDto._id;
    delete updateGroupDto._id;

    try {
      return await this.groupModel.findByIdAndUpdate(_id, updateGroupDto, {
        new: true,
      });
    } catch (err) {
      throw new Error(String(err));
    }
  }

  public async remove(id: number) {
    try {
      return await this.groupModel.findByIdAndRemove(id);
    } catch (err) {
      throw new Error(String(err));
    }
  }
}
