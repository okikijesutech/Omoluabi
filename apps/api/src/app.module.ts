import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LanguageModule } from './modules/language/language.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    LanguageModule,
    CurriculumModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
