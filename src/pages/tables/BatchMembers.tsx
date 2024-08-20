// TODO: Show member is respective batches

// import { Skeleton } from "../../components/Skeleton";
// import { Button } from "../../components/ui/button";
// import { useBatches } from "../../hooks";

// import { NavigateFunction, useParams } from "react-router-dom";

// export const BatchMembers = () => {
//   const { id, gymId } = useParams<{ id: string; gymId: string }>();
//   const { batches, loading } = useBatches({ id: id ?? "all", gymId: gymId! });

//   console.log(batches);

//   return (
//     <div>
//       <div className="flex justify-center text-xl my-6 underline underline-offset-8 decoration-4 decoration-accent">
//         Batches
//       </div>
//       {loading ? (
//         <div className="md:mx-8">
//           <Skeleton />
//           <Skeleton />
//         </div>
//       ) : (
//         <div>
//           <div className="relative overflow-x-auto border rounded-xl md:mx-8">
//             <table className="w-full text-sm text-left rtl:text-right text-primary dark:text-secondary-foreground">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black border-y dark:text-gray-400">
//                 <tr>
//                   <th scope="col" className="px-6 py-3">
//                     Program Name
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Batch Name
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Member Count
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Start Time
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     End Time
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Days
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {batches && batches.length > 0 ? (
//                   batches.map((item) => (
//                     <tr
//                       key={item.id}
//                       className="bg-white border-b dark:bg-black dark:border-gray-700"
//                     >
//                       <td className="px-6 py-3">{item.Program.name}</td>
//                       <td className="px-6 py-3">{item.name}</td>
//                       <td className="px-6 py-3">
//                         {item._count.MemberPrograms}
//                       </td>
//                       <td className="px-6 py-3">{item.startTime}</td>
//                       <td className="px-6 py-3">{item.endTime}</td>
//                       <td className="px-6 py-3">{item.days}</td>
//                       <td className="px-6 py-3">
//                         <Button
//                           onClick={() => {}}
//                           size={"sm"}
//                           variant={"outline"}
//                         >
//                           View Members
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-3 text-center">
//                       No batches available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export const ViewBatches = (
//   id: string,
//   gymId: string,
//   navigate: NavigateFunction
// ) => {
//   console.log(id);
//   navigate(`/gym/${gymId}/batches/${id}`);
// };
