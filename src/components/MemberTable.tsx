// import { MemberOptions } from "../hooks";

// export const MemberTable = ({ members }: { members: MemberOptions[] }) => {
//   return (
//     <div className=" relative overflow-x-auto shadow-md">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-2 py-3">
//               <div className="flex items-center">
//                 Name
//                 <a href="#">
//                   <svg
//                     className="w-3 h-3 ms-1.5"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
//                   </svg>
//                 </a>
//               </div>
//             </th>
//             <th>Email</th>

//             <th>Contact</th>
//             <th>Batch</th>
//             <th>Age</th>
//             <th>Id</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member: MemberOptions) => (
//             <tr
//               className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//               key={member.id}
//             >
//               <td
//                 scope="row"
//                 className="font-medium text-gray-900 whitespace-nowrap dark:text-white px-2"
//               >
//                 {member.name}
//               </td>
//               <td className="px-2"> {member.email} </td>
//               <td className="px-2"> {member.contact} </td>
//               <td className="px-2"> {member.batch} </td>
//               <td className="px-2 "> {member.age ?? 24} </td>

//               <td className="px-2"> {member.id} </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
