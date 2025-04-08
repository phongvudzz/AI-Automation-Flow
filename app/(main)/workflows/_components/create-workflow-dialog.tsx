"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateWorkflowSchema } from "@/schema/workflow";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateWorkflow } from "@/actions/workflows/create-workflow";
import CustomizeDialogHeader from "@/components/global/customize-dialog-header";
import { useRouter } from "next/navigation";

type CreateWorkflowDialogProps = {
  triggerText?: string;
};

function CreateWorkflowDialog({ triggerText }: CreateWorkflowDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CreateWorkflowSchema>({
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow created successfully", {
        id: "create-workflow",
      });
      startTransition(() => {
        router.replace(data.redirect);
      });
    },
    onError() {
      toast.error("Failed to create workflow", {
        id: "create-workflow",
      });
    },
  });

  const onSubmit = useCallback(
    async (values: CreateWorkflowSchema) => {
      toast.loading("Creating workflow...", {
        id: "create-workflow",
      });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomizeDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a desciptive and unique name for your workflow
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-primary">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br /> This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="submit"
                disabled={isPending || isMutationPending}
              >
                {!isPending && "Proceed"}{" "}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
