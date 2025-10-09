// import CardItem from "./CardItem";
// import { notFound } from "next/navigation";

// interface Item {
//   id: number | string;
//   title: string;
//   excerpt: string;
//   image?: string;
//   author?: string;
//   created_at?: string;
//   category?: string;
//   tname?: string;
// }

// interface CategoryListProps {
//   items: Item[];
//   linkBase: string;
// }

// export default function CategoryList({ items, linkBase }: CategoryListProps) {
//   if (!items || items.length === 0) notFound();

//   return (
//     <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {items.map((item) => (
//           <CardItem key={item.id} item={item} linkBase={linkBase} />
//         ))}
//       </div>
//     </section>
//   );
// }
