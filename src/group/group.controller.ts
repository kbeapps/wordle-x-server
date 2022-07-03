import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { FindGroupDto, CreateGroupDto, UpdateGroupDto } from './dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto) {
    let status = 200;

    try {
      return this.groupService.create(createGroupDto);
    } catch (err) {
      status = 500;
      // utils.errHandler(source, String(err));
    }

    // utils.responseHandler(res, status, 'createGroup', group);
  }

  @Get('/getall/:key/:value')
  findAll(@Param() query: FindGroupDto) {
    let status = 200;

    try {
      return this.groupService.findAll(query);
    } catch (err) {
      status = 500;
      // utils.errHandler(source, String(err));
    }

    // utils.responseHandler(res, status, 'getAllGroups', groups);
  }

  @Get('/get/:key/:value')
  findOne(@Param() query: FindGroupDto) {
    let status = 200;

    try {
      return this.groupService.findOne(query);
    } catch (err) {
      status = 500;
      // utils.errHandler(source, String(err));
    }

    // utils.responseHandler(res, status, 'getGroup', group);
  }

  @Patch('update')
  update(@Body() updateGroupDto: UpdateGroupDto) {
    let status = 200;

    try {
      return this.groupService.update(updateGroupDto);
    } catch (err) {
      status = 500;
      // utils.errHandler(source, String(err));
    }

    // utils.responseHandler(res, status, 'updateGroup', group);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    let status = 200;

    try {
      return this.groupService.remove(+id);
    } catch (err) {
      status = 500;
      // utils.errHandler(source, String(err));
    }

    // utils.responseHandler(res, status, 'removeGroup');
  }
}
