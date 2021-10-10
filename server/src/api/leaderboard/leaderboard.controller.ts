import { Controller, Get, Query } from '@nestjs/common'
import { LeaderboardJSON } from '../../../../types'

@Controller('/api/leaderboard')
export class LeaderboardController {
  @Get()
  getApiTest(@Query() { top }): LeaderboardJSON {
    const data = [
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
      },
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
      },
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
    return {
      data: data.slice(0, top ?? data.length)
    }
  }
}
