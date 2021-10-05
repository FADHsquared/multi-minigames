import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from './events/events.module'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'multi_minigames',
      models: []
    }),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
