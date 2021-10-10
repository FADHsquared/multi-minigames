import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  app.enableCors({ origin: 'http://localhost', methods: ['GET', 'POST'] })
  const configService = app.get(ConfigService)

  await app.listen(configService.get('PORT') || 3000, '0.0.0.0')
  new Logger('MultiMinigames').log(`Listening on ${await app.getUrl()}`)
}
bootstrap()
