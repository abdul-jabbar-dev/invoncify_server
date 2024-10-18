import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { ClientService } from "src/client/client.service";
import { Meta, RInvoice } from "src/types/invoice";
import { KnexClientService } from "src/services/knex-client.service";

@Injectable()
export class InvoiceService {
  constructor(
    protected clientService: ClientService,
    protected knex: KnexClientService
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, sourseUser: DecodedIdToken) {
    const meta: Meta = {
      formSettings: {
        invoiceId: false,
        dueDate: false,
        currency: true,
        discount: false,
        tax: false,
        note: false,
      },
      currencySettings: {
        currency: "USD",
        separator: ",",
        decimalFraction: "2",
        signPlacement: "before",
      },
      creationDate: new Date(),
    };

    try {
      if (typeof createInvoiceDto.client === "object") {
        const newClient = await this.clientService.createClient(
          { ...createInvoiceDto.client, role: "client" },
          sourseUser
        );
        createInvoiceDto.client =
          typeof newClient === "string" ? newClient : newClient.id;
        delete createInvoiceDto.clientStng;
      }

      const invoice = {
        status: "PENDING",
        meta,
        client_id: createInvoiceDto.client,
        products: JSON.stringify(createInvoiceDto.products),
        prePayments: JSON.stringify(createInvoiceDto.prepayments),
      };
      console.log(invoice);

      const result: RInvoice[] = await this.knex
        .getKnex()
        .table("invoice")
        .insert(invoice);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error creating invoice:", error); // More specific error logging
      throw new Error("Failed to create invoice. Please try again.");
    }
  }

  findAll() {
    return `This action returns all invoice`;
  }
  async findMyInvoices(user: DecodedIdToken) {
    try {
      const result = await this.knex
        .getKnex()
        .table("invoice as i")
        .innerJoin("client as c", "i.client_id", "c.id")
        .innerJoin("client as s", "c.parentId", "s.id")
        .select(
          "i.*",
          "i.id as invoice_id",
          "c.id as client_id",
          "c.name as client_name",
          "c.email as client_email",
          "s.id as source_id",
          "s.name as source_name",
          "s.email as source_email"
        )
        .where("s.id", user.uid);

      return result;
    } catch (error) {
      console.log("Error fetching invoices:", error);
      throw new Error("Failed to fetch invoices");
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return updateInvoiceDto;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
