import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './auth/auth.controller';
import { AuthGuardModule } from './authguard/authguard.module';

@Module({
  imports: [AuthGuardModule],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule { }
