import { Controller, Get } from '@nestjs/common'
import { LeaderboardJSON } from '../../../../types'

@Controller('/api/leaderboard')
export class LeaderboardController {
  @Get()
  getApiTest(): LeaderboardJSON {
    return {
      data: [
        {
          name: 'Not FADHsquared',
          points: 300
        },
        {
          name: 'ThisIsExample',
          points: 250
        },
        {
          name: 'Your What the hell',
          points: 220
        }
      ]
    }
  }
}
