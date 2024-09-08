import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/user/user.module';
import { User } from './models/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',        
      port: 5432,               
      username: 'postgres',   
      password: '1234',
      database: 'database',
      entities: [User],    
      synchronize: true,       }),
    UserModule, // Import your user module
  ],
})
export class AppModule {}
