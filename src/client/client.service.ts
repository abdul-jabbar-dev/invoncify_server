import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateClientDataDto, CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { KnexClientService } from "src/services/knex-client.service";
import { FirebaseService } from "src/services/firebase.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { RClient } from "src/types/user";

@Injectable()
export class ClientService {
  constructor(
    public knex: KnexClientService,
    protected firebase: FirebaseService
  ) {}

  async getAllClient(user: DecodedIdToken) {
    try {
      return await this.knex.getKnex
        .table<RClient>("client")
        .where({ parentId: user.uid })
        .select("*");
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async createClient(
    createClientDto: CreateClientDataDto,
    user: DecodedIdToken
  ) {
    try {
      const clientDbInfo: CreateClientDto = {
        id: new Date().getTime() + Math.random().toString(36).substr(2, 9),
        ...createClientDto,
        parentId: user.uid,
      };

      const exist: Promise<RClient> = await this.knex.getKnex
        .table<RClient>("client")
        .where({ name: clientDbInfo.name, email: clientDbInfo.email })
        .first();

      if (exist) {
        return (await exist).id;
      } else {
        const response = await this.knex.getKnex
          .table("client")
          .insert(clientDbInfo)
          .returning("*");
        return response[0].id;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new UnprocessableEntityException("Error while creating client");
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const exist = await this.knex
      .getKnex("client")
      .where({ id: createUserDto.id })
      .first();
    console.log("24: ", exist);
    if (exist) {
      return exist;
    } else {
      const res = await this.knex.getKnex("client").insert(createUserDto);
      return res;
    }
    // return response;
  }

  async findAll() {
    return await this.knex.getKnex.table("client").select("*");
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${updateClientDto} client`;
  }

  async remove(id: string) {
    console.log(id)
    return await this.knex.getKnex
      .table<RClient>("client")
      .where({ id })
      .delete()
      .select("*");
  }
}
