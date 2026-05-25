import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormCreateProduct from "./form-create-product";

export const CreateProduct = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="absolute left-10 bottom-10">
          <div className="rounded-full bg-blue-600 w-10 h-10 items-center flex justify-center">
            <Plus />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <FormCreateProduct />
      </DialogContent>
    </Dialog>
  );
};
