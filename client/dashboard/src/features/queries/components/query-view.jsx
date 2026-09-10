import { Button } from "@/components/ui/button";
import { useQueryItem } from "@/hooks/use-queries";
import { formatDistanceToNow, format } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";
import moment from "moment";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function QueryView({ id, onDelete, isDeleting }) {
  const { data, isLoading, isError } = useQueryItem(id);

  if (isLoading)
    return <div className="p-6 text-muted-foreground text-sm">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-destructive text-sm">Failed to load query.</div>
    );
  console.log({ data });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-sm shrink-0">
          {getInitials(data.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-base">{data.name}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Contact details */}
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
            Contact details
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Detail icon="mail" label="Email" value={data.email} />
            <Detail icon="phone" label="Phone" value={data.phone} />
            <div className="col-span-2">
              <Detail icon="map-pin" label="Address" value={data.address} />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
            Message
          </p>
          <div className="border-l-2 border-border pl-3">
            <p className="font-medium text-sm mb-1">{data.subject}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.message}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {format(new Date(data.created_at), "MMM d, yyyy · h:mm a")}
          </span>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm break-all">{value}</p>
    </div>
  );
}
