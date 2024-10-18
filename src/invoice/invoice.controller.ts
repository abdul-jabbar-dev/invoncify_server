import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

import AuthRequest from "src/types/Request";

@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post("new")
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Req() req: AuthRequest
  ) {
    return await this.invoiceService.create(createInvoiceDto, req["user"]);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }
  @Get("my-invoices")
  async findMyInvoices(@Req() req: AuthRequest) {
    return await this.invoiceService.findMyInvoices(req["user"]);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.invoiceService.remove(+id);
  }
}
