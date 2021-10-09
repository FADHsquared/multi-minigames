import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiModule } from './api/api.module'
import { EventsModule } from './events/events.module'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client-dist')
    }),
    ApiModule,
    EventsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
