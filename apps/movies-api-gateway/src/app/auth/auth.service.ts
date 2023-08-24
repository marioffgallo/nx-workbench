import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    signin(dto: AuthDto) {
        console.log('signin: ', dto);
        return 'Logou';
    }

    signup(dto: AuthDto) {
        console.log('signup: ', dto);
        return 'Criou conta';
    }
}
