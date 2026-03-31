import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@Request() req: any) {
    return this.usersService.findOne(req.user.id || req.user.sub);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.usersService.getLeaderboard(100);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
