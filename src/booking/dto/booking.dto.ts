import { IsDate, IsNotEmpty, IsString } from "class-validator";
export class Booking {

  @IsNotEmpty()   
 @IsDate()
 booking_date : Date;

@IsNotEmpty()
@IsDate()
return_date : Date;

@IsNotEmpty()
@IsString()
booking_status : string;

@IsNotEmpty()
@IsString()
message : string;

}