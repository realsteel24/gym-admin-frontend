// import { LabelledInput } from "@/components/LabelledInput";
// import { CustomDialogForm } from "@/components/CustomDialogForm";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function RecordPayment() {
//   return (
//     <div>
//       <CustomDialogForm
//         FormTitle="Record a payment"
//         FormDescription="Please fill the necessary details"
//         titleButton="Record a Payment"
//         children={
//           <div>
//             <LabelledInput
//               label="Member Name"
//               placeholder="Name"
//               onChange={() => {}}
//             />
//             <LabelledInput
//               label="Batch"
//               placeholder="Name"
//               onChange={() => {}}
//             />
//             <LabelledInput
//               label="Payment Mode"
//               placeholder="Name"
//               onChange={() => {}}
//             />
//             <LabelledInput
//               label="Amount"
//               placeholder="Name"
//               onChange={() => {}}
//             />
//             <LabelledInput
//               label="Remarks"
//               placeholder="Name"
//               onChange={() => {}}
//             />
//           </div>
//         }
//         button={<Button variant={"outline"}>Submit </Button>}
//       />

//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant="outline">Record Payment</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Record Payment</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you're done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Member Name
//               </Label>
//               <Input
//                 id="name"
//                 defaultValue="Pedro Duarte"
//                 className="col-span-3"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="batch" className="text-right">
//                 Batch
//               </Label>
//               <Input
//                 id="batch"
//                 defaultValue="Kickboxing"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="batch" className="text-right">
//                 Payment mode
//               </Label>
//               <Input
//                 id="batch"
//                 defaultValue="Kickboxing"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="batch" className="text-right">
//                 Amount
//               </Label>
//               <Input
//                 id="batch"
//                 defaultValue="Kickboxing"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="batch" className="text-right">
//                 Remarks
//               </Label>
//               <Input
//                 id="batch"
//                 defaultValue="Kickboxing"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit" variant={"outline"}>
//               Save changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
