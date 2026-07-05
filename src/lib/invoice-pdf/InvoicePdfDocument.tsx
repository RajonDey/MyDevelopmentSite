import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { InvoiceRecord } from "@/types/rdx/invoice";
import { getPaymentBlock, invoiceIssuer } from "@/content/rdx/invoice-settings";

export type InvoicePdfProps = {
  invoice: InvoiceRecord;
  billToName: string;
  billToAddress: string | null;
};

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.45,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  brand: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  muted: {
    color: "#555555",
  },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    color: "#777777",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  metaGrid: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
  },
  metaCol: {
    flex: 1,
  },
  metaLine: {
    marginBottom: 3,
  },
  table: {
    borderWidth: 1,
    borderColor: "#dddddd",
    marginBottom: 16,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  colDesc: { flex: 3 },
  colQty: { width: 48, textAlign: "right" },
  colRate: { width: 56, textAlign: "right" },
  colAmt: { width: 64, textAlign: "right" },
  headText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  totalsBox: {
    marginLeft: "auto",
    width: 220,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalDue: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  paymentBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  paymentTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  footer: {
    marginTop: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    color: "#666666",
    fontSize: 9,
  },
});

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatBdt(amount: number) {
  return `BDT ${amount.toLocaleString("en-US")}`;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatQty(item: InvoiceRecord["line_items"][number]) {
  if (item.quantity === undefined) return "—";
  const unit = item.unit === "hours" ? " hrs" : item.unit === "fixed" ? "" : "";
  return `${item.quantity}${unit}`;
}

function formatRate(item: InvoiceRecord["line_items"][number]) {
  if (item.unitRateUsd === undefined) return "—";
  return formatUsd(item.unitRateUsd);
}

export function InvoicePdfDocument({
  invoice,
  billToName,
  billToAddress,
}: InvoicePdfProps) {
  const payment = getPaymentBlock(invoice.payment_method);
  const lineItems =
    invoice.line_items.length > 0
      ? invoice.line_items
      : [
          {
            description: invoice.description?.trim() || "Services",
            amountUsd: invoice.amount_usd,
          },
        ];

  return (
    <Document title={invoice.invoice_number}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>{invoiceIssuer.name}</Text>
            <Text style={styles.muted}>{invoiceIssuer.email}</Text>
            <Text style={styles.muted}>{invoiceIssuer.website}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={[styles.muted, { textAlign: "right", marginTop: 4 }]}>
              {invoice.invoice_number}
            </Text>
          </View>
        </View>

        <View style={styles.metaGrid}>
          <View style={styles.metaCol}>
            <Text style={styles.sectionLabel}>Bill to</Text>
            <Text style={styles.metaLine}>{billToName}</Text>
            {billToAddress ? (
              <Text style={styles.muted}>{billToAddress}</Text>
            ) : null}
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.sectionLabel}>Details</Text>
            <Text style={styles.metaLine}>
              Issue date: {formatDate(invoice.issued_at)}
            </Text>
            {invoice.due_at ? (
              <Text style={styles.metaLine}>
                Due date: {formatDate(invoice.due_at)}
              </Text>
            ) : null}
            {invoice.billing_period ? (
              <Text style={styles.metaLine}>
                Period: {invoice.billing_period}
              </Text>
            ) : null}
            <Text style={styles.metaLine}>
              Status: {invoice.status.replace("_", " ")}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Services</Text>
          <View style={styles.table}>
            <View style={styles.tableHead}>
              <Text style={[styles.colDesc, styles.headText]}>Description</Text>
              <Text style={[styles.colQty, styles.headText]}>Qty</Text>
              <Text style={[styles.colRate, styles.headText]}>Rate</Text>
              <Text style={[styles.colAmt, styles.headText]}>Amount</Text>
            </View>
            {lineItems.map((item, index) => (
              <View key={`${item.description}-${index}`} style={styles.tableRow}>
                <Text style={styles.colDesc}>{item.description}</Text>
                <Text style={styles.colQty}>{formatQty(item)}</Text>
                <Text style={styles.colRate}>{formatRate(item)}</Text>
                <Text style={styles.colAmt}>{formatUsd(item.amountUsd)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text>Subtotal (USD)</Text>
            <Text>{formatUsd(invoice.amount_usd)}</Text>
          </View>
          {invoice.amount_bdt ? (
            <View style={styles.totalRow}>
              <Text>Total (BDT)</Text>
              <Text>{formatBdt(invoice.amount_bdt)}</Text>
            </View>
          ) : null}
          {invoice.usd_bdt_rate ? (
            <Text style={[styles.muted, { fontSize: 8, marginBottom: 4 }]}>
              Rate: 1 USD = {invoice.usd_bdt_rate} BDT
            </Text>
          ) : null}
          <View style={styles.totalDue}>
            <Text>Total due</Text>
            <Text>
              {invoice.amount_bdt
                ? `${formatUsd(invoice.amount_usd)} · ${formatBdt(invoice.amount_bdt)}`
                : formatUsd(invoice.amount_usd)}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { marginTop: 24 }]}>
          <Text style={styles.sectionLabel}>Payment</Text>
          <View style={styles.paymentBox}>
            <Text style={styles.paymentTitle}>{payment.title}</Text>
            {payment.lines.map((line) => (
              <Text key={line} style={styles.muted}>
                {line}
              </Text>
            ))}
          </View>
        </View>

        {invoice.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Notes</Text>
            <Text>{invoice.description}</Text>
          </View>
        ) : null}

        <View style={styles.footer}>
          <Text>
            Questions? Email {invoiceIssuer.email} — thank you for your business.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
