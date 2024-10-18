import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Param,
  Patch,
  Delete,
  Req,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDataDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import AuthRequest from "src/types/Request";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post("new-client")
  createClient(
    @Body() createClientDto: CreateClientDataDto,
    @Request() req: AuthRequest
  ) {
    return this.clientService.createClient(createClientDto, req["user"]);
  }
  @Get("all-clients")
  async getAllClient(@Req() req: AuthRequest) {
    return await this.clientService.getAllClient(req["user"]);
  }

  @Post("new-user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.clientService.createUser(createUserDto);
  }

  @Get("all")
  findAll() {
    return this.clientService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete("del-client/:id")
  remove(@Param("id") id: string) {
    console.log(id);
    // return;
    return this.clientService.remove(id);
  }
}

