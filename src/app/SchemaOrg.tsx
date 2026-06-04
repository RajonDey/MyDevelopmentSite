import { buildGlobalSchemaGraph } from "@/lib/seo/schema";
import { JsonLd } from "@/components/rdx/seo/JsonLd";

export default function SchemaOrg() {
  return <JsonLd id="schema-org-global" data={buildGlobalSchemaGraph()} />;
}
