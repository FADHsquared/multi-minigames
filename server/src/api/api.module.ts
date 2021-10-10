import { Module } from '@nestjs/common'
import { LeaderboardController } from './leaderboard/leaderboard.controller'

@Module({
  controllers: [LeaderboardController]
})
export class ApiModule {}
