import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://master:nu37Zhsz7NR1nZnk@clustermovies.gfazcxo.mongodb.net/movies?retryWrites=true&w=majority'
          ),
    ],
  })
  export class MongoDatabaseProviderModule {}