import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "@/components/core/FormInput";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { dataCategory } from "@/helper/dataCategory";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { toast } from "react-toastify";
import { apiCall } from "@/helper/apiCall";


interface IUpdateArticleDialogProps {
    data: any;
    getUpdateList: () => void;
}

const UpdateArticleDialog: React.FC<IUpdateArticleDialogProps> = (props) => {

    const FormEditRef = useRef<HTMLFormElement>(null);
    const categoryRef = useRef<string | null>(props.data.category || null);

    const [open, setOpen] = React.useState(false);


    const onBtEdit = async () => {
        if (FormEditRef.current) {
            const inputEdit = new FormData(FormEditRef.current);

            try {
                await apiCall.put(`/articles/${props.data?.objectId}`, {
                    title: inputEdit.get("title"),
                    thumbnail: inputEdit.get("thumbnail"),
                    category: categoryRef.current,
                    content: inputEdit.get("content"),
                });

                toast.success("article berhasil di update!", {
                    autoClose: 3000
                });
                props.getUpdateList();
                setOpen(false);


            } catch (error) {
                console.error(error);
                alert("gagal mengupdate");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent>
                <form ref={FormEditRef}>
                    <DialogHeader>
                        <DialogTitle>Edit Article</DialogTitle>
                        <DialogDescription>
                            Make changes to your article. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <FormInput
                            type="text"
                            name="title"
                            label="Title"
                            defaultValue={props.data.title}
                        />
                        <FormInput
                            type="text"
                            name="thumbnail"
                            label="Thumbnail"
                            defaultValue={props.data.thumbnail}
                        />
                        <div>
                            <label className="mb-2 font-medium">Category</label>
                            <Select
                                onValueChange={(value) => (categoryRef.current = value)}
                                defaultValue={props.data.category}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dataCategory.map((val, index) => (
                                        <SelectItem key={index} value={val}>
                                            {val}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2 font-medium">Content</label>
                            <Textarea
                                name="content"
                                defaultValue={props.data.content}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline"

                            >Cancel</Button>
                        </DialogClose>


                        <Button type="button"
                            onClick={onBtEdit}>
                            Save changes
                        </Button>


                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateArticleDialog;
