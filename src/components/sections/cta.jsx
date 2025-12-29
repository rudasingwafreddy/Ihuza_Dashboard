import { CheckCircle, BoxIcon } from "lucide-react";

export const CTA = () => {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-primaryColor-500 flex items-start gap-4 shadow-lg min-w-0">
      <div className="p-3 bg-primaryColor-400 rounded-xl">
        <BoxIcon className="size-6 text-background" />
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="text-xl font-semibold text-background">
          iHUZA INVENTORY - System Overview
        </h5>
        <span className="text-sm text-background/80">
          Monitor your iHUZA inventory and product assignments in real-time.
        </span>
        <div className="text-sm mt-4 text-background flex items-center gap-2 py-1.5 w-fit">
          <CheckCircle className="inline size-5 text-success" />
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  );
};
