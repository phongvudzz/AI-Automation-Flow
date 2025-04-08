import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";

interface CustomizeDialogHeaderProps {
  icon?: LucideIcon;
  title?: string;
  subTitle?: string;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

function CustomizeDialogHeader(props: CustomizeDialogHeaderProps) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn("stroke-primary", props.iconClassName)}
            />
          )}
          {props.title && (
            <p className={cn("text-xl text-primary", props.titleClassName)}>
              {props.title}
            </p>
          )}
          {props.subTitle && (
            <p className={cn("text-muted-foreground text-sm", props.subTitleClassName)}>
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
  );
}

export default CustomizeDialogHeader;
