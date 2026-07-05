import { renderToBuffer } from "@react-pdf/renderer";
import {
  InvoicePdfDocument,
  type InvoicePdfProps,
} from "@/lib/invoice-pdf/InvoicePdfDocument";

export async function renderInvoicePdfBuffer(
  props: InvoicePdfProps
): Promise<Buffer> {
  const element = InvoicePdfDocument(props);
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}
