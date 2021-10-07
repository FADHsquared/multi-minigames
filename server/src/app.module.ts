import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ApiModule } from './api/api.module'
import { EventsModule } from './events/events.module'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'multi_minigames',
      models: []
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
